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



class AsistenciaReporteView(LoginRequiredMixin, TemplateView):
        template_name = 'asistencia/asistenciaReporte.html'

        def dispatch(self, request, *args, **kwargs):
            return super().dispatch(request, *args, **kwargs)

        def get_context_data(self, **kwargs):
            context = super().get_context_data(**kwargs)
            context['title'] = 'Reporte Mensual de Asistencia'
            context['reporte'] = self.reporteOrden()
            return context

        def reporteOrden(self):
    # Creamos un arreglo
            reporte = []
    # con un cursor de la DB (Conexión)
            with connection.cursor() as cursor:
        # creamos la consulta SQL
                cursor.execute(
            "SELECT colaborador_id AS id, CONCAT(first_name,' ',last_name, ' ',last_name_m) AS EMPLEADO, " 
            "(SELECT COUNT(estatus) FROM asistencia WHERE estatus='ASISTENCIA' AND asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS ASIS, "
            "(SELECT COUNT(estatus) FROM asistencia WHERE estatus='RETARDO' AND asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS RETARDO, "
            "(SELECT COUNT(estatus) FROM asistencia WHERE estatus='JUSTIFICADA' AND asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS JUSTIFICADA, "
            "(SELECT COUNT(estatus) FROM asistencia WHERE estatus='FALTA' AND asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS FALTA, "
            "(SELECT COUNT(estatus) FROM asistencia WHERE asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS TOTAL "
            "FROM asistencia a INNER JOIN login_user u ON a.colaborador_id=u.id "
            "WHERE u.is_active=TRUE "
            "GROUP BY colaborador_id;"
        )
        # Ejecutamos la consulta y extraemos el resultado en una variable
                row = cursor.fetchall()
        # Recorremos los resultados con un FOR
                for i in row:
            # Creamos un diccionario y lo añadimos al arreglo, para su almacenamiento
                   reporte.append(
                {'id': i[0], 'name': i[1], 'a': i[2], 'r': i[3], 'j': i[4], 'f': i[5], 't': i[6] }
            )
                return reporte

class AsistenciaReporteAnteriorView(LoginRequiredMixin, TemplateView):
    template_name = 'asistencia/asistenciaReporteAnterior.html'

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Reporte Mensual de Asistencia'
        context['reporte'] = self.reporteOrden()
        return context

    def reporteOrden(self):
    # Creamos un arreglo
            reporte = []
    # con un cursor de la DB (Conexión)
            with connection.cursor() as cursor:
        # creamos la consulta SQL
                cursor.execute(
            "SELECT colaborador_id AS id, CONCAT(first_name,' ',last_name, ' ',last_name_m) AS EMPLEADO, " 
            "(SELECT COUNT(estatus) FROM asistencia WHERE estatus='ASISTENCIA' AND asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS ASIS, "
            "(SELECT COUNT(estatus) FROM asistencia WHERE estatus='RETARDO' AND asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS RETARDO, "
            "(SELECT COUNT(estatus) FROM asistencia WHERE estatus='JUSTIFICADA' AND asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS JUSTIFICADA, "
            "(SELECT COUNT(estatus) FROM asistencia WHERE estatus='FALTA' AND asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS FALTA, "
            "(SELECT COUNT(estatus) FROM asistencia WHERE asistencia.colaborador_id=u.id "
            "AND MONTH(fechaAsistencia) = MONTH(CURRENT_DATE()) AND YEAR(fechaAsistencia) = YEAR(CURRENT_DATE())) AS TOTAL "
            "FROM asistencia a INNER JOIN login_user u ON a.colaborador_id=u.id "
            "WHERE u.is_active=TRUE "
            "GROUP BY colaborador_id;"
        )
        # Ejecutamos la consulta y extraemos el resultado en una variable
                row = cursor.fetchall()
        # Recorremos los resultados con un FOR
                for i in row:
            # Creamos un diccionario y lo añadimos al arreglo, para su almacenamiento
                   reporte.append(
                {'id': i[0], 'name': i[1], 'a': i[2], 'r': i[3], 'j': i[4], 'f': i[5], 't': i[6] }
            )
                return reporte