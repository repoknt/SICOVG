from datetime import datetime
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from django.db import connection, transaction
from core.principales.models import Asistencia
from core.login.models import User


class AsistenciaView(LoginRequiredMixin, TemplateView):
    template_name = 'asistencia/asistencia.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Registar asistencia'
        context['ordenes'] = self.verOrden()
        return context
 
    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'Asistencia':
                id = request.POST['id']
                asistencia = Asistencia()
                asistencia.colaborador = User.objects.get(pk=id)
                asistencia.estatus = 'ASISTENCIA'
                asistencia.save()
                data['message'] = 'Se ha guardado la asistencia'
            elif action == 'Retardo':
                id = request.POST['id']
                asistencia = Asistencia()
                asistencia.colaborador = User.objects.get(pk=id)
                asistencia.estatus = 'RETARDO'
                asistencia.save()
                data['message'] = 'Se ha guardado el retardo'
            elif action == 'Justificada':
                id = request.POST['id']
                asistencia = Asistencia()
                asistencia.colaborador = User.objects.get(pk=id)
                asistencia.estatus = 'JUSTIFICADA'
                asistencia.save()
                data['message'] = 'Se ha guardado la justificada'

            elif action == 'Falta':
                id = request.POST['id']
                asistencia = Asistencia()
                asistencia.colaborador = User.objects.get(pk=id)
                asistencia.estatus = 'FALTA'
                asistencia.save()
                data['message'] = 'Se ha guardado la falta'
            data['error'] = 'Vuelve a intentarlo'
        except Exception as e:
            print(e)
            data['error'] = 'Ha ocurrido un error'
        return JsonResponse(data, safe=False)

    def verOrden(self):
        ordenes = []
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id, CONCAT (first_name,' ',last_name, ' ',last_name_m) AS EMPLEADO FROM login_user WHERE is_active=TRUE;".format())
            row = cursor.fetchall()
            for i in row:
                ordenes.append(
                    {'id': i[0], 'em': i[1]})
        return ordenes
    

