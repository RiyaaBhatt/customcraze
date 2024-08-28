from django.urls import path
from .views import item_list_create
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('productapi/', item_list_create, name='item-list-create'),
    path('productapi/<int:pk>/', item_list_create, name='item-update'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)