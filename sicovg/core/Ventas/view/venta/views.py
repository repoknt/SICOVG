from datetime import datetime, timezone
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse, Http404
from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, TemplateView, FormView, DeleteView
from django.contrib import messages
from core.principales.models import Clientes
from core.Clientes.forms import ClienteForm
from core.principales.models import Inventario
from core.principales.models import DetalleVenta
from django.utils import timezone


# Nombre de la clase y su herencia
class Ventaview(LoginRequiredMixin, FormView):
    form_class = ClienteForm
    template_name = 'Venta/Ventaview.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST.get('action')
            campo = request.POST.get('campo')
            valor = request.POST.get('valor')

            if action == 'BuscarCuenta':
                if campo == 'cuenta':
                    Cliente = get_object_or_404(Clientes, cuenta=valor)
                else:
                    Cliente = get_object_or_404(Clientes, RFC=valor)

                data = {
                    'cuenta': Cliente.cuenta,
                    'razonSocial': Cliente.razonSocial,
                    'RFC': Cliente.RFC,
                    'idProveedor': Cliente.idCliente,
                    'codigoPostal': Cliente.codigoPostal,
                    'estado': Cliente.estado,
                    'municipio': Cliente.municipio,
                    'colonia': Cliente.colonia,
                    'email': Cliente.email,
                    'telefono': Cliente.telefono,
                }
            else:
                data['error'] = 'No ha ingresado a ninguna opción'
        except Clientes.DoesNotExist:
            data['error'] = 'No hay coincidencias'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Ventas'
        context['name'] = 'Cliente'
        return context
