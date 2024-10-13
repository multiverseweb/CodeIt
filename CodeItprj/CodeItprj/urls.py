"""
URL configuration for CodeItprj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from CodeItApp import views

# This is where you define your url patterns so that you can access them while using in navbar  (in this case)
# usecase : for ex href="{% url 'refiner' %}" this will call the function in views.py with name 'refiner'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index,name="index"),
    path('refiner/',views.refiner,name="refiner"),
    path('obfuscate/',views.obfuscate,name="obfuscate"),
    path('timecomplexity/',views.timecomplexity,name="timecomplexity"),
]
