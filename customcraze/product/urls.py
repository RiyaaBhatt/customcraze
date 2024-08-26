from django.urls import path
from .views import item_list_create

urlpatterns = [
    path('productapi/', item_list_create, name='item-list-create'),
    path('productapi/<int:pk>/', item_list_create, name='item-update'),
]
