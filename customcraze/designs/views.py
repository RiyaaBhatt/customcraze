from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import CustomizationTemplate
from .serializer import CustomizationTemplateSerializer
import logging

logger = logging.getLogger(__name__)

class CustomizationTemplateViewSet(viewsets.ModelViewSet):
    queryset = CustomizationTemplate.objects.all()
    serializer_class = CustomizationTemplateSerializer
    
    def perform_create(self, serializer):
        # Ensure that 'created_by' field is set correctly
        if self.request.user.is_authenticated:
            serializer.save(created_by=self.request.user)
        else:
            raise PermissionDenied("You must be logged in to create a template.")
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        logger.debug(f"Update request user: {request.user}")
        logger.debug(f"Template owner: {instance.created_by}")
        
        # Removed permission check to allow anyone to update the template
        return super().update(request, *args, **kwargs)
    
    def perform_update(self, serializer):
        # Ensure that the 'created_by' field is not altered during an update
        serializer.save()
