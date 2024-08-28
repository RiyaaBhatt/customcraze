from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # Ensure this is set

    class Meta:
        model = Item
        fields = '__all__'
