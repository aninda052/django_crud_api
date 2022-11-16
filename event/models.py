from django.db import models

# Create your models here.


class Event(models.Model):

    name = models.CharField(max_length=500)
    location = models.CharField(max_length=50)
    date = models.DateTimeField()

    def __str__(self):
        return self.name