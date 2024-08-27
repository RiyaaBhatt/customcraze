from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import CustomizationTemplate
from .serializer import CustomizationTemplateSerializer

class CustomizationTemplateViewSet(viewsets.ModelViewSet):
    queryset = CustomizationTemplate.objects.all()
    serializer_class = CustomizationTemplateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
