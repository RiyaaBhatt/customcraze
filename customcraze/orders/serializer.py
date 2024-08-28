from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'item', 'design', 'template', 'name', 'address', 'email', 'phone', 'status', 'created_at', 'updated_at']
