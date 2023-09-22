from django.urls import path

from core.Ventas.view.seguimientoVentas.seguimientoVentas import SeguimientoVentas






app_name = 'Ventas'

urlpatterns = [
    # Buscar Cuenta
    path('seguimientoVentas/', SeguimientoVentas.as_view(), name='seguimientoVentas'),

]