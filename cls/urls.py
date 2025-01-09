from .views import ProductViewSet, RegisterViewSet, UserDetailsViewSet, CartItemViewSet, CartViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path, include

app_name = 'cls'

router = DefaultRouter()

router.register(r'products', ProductViewSet)
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'user', UserDetailsViewSet, basename="user")
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-item')

urlpatterns = [
    path('', include(router.urls))
]
