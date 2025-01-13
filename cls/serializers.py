from rest_framework import serializers
from .models import Product, Cart, CartItem, Order, OrderItem, Review, Customer
from django.contrib.auth.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True }, # Ensure it's not readable
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        return user

class UserDetailsSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(source="customer.phone_number", allow_blank=True, required=False)
    street_address = serializers.CharField(source="customer.street_address", allow_blank=True, required=False)
    city = serializers.CharField(source="customer.city", allow_blank=True, required=False)
    state = serializers.CharField(source="customer.state", allow_blank=True, required=False)
    country = serializers.CharField(source="customer.country", allow_blank=True, required=False)
    postal_code = serializers.CharField(source="customer.postal_code", allow_blank=True, required=False)

    class Meta:
        model = User
        fields = [
            'username', 'id', 'email', 'first_name', 'last_name', 'phone_number', 'city', 'street_address', 'postal_code', 'country', 'state'
        ]

    def update(self, instance, validated_data):
        # Update User fields
        customer_data = validated_data.pop('customer', {})
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Update Customer fields
        customer = instance.customer
        for attr, value in customer_data.items():
            setattr(customer, attr, value)
        customer.save()

        return instance


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_price = serializers.ReadOnlyField(source='product.price')
    product_image = serializers.ReadOnlyField(source='product.image.url')
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'id', 'total_price', 'product_name', 'product_price', 'product_image']

    def get_total_price(self, obj):
        return obj.total_price()

class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'total_price', 'items']

    def get_total_price(self, obj):
        return obj.total_price()

class OrderItemSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price', 'total_price']

    def get_total_price(self, obj):
        return obj.total_price()

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'total_price', 'order_date', 'status', 'items']

    def get_total_price(self, obj):
        return obj.total_price()

class ReviewSerialier(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def validate_rating(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value
