from .views import ProductViewSet, RegisterViewSet, UserDetailsViewSet, CartItemViewSet, CartViewSet, OrderViewSet, ReviewViewSet, ProfileView
from rest_framework.routers import DefaultRouter
from django.urls import path, include

app_name = 'cls'

router = DefaultRouter()

router.register(r'products', ProductViewSet)
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'user', UserDetailsViewSet, basename="user")
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-item')
router.register(r'orders', OrderViewSet)
router.register(r'products/(?P<product_id>[^/.]+)/reviews', ReviewViewSet, basename='product-reviews')


urlpatterns = [
    path('', include(router.urls)),
    path('profile/', ProfileView.as_view(), name='profile'),
]
