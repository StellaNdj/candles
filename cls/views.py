from django.shortcuts import render, get_object_or_404
from .models import Product, Cart, CartItem
from django.contrib.auth.models import User
from .serializers import ProductSerializer, UserSerializer, UserDetailsSerializer, CartSerializer, CartItemSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

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

# Utility function to get or create a cart
def get_cart(self):
    cart, created = Cart.objects.get_or_create(user=self.request.user)
    return cart

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all()

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

        if not created:
            cart_item.quantity += 1
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
