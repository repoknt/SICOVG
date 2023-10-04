from django.urls import path

from core.Ventas.view.seguimientoVentas.seguimientoVentas import SeguimientoVentas
from core.Ventas.view.seguimientoVentas.guardaCambios import guardar_cambios
from core.Ventas.view.seguimientoVentas.guardarComentario import guardarComentario
from core.Ventas.view.seguimientoVentas.buscarDatos import buscar_datos






app_name = 'Ventas'

urlpatterns = [
    # Buscar Cuenta
    path('seguimientoVentas/', SeguimientoVentas.as_view(), name='seguimientoVentas'),
    path('guardarCambios/', guardar_cambios, name='guardar_cambios'),
    path('guardarComentario/', guardarComentario, name='guardar_comentario_estado'),
    path('buscarDatos/', buscar_datos, name='buscarDatos'),
] 