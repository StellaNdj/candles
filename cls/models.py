from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

# Product model
class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    characteristics = models.TextField()
    ingredients = models.TextField()
    image = models.ImageField(upload_to='mediafiles')

    def __str__(self):
        return self.name

# User model modification to make email uniqueness necessary

User._meta.get_field('email')._unique = True

# Cart & CartItem model
class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user}"

    # Total cart price
    def total_price(self):
        return sum(item.total_price() for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in {self.cart}"

    # Item total price
    def total_price(self):
        return self.quantity * self.product.price


# Customer model to extend User model with shipping infos
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    street_address = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=5, blank=True, null=True)

    def __str__(self):
        return self.user.username

    # Create an customer instance when a user is created
    @receiver(post_save, sender=User)
    def create_customer_profile(sender, instance, created, **kwargs):
        if created:
            Customer.objects.create(
                user=instance,
                first_name=instance.first_name,
                last_name=instance.last_name
            )
        else:
            customer = instance.customer
            customer.first_name = instance.first_name
            customer.last_name = instance.last_name
            customer.save()

    @receiver(post_save, sender=User)
    def save_customer_profile(sender, instance, **kwargs):
        instance.customer.save()

# Order & OrderItem

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[('Pending', 'Pending'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered')],
        default="Pending"
    )
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"Order {self.id} by {self.customer.user.username}"

    def calculate_and_set_total_price(self):
        total = sum(item.total_price() for item in self.items.all())
        self.total_price = total
        self.save()

    def save(self, *args, **kwargs):
        # Check if customer has complete shipping information
        required_fields = [
            self.customer.street_address,
            self.customer.city,
            self.customer.state,
            self.customer.country,
            self.customer.postal_code,
        ]
        if not all(required_fields):
            raise ValueError("Shipping information is incomplete. Please complete your profile.")
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"

    def total_price(self):
        return self.price * self.quantity

    def save(self, *args, **kwargs):
        if not self.price:
            self.price = self.product.price
        super().save(*args, **kwargs)

# Payment
class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment', blank=True, null=True)
    payment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[('Pending', 'Pending'), ('Completed', 'Completed'), ('Failed', 'Failed')],
        default='Pending'
    )
    payment_method = models.CharField(max_length=50, choices=[('Card', 'Card'), ('PayPal', 'PayPal')])
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    card_number = models.CharField(max_length=16, blank=True, null=True)
    card_expiry = models.CharField(max_length=5, blank=True, null=True)  # MM/YY format
    card_cvv = models.CharField(max_length=3, blank=True, null=True)

    def __str__(self):
        return f"Payment for Order {self.order.id} - {self.status}"

# Review model
class Review(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    date_created = models.DateField(auto_now_add=True)
    comment = models.TextField()

    def __str__(self):
        return f"Review by ${self.customer.first_name} for ${self.product.name}"

    def average_rating(self):
        reviews = self.reviews.all()
        if reviews.exists():
            return reviews.aggregate(models.Avg('rating'))['rating_avg']
        return 0
