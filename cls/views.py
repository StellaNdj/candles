from django.shortcuts import render, get_object_or_404
from .models import Product, Cart, CartItem, Order, OrderItem, Customer, Review, Payment
from django.contrib.auth.models import User
from .serializers import ProductSerializer, UserSerializer, UserDetailsSerializer, CartSerializer, CartItemSerializer, OrderItemSerializer, OrderSerializer, ReviewSerialier
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveUpdateAPIView
from django.utils import timezone
from rest_framework.filters import SearchFilter
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name', 'ingredients']

    @action(detail=False, methods=['GET'], url_path='homepage-snippet')
    def homepage_snippet(self, request):
        products = Product.objects.all()[:4]
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })

class ProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailsSerializer

    def get_object(self):
        # Return the currently authenticated user
        return self.request.user

# Utility function to get or create a cart
def get_cart(self):
    cart, created = Cart.objects.get_or_create(user=self.request.user)
    return cart

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all()

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        cart = get_cart(self)
        items = CartItemSerializer(cart.items.all(), many=True, read_only=True)
        serializer = CartSerializer(cart)
        data = {
            "cart": serializer.data,
            "items": items.data
        }
        return Response(data)

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = CartItem.objects.all()

    def create(self, request):
        cart = get_cart(self)
        product_id = request.data.get('product')

        product = get_object_or_404(Product, id=product_id)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        quantity_to_add = int(request.data.get('quantity', 1))

        if not created:
            cart_item.quantity += quantity_to_add
            cart_item.save()
        else:
            cart_item.quantity = quantity_to_add
            cart_item.save()

        # Send back updated cart
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def destroy(self, request, **kwargs):
        cart = get_cart(self)
        cart_item = get_object_or_404(CartItem, id=kwargs['pk'], cart=cart)

        quantity_to_remove = int(request.data.get('quantity', 1))

        if cart_item.quantity > quantity_to_remove:
            cart_item.quantity -= quantity_to_remove
            cart_item.save()
        else:
            cart_item.delete()

        serializer = CartSerializer(cart)
        return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()

    def get_queryset(self):
        return Order.objects.filter(customer__user=self.request.user)


    @action(detail=False, methods=['post'], url_path='place-order')
    def place_order(self, request):
        customer = get_object_or_404(Customer, user=request.user)

        if not all([customer.street_address, customer.city, customer.state, customer.country, customer.postal_code]):
            raise ValidationError("Shipping information is incomplete. Please complete your profile.")

        # Get payment details
        payment_id = request.data.get('payment_id')
        payment = get_object_or_404(Payment, id=payment_id, status='Completed', order=None)

        cart_id = request.data.get('cart_id')
        cart = get_object_or_404(Cart, id=cart_id)

         # Check if the cart has any items
        if not cart.items.exists():
            return Response({"error": "Cart is empty. No items to place an order."})

        # Create an order
        order = Order.objects.create(customer=customer)
        order.save()


        # Transfer CartItems into OrderItems
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order = order,
                product = cart_item.product,
                quantity = cart_item.quantity,
                price = cart_item.product.price
            )

        # Calculate total price
        order.calculate_and_set_total_price()

        # Link the payment to the order
        payment.order = order
        payment.save()

        # Clear cart
        cart.items.all().delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'], url_path='simulate-payment')
    def simulate_payment(self, request):
        # Extract the data from the request
        cart_id = request.data.get('cart_id')
        payment_method = request.data.get('payment_method', 'Card')
        card_number = request.data.get('card_number')
        card_expiry = request.data.get('card_expiry')
        card_cvv = request.data.get('card_cvv')

        # Get cart
        cart = get_object_or_404(Cart, id=cart_id, user=request.user)

        # Ensure the cart isn't empty
        if not cart.items.exists():
            return Response({"error": "Cart is empty. Cannot simulate payment."})

        # Simulate failures and success
        if payment_method == 'Paypal':
            transaction_status = 'Failed'
            failure_reason = 'Paypal simulate failure'
        elif card_number and card_number.startswith('1'):
            transaction_status = 'Failed'
            failure_reason = 'Card with 1 simulate failure'
        else:
            transaction_status = 'Completed'
            failure_reason = None


        # Create temporary payment, no order linked yet
        payment = Payment.objects.create(
            order = None, # No order linked yet
            payment_method = payment_method,
            status = transaction_status,
            payment_date = timezone.now(),
            amount = sum(item.product.price * item.quantity for item in cart.items.all()),
            transaction_id = f"TRANS-{timezone.now().timestamp()}",
            card_number=card_number[-4:] if card_number else None,
            card_expiry=card_expiry,
            card_cvv=card_cvv,
        )

        # Response
        response_data = {
            "message": f"Payment {'successful' if transaction_status == 'Completed' else 'failed'}.",
            "payment_status": payment.status,
            "transaction_id": payment.transaction_id,
            "payment_id": payment.id,
        }

        if failure_reason:
            response_data['failure_reason'] = failure_reason

        return Response(response_data)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerialier
    permission_classes = [IsAuthenticated]
    queryset = Review.objects.all()

    def get_queryset(self, *args, **kwargs):
        product_id = self.kwargs.get('product_id')
        if product_id:
            return Review.objects.filter(product_id=product_id)
        return Review.objects.all()

    def create(self, request, *args, **kwargs):
        # Get a customer
        customer = get_object_or_404(Customer, user=request.user)

        # Get a product
        product_id = self.kwargs.get('product_id')
        product = get_object_or_404(Product, id=product_id)

        comment = request.data.get('comment')
        rating = request.data.get('rating')

        review = Review.objects.create(
            customer = customer,
            product = product,
            comment = comment,
            rating = rating
        )

        serializer = ReviewSerialier(review)
        return Response(serializer.data)
