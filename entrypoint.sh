#!/bin/bash

python manage.py makemigrations
python manage.py migrate --no-input
python manage.py collectstatic --noinput
gunicorn django_crud_api.wsgi:application -w 3 --bind 0.0.0.0:8000