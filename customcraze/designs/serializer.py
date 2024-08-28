from rest_framework import serializers
from .models import CustomizationTemplate

class CustomizationTemplateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # Ensure this is set

    class Meta:
        model = CustomizationTemplate
        fields = '__all__'
        read_only_fields = ('created_by',)
