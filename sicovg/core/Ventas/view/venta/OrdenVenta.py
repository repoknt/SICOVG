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
from core.login.models import User
from django.utils import timezone

class NuevaVenta(LoginRequiredMixin, TemplateView):
    template_name = 'Venta/OrdenVenta.html'

    def dispatch(self, request, *args, **kwargs):
        self.idDetalleVenta = kwargs['cuenta']
        self.Clientes = self.get_object()
        self.idEmpresa = self.Clientes.toJSON()['cuenta']
        self.encargado = Clientes.objects.get(cuenta=self.idEmpresa)
        return super().dispatch(request, *args, **kwargs)

    def get_object(self):
        try:
            instance = Clientes.objects.get(cuenta=self.idDetalleVenta)
            print()
            return instance
        except Exception as e:
            print(e)
            raise Http404



