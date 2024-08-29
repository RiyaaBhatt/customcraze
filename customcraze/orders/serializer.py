from rest_framework import serializers
from .models import Order
from product.serializers import ItemSerializer
from designs.serializer import CustomizationTemplateSerializer
class OrderSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    template = CustomizationTemplateSerializer(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'item', 'design', 'template', 'name', 'address', 'email', 'phone', 'status', 'created_at', 'updated_at']
