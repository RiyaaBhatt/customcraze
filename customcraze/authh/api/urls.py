from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
 
    TokenRefreshView
)
from .views import MyTokenPairView
urlpatterns=[
     path('token/', MyTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.signup_view, name='signup'),
]