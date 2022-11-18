from django.urls import path

from authentication.views import LoginView, RegistrationView

app_name = 'authentication'

urlpatterns = [
    path('register/', RegistrationView.as_view(), name="user-registration"),
    path('login/', LoginView.as_view(), name="user-login"),
    path('', LoginView.as_view(), name="user-login"),

]