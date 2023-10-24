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
from django.utils import timezone


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


    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        if action == 'RProductos':
            data = []
            for i in Inventario.objects.all().order_by('NombresProducto'):
                data.append(i.toJSON())
        elif action == 'guardarOrden':

            data['error'] = 'No se ha seleccionado alguna acción'
        return JsonResponse(data, safe=False)
