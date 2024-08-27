# from rest_framework import viewsets
# from rest_framework.response import Response
# from rest_framework import status
# from .models import CustomizationTemplate
# from .serializer import CustomizationTemplateSerializer
# import logging

# logger = logging.getLogger(__name__)

# class CustomizationTemplateViewSet(viewsets.ModelViewSet):
#     queryset = CustomizationTemplate.objects.all()
#     serializer_class = CustomizationTemplateSerializer
    
#     def perform_create(self, serializer):
#         # Ensure that 'created_by' field is set correctly
        
#         serializer.save(created_by=self.request.user)
        
      
    
#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         logger.debug(f"Update request user: {request.user}")
#         logger.debug(f"Template owner: {instance.created_by}")
        
#         # Removed permission check to allow anyone to update the template
#         return super().update(request, *args, **kwargs)
    
#     def perform_update(self, serializer):
#         # Ensure that the 'created_by' field is not altered during an update
#         serializer.save()
from rest_framework import viewsets
from .models import CustomizationTemplate
from .serializer import CustomizationTemplateSerializer
import logging

logger = logging.getLogger(__name__)

class CustomizationTemplateViewSet(viewsets.ModelViewSet):
    queryset = CustomizationTemplate.objects.all()
    serializer_class = CustomizationTemplateSerializer
    
    # Removed the perform_create method as it's not needed without authentication
    
    def perform_update(self, serializer):
        # Update method without any user-specific logic
        serializer.save()
    
    # No need to override the update method unless you have specific logging or additional logic
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        logger.debug(f"Update request for template with ID: {instance.id}")
        return super().update(request, *args, **kwargs)
