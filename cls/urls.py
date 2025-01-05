from .views import ProductViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path, include

app_name = 'cls'

router = DefaultRouter()

router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls))
]
