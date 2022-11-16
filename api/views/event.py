from rest_framework import status
from rest_framework.decorators import  APIView
from rest_framework.response import Response
from api.serializer.event_serializer import EventSerializer
from rest_framework.permissions import IsAuthenticated


class EventApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        event_serializer = EventSerializer(data=request.data)
        if event_serializer.is_valid():
            event_serializer.save()
            return Response({'detail': 'Event create Successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


