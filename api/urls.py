from django.urls import path

from api.views.authentication import RegistrationApiView
from api.views.event import EventApiView
from authentication.token import MyTokenObtainPairView


app_name = 'api'

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='login-api'),
    path('registration/', RegistrationApiView.as_view(), name='registration-api'),
    path('events/', EventApiView.as_view(), name='event-create-api'),
    path('events/<int:id>', EventApiView.as_view(), name='event-get-api'),
]