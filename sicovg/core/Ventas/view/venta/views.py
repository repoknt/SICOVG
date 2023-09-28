from datetime import datetime, timezone
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse, Http404
from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, TemplateView, FormView, DeleteView
from django.contrib import messages
from core.principales.models import Proovedor
from core.Proovedores.forms import PrForm
from django.utils import timezone


# Nombre de la clase y su herencia
class Ventaview(LoginRequiredMixin, FormView):
    form_class = PrForm
    template_name = 'Venta/Ventaview.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.id = request.user.id
        self.usuario = request.user
        return super().dispatch(request, *args, **kwargs)

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            # Buscar cuenta por DN o cuenta O RFC
            if action == 'BuscarCuenta':
                campo = request.POST['campo']
                valor = request.POST['valor']
                # Evaluamos el tipo de búsqueda
                if campo == 'cuenta':
                    empresa = Proovedor.objects.raw(
                        "SELECT * FROM Proovedor WHERE cuenta = '{}';".format(
                            valor))
                else:
                    empresa = Proovedor.objects.raw("SELECT * FROM Proovedor WHERE {} = '{}';".format(campo, valor))
                # Evaluamos si existe una coincidencia
                if empresa:
                    for i in empresa:
                        # Si existe comprobaremos el empleado
                        Pr = Proovedor.objects.get(idProveedor=i.idProveedor)
                        # Si es ejecutivo, se sometera a propiedad de la cuenta
                else:
                    data['error'] = 'No hay coincidencias'
                    data.append(Proovedor.toJSON())
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)
