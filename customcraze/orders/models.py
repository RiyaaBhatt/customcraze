from django.db import models
from product.models import Item  # Import the Item model
from designs.models import CustomizationTemplate
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        
    ]

    item = models.ForeignKey(Item, on_delete=models.CASCADE)  # Reference to the Item model
    design = models.ImageField(upload_to='designs/', blank=True, null=True)  # For custom designs
    template = models.ForeignKey(CustomizationTemplate, on_delete=models.SET_NULL, null=True, blank=True)  # For existing designs
    name = models.CharField(max_length=255)
    address = models.TextField()
    email = models.EmailField()
    price=models.IntegerField()
    phone = models.CharField(max_length=15)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.status} - {self.name}"
