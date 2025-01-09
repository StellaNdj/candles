from rest_framework import serializers
from .models import Product, Cart, CartItem
from django.contrib.auth.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True } # Ensure it's not readable
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id', 'email']


class CartItemSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'id', 'total_price']

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
