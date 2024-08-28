from django.db import models
from django.contrib.auth.models import User

class CustomizationTemplate(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='customization_templates/')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name