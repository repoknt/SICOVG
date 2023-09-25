from django.urls import path

from core.Ventas.view.seguimientoVentas.seguimientoVentas import SeguimientoVentas

from core.Ventas.view.venta.views import Ventaview

app_name = 'Ventas'

urlpatterns = [
    # Buscar Cuenta
    path('Ventaslista/', Ventaview.as_view(), name='VentasView'),
    path('seguimientoVentas/', SeguimientoVentas.as_view(), name='seguimientoVentas'),

]
