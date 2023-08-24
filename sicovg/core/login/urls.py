from django.urls import path

# app_name = 'login'
from core.login.views.views import *

urlpatterns = [
    path('', LoginFormView.as_view(), name='login'),
]
