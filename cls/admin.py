from django.contrib import admin
from .models import Product, Order, OrderItem

# Register Product Model
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')
    search_fields = ('name',)
    list_filter = ('price',)
    ordering = ('name',)

# Register Order Model
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'order_date', 'status', 'total_price')
    list_filter = ('status', 'order_date')
    search_fields = ('customer__user__username',)
    ordering = ('-order_date',)

    # Optional: Add inline editing for Order Items
    class OrderItemInline(admin.TabularInline):
        model = OrderItem
        extra = 0

    inlines = [OrderItemInline]  # Attach OrderItem inline


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity', 'price')
    search_fields = ('order__id', 'product__name')
