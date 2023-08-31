from django.urls import path

from core.Clientes.views import ClienteView, ClienteCreateView

app_name = 'Clientes'

urlpatterns = [
    path('List/', ClienteView.as_view(), name='Cliente'),
    path('Create/', ClienteCreateView.as_view(), name='Create_cliente'),
]
