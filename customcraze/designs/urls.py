from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import CustomizationTemplateViewSet

customization_template_list = CustomizationTemplateViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

customization_template_detail = CustomizationTemplateViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('customization-templates/', customization_template_list, name='customization-template-list'),
    path('customization-templates/<int:pk>/', customization_template_detail, name='customization-template-detail'),  # Added trailing slash
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
