from django.urls import path

from event.views import EventView

app_name = 'event'

urlpatterns = [
    path('event/', EventView.as_view(), name='events-url'),
]