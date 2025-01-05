from django.shortcuts import render
from .models import Product
from .serializers import ProductSerializer
from rest_framework import viewsets
from rest_framework.response import Response

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
