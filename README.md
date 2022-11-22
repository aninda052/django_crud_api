# Django CRUD Api

This is a small project showing Django REST Framework CRUD Operation.

## Install

#### Cloning the project

```angular2html
https://github.com/aninda052/django_crud_api.git
cd django_crud_api
```

#### creating `.env` file

Create a `.env` file for your environment variable.

```angular2html
 touch .env
```

You find the details of all the variables in `.env.example` file.
For running the project just copy billow dummy information and past it to your .env file and save it.

```angular2html
DEBUG=True
SECRET_KEY=someRandomSecretKey
```

You can run the project in 2 way

- ###  Using `runserver`  command

```
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver 8000
```


- ### Using `docker-compose`

To run the project using `docker-compose`; `docker` and `docker-compose` must be installed on your system. 
For installation instructions refer to the Docker [docs](https://docs.docker.com/compose/install/).

After you install `docker` and `docker-compose` properly, run -

```angular2html
docker-compose up --build
```

If everything went well, go to `http://127.0.0.1:8000` and you'll find the project up and running.



