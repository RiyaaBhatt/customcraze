from django.urls import path, re_path
from . import views

urlpatterns = [
    path('main/', views.index),
    re_path(r'^.*$', views.index),  # Catch all other routes and direct them to index view
]
