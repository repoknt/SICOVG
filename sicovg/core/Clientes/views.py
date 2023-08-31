from datetime import datetime, timezone
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404
from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, TemplateView, FormView, DeleteView
from django.contrib import messages
from core.principales.models import Clientes
from core.Clientes.forms import ClienteForm
from core.login.models import CodigosPostales
from django.utils import timezone


# Nombre de la clase y su herencia
class ClienteView(LoginRequiredMixin, TemplateView):
    template_name = 'ClienteView.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.id = request.user.id
        self.usuario = request.user
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Lista de Clientes'
        context['create_url'] = reverse_lazy('Clientes:Create_cliente')
        return context


def page_not_found404(request, exception):
    return render(request, '404.html')


class ClienteCreateView(LoginRequiredMixin, CreateView):
    model = Clientes
    template_name = 'Create_cliente.html'
    # Formulario que ocuparemos en la vista
    form_class = ClienteForm
    success_url = reverse_lazy('Clientes:Cliente')
    url_redirect = success_url

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):

        data = {}
        try:
            action = request.POST['action']
            if action == 'add':
                # Recuperaremos el formulario
                form = self.get_form()
                # Ejecutaremos el metodo save
                data = form.save()
            elif action == 'search_cp':
                colonias = []
                cp = request.POST['cp']
                codigos = CodigosPostales.objects.filter(Codigo=cp)
                for i in codigos:
                    colonias.append(i.Colonia)
                    estado = i.Estado
                    municipio = i.Municipio
                data['colonias'] = colonias
                data['municipio'] = municipio
                data['estado'] = estado
            else:
                data['error'] = 'No ha ingresado a ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Creación de Usuario'
        context['entity'] = 'Clientes'
        context['list_url'] = self.success_url
        context['action'] = 'add'
        # context['administrativos'] = User.objects.filter(tipoEmpleado__contains='or')
        return context
