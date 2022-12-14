from rest_framework import status
from rest_framework.decorators import  APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from api.serializer.event_serializer import EventSerializer
from rest_framework.permissions import IsAuthenticated
from event.models import Event
from custom_function.pagination import CustomPagination





class EventApiView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer
    model =  Event
    def post(self, request):
        event_serializer = self.serializer_class(data=request.data)
        if event_serializer.is_valid():
            event_serializer.save()
            return Response({'massage': 'Event create Successfull', 'data':event_serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        event = self.model.objects.filter(id=id).first()
        if event:
            event_serializer = self.serializer_class(event, many=False)
            return Response(event_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"event_not_found" : "Provide a valid event Id"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        event = self.model.objects.filter(id=id).first()
        if event:
            event.delete()
            return Response({'massage': 'Event delete Successfull'}, status=status.HTTP_200_OK)
        else:
            return Response({"event_not_found" : "Provide a valid event Id"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        event = self.model.objects.filter(id=id).first()
        if event:
            event_serializer = self.serializer_class(instance=event, data=request.data, partial=True)
            if event_serializer.is_valid():
                event_serializer.save()
                return Response({'massage': 'Event Update Successfull', 'data': event_serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"event_not_found": "Provide a valid event Id"}, status=status.HTTP_404_NOT_FOUND)




class EventLIstApiView(ListAPIView):
    permission_classes = [IsAuthenticated]
    model = Event
    serializer_class = EventSerializer
    pagination_class = CustomPagination
    def get_queryset(self):
        return self.model.objects.all().order_by('id')

