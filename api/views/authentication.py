from rest_framework import status
from rest_framework.decorators import  APIView
from rest_framework.response import Response
from  authentication.models import User


class RegistrationApiView(APIView):

    def post(self, request):
        data = request.POST
        username = data.get("username")
        password = data.get("password")
        user, created = User.get_or_create(username=username, password=password)
        if not created:
            return Response({'detail': 'Username already exist'}, status=status.HTTP_403_FORBIDDEN)

        return Response({'detail': 'User create Successfull'}, status=status.HTTP_201_CREATED)
