from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, TemplateView, UpdateView, DeleteView
from django.db import connection
from datetime import datetime
    
from django.http import HttpResponse, JsonResponse
from core.Agendacalend.forms import CitaForm
from core.principales.models import Agendarllamada, Clientes
from core.login.models import User
from django.shortcuts import render
from django.db import connection

from django.shortcuts import render, get_object_or_404, redirect
from core.principales.models import Agendarllamada  # Asegúrate de importar tu modelo

from django.http import HttpResponse

def eliminarevent(request, id):
    try:
        agendarllamada = Agendarllamada.objects.get(pk=id)
        agendarllamada.delete()
        
        # Devuelve una respuesta con JavaScript para cerrar la ventana emergente y recargar la página
        response = HttpResponse('<script>window.close(); window.opener.location.reload();</script>')
        return response

    except Agendarllamada.DoesNotExist:
        return redirect('agendarLlamada/calendario.html')

def eliminacionid(request, id):
    try:
        agendarllamada = Agendarllamada.objects.get(pk=id)
        # Cambia el estatus a "Finalizado"
        agendarllamada.estatus = 'Finalizado'
        agendarllamada.save()
        # Redirige de vuelta a la página actual
        return redirect(reverse_lazy('Agendacalend:c_llamada')) 

    except Agendarllamada.DoesNotExist:
        return redirect('agendarLlamada/calendario.html')

def editarevent(request, id):
    try:
        agendarllamada = Agendarllamada.objects.get(pk=id)
        # Cambia el estatus a "Finalizado"
        agendarllamada.estatus = 'Finalizado'
        agendarllamada.save()
        # Devuelve una respuesta con JavaScript para cerrar la ventana emergente y recargar la página
        response = HttpResponse('<script>window.close(); window.opener.location.reload();</script>')
        return response

    except Agendarllamada.DoesNotExist:
        return redirect('agendarLlamada/calendario.html')


# def eliminacionid(request, id):
#     try:
#         agendarllamada = Agendarllamada.objects.get(pk=id)
#         agendarllamada.delete()
#         return redirect(reverse_lazy('Agendacalend:c_llamada')) 
       
    
#     except Agendarllamada.DoesNotExist:
#         return redirect('agendarLlamada/calendario.html')


class CalendarioLlamadaView(LoginRequiredMixin, ListView):
    model = Agendarllamada
    template_name = 'agendarLlamada/calendario.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.idUser = request.user.id
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Agenda de Llamadas'
        context['action'] = 'nuevo'
        context['calen'] = self.consulta()
        context['cal'] = self.consul()
        return context
    
    def consul(self):
        calen = []
        with connection.cursor() as cursor:
            cursor.execute(
            "SELECT  c.razonSocial,fechaLlamada, url, color, estatus, a.comentario, categoria, a.idAgenda FROM agendarllamada a INNER JOIN cliente c ON a.cliente_al_id = c.idCliente WHERE a.user_al_id={};".format(self.idUser))
            row = cursor.fetchall()
        for i in row:
            calen.append({'razonSocial': i[0], 'fechaLlamada': i[1], 'url': i[2], 'color': i[3], 'estatus': i[4], 'comentario': i[5], 'categoria': i[6], 'idAgenda': i[7]})
        return calen

    def consulta(self):
        cal = []
        today = datetime.today().date()
        
        with connection.cursor() as cursor:
            cursor.execute(
            "SELECT c.razonSocial,fechaLlamada, url, color, estatus, a.comentario, categoria, a.idAgenda FROM agendarllamada a INNER JOIN cliente c ON a.cliente_al_id = c.idCliente WHERE a.user_al_id={};".format(self.idUser))
            rows = cursor.fetchall()
        for row in rows:
            fecha_llamada = row[1].date()
            if fecha_llamada == today:
                cal.append({ 'razonSocial': row[0],'fechaLlamada': row[1], 'url': row[2], 'color': row[3], 'estatus': row[4], 'comentario': row[5], 'categoria': row[6], 'idAgenda': row[7]})
        return cal
    
class CalendarioCreateLlamadaView(LoginRequiredMixin, TemplateView):
    model = Agendarllamada
    template_name = 'agendarLlamada/create.html'
    success_url = reverse_lazy('Agendacalend:l_llamada')
    url_redirect = success_url

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.idUser = request.user.id
        self.cuenta = kwargs['cuenta']
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        cuenta = self.cuenta
        try:
            action = request.POST['action']
            if action == 'add':
                
                c = Clientes.objects.get(cuenta=self.cuenta)
                print(c)
                al = Agendarllamada()
                al.user_al = User.objects.get(pk=request.user.id)
                al.cliente_al = c 
                al.fechaLlamada = request.POST['fechaLlamada']
                al.comentario = request.POST['comentario']
                al.color = 'yellow'
                al.estatus = 'PENDIENTE'
                al.url = 'http://172.22.29.222:8000/Agendacalend/agendarLlamada/list/'
                categoria_seleccionada = request.POST.get('categoria', '')
                al.categoria = categoria_seleccionada
                al.save()

            else:
                data['error'] = 'No ha ingresado ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Creación de Llamada'
        context['entity'] = 'Agenda'
        context['list_url'] = self.success_url
        context['action'] = 'add'
        return context

class CalendarioListLlamadaView(LoginRequiredMixin, TemplateView):
    model = Agendarllamada
    template_name = 'agendarLlamada/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.idUser = request.user.id
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Agenda de Llamadas'
        context['create_url'] = ''
        context['list_url'] = reverse_lazy('Agendacalend:l_llamada') #pendiente cr_llamada
        context['entity'] = 'Agenda de Llamadas'
        return context

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in Agendarllamada.objects.raw(
                "SELECT * FROM agendarllamada a INNER JOIN cliente c ON a.user_al_id = c.idCliente WHERE user_al_id={} AND estatus='PENDIENTE'".format(self.idUser)):
                    data.append(i.toJSON())
            elif action == 'realizada':
                ci = Agendarllamada.objects.get(pk=request.POST['idAgenda'])
                ci.color = 'blue'
                ci.estatus = 'CON EJECUTIVO'
                ci.save()
                data['message'] = '¡Se guardó correctamente!'
            elif action == 'propuesta':
                ci = Agendarllamada.objects.get(pk=request.POST['idAgenda'])
                ci.color = 'green'
                ci.estatus = 'ENVÍA PROPUESTA'
                ci.save()
                data['message'] = '¡Se guardó correctamente!'
            elif action == 'cancelada':
                ci = Agendarllamada.objects.get(pk=request.POST['idAgenda'])
                ci.color = 'red'
                ci.estatus = 'CANCELADA'
                ci.save()
                data['message'] = '¡Se guardó correctamente!'
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            print(str(e))
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

class CalendarioUpdateLlamadaView(LoginRequiredMixin, UpdateView):
    model = Agendarllamada
    form_class = CitaForm
    template_name = 'citaRoyal/create.html'
    success_url = reverse_lazy('royal:l_royal')
    url_redirect = success_url

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Edición de Citas'
        context['entity'] = 'Calendario Royal'
        context['list_url'] = self.success_url
        context['action'] = 'edit'
        return context

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'edit':
                form = self.get_form()
                data = form.save()
            else:
                data['error'] = 'No ha ingresado a ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)
    