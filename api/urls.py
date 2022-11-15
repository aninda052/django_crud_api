from django.urls import path

from api.views.authentication import RegistrationApiView
from authentication.token import MyTokenObtainPairView


app_name = 'api'

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='login-api'),
    path('registration/', RegistrationApiView.as_view(), name='registration-url'),
]