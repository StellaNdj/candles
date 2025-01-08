from .views import ProductViewSet, RegisterViewSet, UserDetailsViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path, include

app_name = 'cls'

router = DefaultRouter()

router.register(r'products', ProductViewSet)
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'user', UserDetailsViewSet, basename="user")

urlpatterns = [
    path('', include(router.urls))
]
