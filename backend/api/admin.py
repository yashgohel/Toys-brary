from django.contrib import admin
from .models import CustomUser, Product, Order, OrderItem

admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
