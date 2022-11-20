FROM python:3.8-slim-buster
ENV PYTHONUNBUFFERED=1
COPY . /django_crud_api
WORKDIR /django_crud_api
RUN pip install -r requirements.txt
ENTRYPOINT [ "sh", "entrypoint.sh" ]