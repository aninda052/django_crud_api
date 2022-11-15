from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models

# Create your models here.


class UserManager(BaseUserManager):
    def users(self):

        return super().all()


class User(AbstractBaseUser):
    username = models.CharField(verbose_name='User name',max_length=255,unique=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'username'


    @classmethod
    def get_or_create(self, **kwargs):
        username = kwargs.get("username", "")
        password = kwargs.get("password", "")
        created =  False
        user = self.objects.filter(username=username).first()
        if not user and password:
            user =  self.objects.create(username=username)
            user.set_password(password)
            user.save()
            created = True
        return user, created