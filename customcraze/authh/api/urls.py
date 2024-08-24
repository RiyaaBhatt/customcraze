from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
 
    TokenRefreshView
)
from .views import MyTokenPairView
urlpatterns=[
     path('api/token/', MyTokenPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]