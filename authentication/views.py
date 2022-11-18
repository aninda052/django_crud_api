from django.shortcuts import render
from django.views import View
# Create your views here.



class RegistrationView(View):
    def get(self, request):
        return render(request, "landing_page.html", context= {"page_name": "registration_page"})


class LoginView(View):
    def get(self, request):
        return render(request, "landing_page.html", context= {"page_name": "login_page"})


