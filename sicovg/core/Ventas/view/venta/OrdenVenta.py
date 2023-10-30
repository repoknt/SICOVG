from datetime import datetime, timezone
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse, Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, TemplateView, FormView, DeleteView
from django.contrib import messages
from core.principales.models import Clientes
from core.Clientes.forms import ClienteForm
from core.principales.models import Inventario
from core.principales.models import DetalleVenta
from core.login.models import User
from django.shortcuts import render

from core.principales.models import Venta


class NuevaVenta(LoginRequiredMixin, TemplateView):
    template_name = 'Venta/OrdenVenta.html'

    def dispatch(self, request, *args, **kwargs):
        cuenta = kwargs['cuenta']  # Obteniendo el valor de 'cuenta' desde la URL
        self.Clientes = self.get_object(cuenta)
        self.idCliente = self.Clientes.toJSON()['cuenta']
        self.encargado = Clientes.objects.get(cuenta=self.idCliente)
        return super().dispatch(request, *args, **kwargs)

    def get_object(self, cuenta):
        try:
            instance = Clientes.objects.get(cuenta=cuenta)
            return instance
        except Clientes.DoesNotExist:
            raise Http404("Cliente no encontrado")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Obtén el objeto Clientes y agrégalo al contexto
        cuenta = kwargs['cuenta']
        cliente = self.get_object(cuenta)

        # Acceder a los campos específicos del objeto Clientes
        context['idCliente'] = cliente.idCliente
        context['razonSocial'] = cliente.razonSocial
        context['cuenta'] = cliente.cuenta
        context['email'] = cliente.email
        context['RFC'] = cliente.RFC
        context['calle'] = cliente.calle
        context['noExt'] = cliente.noExt
        context['noInt'] = cliente.noInt
        context['codigoPostal'] = cliente.codigoPostal
        context['municipio'] = cliente.municipio
        context['estado'] = cliente.estado
        context['colonia'] = cliente.colonia
        context['telefono'] = cliente.telefono

        return context

    def post(self, request, *args, **kwargs):

        action = request.POST.get('action',
                                  None)  # Utiliza .get() para evitar errores si 'action' no está en la solicitud
        if action == 'guardarOrden':
            try:
                data = {}
                data = [producto.toJSON() for producto in Inventario.objects.all().order_by('NombresProducto')]
                filas = request.POST.getlist('filas[]')
                comentario = request.POST['comentario']

                # Crear una nueva venta
                nueva_venta = Venta(totalDeVentas=len(filas), fechaDeCompra=datetime.now(), estatus='movimiento',
                                     clienteID_id=self.idCliente, colaboradorId_id=self.encargado.idCliente,
                                     comentario=comentario)
                nueva_venta.save()

                # Guardar detalles de la venta
                for fila in filas:
                    fila_data = fila.split(',')  # Suponiendo que los datos se envían como una cadena separada por comas
                    idDetalleVenta = fila_data[0]
                    cantidad = fila_data[1]
                    precioUnitario = fila_data[2]
                    precioTotal = fila_data[3]
                    InventarioId_id = fila_data[4]
                    ventaId_id = nueva_venta.idVenta  # Obtener el ID de la venta recién creada

                    # Crear y guardar el detalle de la venta
                    detalle_venta = DetalleVenta(idDetalleVenta=idDetalleVenta, cantidad=cantidad,
                                                 precioUnitario=precioUnitario, precioTotal=precioTotal,
                                                 fechaDeCompra=datetime.now(), InventarioId_id=InventarioId_id,
                                                 ventaId_id=ventaId_id)
                    detalle_venta.save()

                data['success'] = 'Datos guardados correctamente'
            except Exception as e:
                data['error'] = str(e)
        else:
            data['error'] = 'No se ha seleccionado alguna acción'

        return JsonResponse(data)