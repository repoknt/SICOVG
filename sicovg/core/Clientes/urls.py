from django.urls import path

from core.Clientes.views import ClienteView, ClienteCreateView, ClienteUpdateView, ClienteDeleteView

app_name = 'Clientes'

urlpatterns = [
    path('List/', ClienteView.as_view(), name='Cliente'),
    path('Create/', ClienteCreateView.as_view(), name='Create_cliente'),
    path('Update/<int:pk>/', ClienteUpdateView.as_view(), name='Update_cliente'),
    path('Delete/<int:pk>/', ClienteDeleteView.as_view(), name='Delete_cliente'),
]
