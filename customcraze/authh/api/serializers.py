from rest_framework import serializers
from django.contrib.auth.models import User  # Importing the built-in User model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']  # Customize fields as needed
