from django.db import models
import datetime
import os
def filepath(instance, filename):
    old_filename = filename
    timeNow = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    new_filename = f"{timeNow}_{old_filename}"
    return os.path.join("uploads/", new_filename)
class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to=filepath, blank=True, null=True)
    
    is_trending = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
