from django.urls import path

from core.Ventas.view.seguimientoVentas.seguimientoVentas import SeguimientoVentas
from core.Ventas.view.seguimientoVentas.guardaCambios import guardar_cambios
from core.Ventas.view.seguimientoVentas.guardarComentario import guardarComentario
from core.Ventas.view.seguimientoVentas.buscarDatos import buscar_datos

from core.Ventas.view.venta.views import Ventaview

app_name = 'Ventas'

urlpatterns = [
    # Buscar Cuenta
    path('Ventaslista/', Ventaview.as_view(), name='VentasView'),
    path('seguimientoVentas/', SeguimientoVentas.as_view(), name='seguimientoVentas'),
<<<<<<< HEAD
    path('guardarCambios/', guardar_cambios, name='guardar_cambios'),
    path('guardarComentario/', guardarComentario, name='guardar_comentario_estado'),
    path('buscarDatos/', buscar_datos, name='buscarDatos'),
] 
=======

]
>>>>>>> cc7ca7da32ebd579223292ad09aef8c7bb8a85c1
