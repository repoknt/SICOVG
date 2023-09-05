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


        # la sobreescritura del metodo post, es para personalizar lo que queremos que haga la acción

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                # consulta en ORM de todos los usuarios activos
                for i in self.get_queryset():
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            print(e)
            # data['error'] = 'Ha ocurrido un error'
        return JsonResponse(data, safe=False)

    def get_queryset(self):
        queryset = Clientes.objects.all()
        return queryset

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


class ClienteUpdateView(LoginRequiredMixin, UpdateView):
    model = Clientes
    form_class = ClienteForm
    template_name = 'Create_cliente.html'
    success_url = reverse_lazy('Clientes:Cliente')
    url_redirect = success_url

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        # Esta línea de código nos permite recuperar la variable que pasamos en la URL del navegador, en este caso un id
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'edit':
                instance = self.get_object()
                form = self.get_form()
                # Populate the form with the submitted data and save the instance
                form.instance = instance
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
        context['title'] = 'Edición de Clientes'
        context['entity'] = 'Clientes'
        context['list_url'] = self.success_url
        context['action'] = 'edit'
        return context


class ClienteDeleteView(LoginRequiredMixin, DeleteView):
    model = Clientes
    template_name = 'Delete_Cliente.html'
    success_url = reverse_lazy('Clientes:Cliente')
    permission_required = 'delete_Cliente'
    url_redirect = success_url

    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        data = {}
        try:
            # Get the object to be deleted
            Cliente = Clientes.objects.get(pk=self.object.id)
            Cliente.delete()
            # Guardaremos el usuario
            Cliente.save()
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminación de Clientes'
        context['entity'] = 'Usuarios'
        context['list_url'] = self.success_url
        context['success_url'] = self.success_url
        return context
