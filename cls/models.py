from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    characteristics = models.TextField()
    ingredients = models.TextField()
    image = models.ImageField(upload_to='mediafiles')

    def __str__(self):
        return self.name


User._meta.get_field('email')._unique = True
