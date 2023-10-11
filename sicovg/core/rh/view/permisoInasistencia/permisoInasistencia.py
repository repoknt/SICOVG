from datetime import datetime
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView

from core.login.models import User
from core.principales.models import PermisoInasistencia



class permisoInasistenciaListView(LoginRequiredMixin, ListView):
    model = PermisoInasistencia
    template_name = 'permisoInasistencia/permisoInasistencia.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Permisos de Inasistencia'
        context['create_url'] = reverse_lazy('erp:permisoInasistencia')
        context['list_url'] = reverse_lazy('erp:permisoInasistencia')
        context['entity'] = 'Permisos De Inasistencia'
        context['action'] = 'enviar'
        return context

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'mostrar':
                data = []
                for i in PermisoInasistencia.objects.filter(empleadoo_id=request.user.id):
                    data.append(i.toJSON())
                print(data)
            elif action == 'enviar':
                user = User.objects.get(pk=request.user.id)
                permiso = PermisoInasistencia()
                permiso.empleadoo = user
                permiso.fechaInasistencia = request.POST['fechaInasistencia']
                permiso.motivo = request.POST['motivo']
                permiso.estatus = 'PENDIENTE'
                permiso.fechaCreacion = datetime.now()
                print(permiso)
                permiso.save()
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            print(e)
            data['error'] = 'Verifique su formulario'
        return JsonResponse(data, safe=False)

class permisoInasistenciaRhView(LoginRequiredMixin, ListView):
    model = PermisoInasistencia
    template_name = 'permisoInasistencia/permisoInasistenciaList.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Permisos de Inasistencia'
        context['create_url'] = ''
        context['list_url'] = reverse_lazy('erp:permisos_edicion_create')
        context['entity'] = 'Permisos De Inasistencia'
        return context

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                # Extraer todos los permisos de los usuarios del COORDINADOR O ADMINISTRADOR
                for i in PermisoInasistencia.objects.raw(
                        "SELECT * FROM  PermisoInasistencia p INNER JOIN user_user u ON p.empleadoo_id = u.id WHERE estatus='PENDIENTE';".format()):
                    data.append(i.toJSON())
            elif action == 'aceptarPermiso':
                permiso = PermisoInasistencia.objects.get(pk=request.POST['idPermiso'])
                permiso.estatus = 'ACEPTADA'
                permiso.comentario = request.POST['comentario']
                permiso.save()
                data['message'] = '¡Se guardó correctamente!'
            elif action == 'rechazarPermiso':
                permiso = PermisoInasistencia.objects.get(pk=request.POST['idPermiso'])
                permiso.estatus = 'RECHAZADA'
                permiso.comentario = request.POST['comentario']
                permiso.save()
                data['message'] = '¡Se ha rechazado!'
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            print(str(e))
            data['error'] = str(e)
        return JsonResponse(data, safe=False)