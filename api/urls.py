from django.urls import path

from api.views.authentication import RegistrationApiView



app_name = 'api'

urlpatterns = [
    path('registration/', RegistrationApiView.as_view(), name='registration-url'),
]