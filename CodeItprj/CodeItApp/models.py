from django.db import models

# Create your models here.

# here is where you can create the tables /models like 
# Django has inbuilt models for users, you can use your own model as well 
# for example :
# class user(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField(max_length=100)
# make sure you run python manage.py makr migrations followed by python manage.py migrate on your terminal
# Django also provides an admin panel , you can create a superuser  django-admin createsuperuser , run the server and go to /admin
