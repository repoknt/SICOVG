from django.shortcuts import render


# Create your views here.
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
from django.utils import timezone
from core.principales.models import Inventario
from core.Inventario.forms import InventarioForm

class InventarioView(LoginRequiredMixin, TemplateView):
    template_name = 'Inventario_list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.id = request.user.id
        self.usuario = request.user
        return super().dispatch(request, *args, **kwargs)
    
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
        queryset = Inventario.objects.all()
        return queryset
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Inventario'
        context['create_url'] = reverse_lazy('Inventario:Create')
        return context


def page_not_found404(request, exception):
    return render(request, '404.html')




class InventarioCreateView(LoginRequiredMixin, CreateView):
    model = Inventario
    template_name = 'Inventario_create.html'
    # Formulario que ocuparemos en la vista
    form_class = InventarioForm
    success_url = reverse_lazy('Inventario:List')
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
            else:
                data['error'] = 'No ha ingresado a ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Creación de Inventario'
        context['entity'] = 'Inventario'
        context['list_url'] = self.success_url
        context['action'] = 'add'
        # context['administrativos'] = User.objects.filter(tipoEmpleado__contains='or')
        return context
    
    
class InventarioUpdateView(LoginRequiredMixin, UpdateView):
    model = Inventario
    form_class = InventarioForm
    template_name = 'Inventario_create.html'
    success_url = reverse_lazy('Inventario:Create')
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
                form.instance = instance
                data = form.save()
            else:
                data['error'] = 'No ha ingresado a ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Edición de Inventario'
        context['entity'] = 'Inventario'
        context['list_url'] = self.success_url
        context['action'] = 'edit'
        return context


class InventarioDeleteView(LoginRequiredMixin, DeleteView):
    model = Inventario
    template_name = 'Inventario_delete.html'
    success_url = reverse_lazy('Inventario:List')
    permission_required = 'delete_Inventario'
    url_redirect = success_url

    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        data = {}
        try:
            Inv = Inventario.objects.get(pk=self.object.id)
            Inv.delete()
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminación de Inventario'
        context['entity'] = 'Inventario'
        context['list_url'] = self.success_url
        context['success_url'] = self.success_url
        return context