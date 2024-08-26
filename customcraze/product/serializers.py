# serializers.py
from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = [
            'item_id',
            'name',
            'description',
            'price',
            'image_url',
            'is_trending',
            'created_at',
            'updated_at',
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request is not None and obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
