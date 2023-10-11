from django.urls import path

from core.rh.view.asistencia.asistencia import AsistenciaView
from core.rh.view.asistencia.asistenciaReporte  import AsistenciaReporteAnteriorView, AsistenciaReporteView
from core.rh.view.permisoInasistencia.permisoInasistencia import permisoInasistenciaListView, permisoInasistenciaRhView

app_name = 'rh'

urlpatterns = [
# Asistencia
    path('asistencia/', AsistenciaView.as_view(), name='asistencia'),
    path('asistencia/asistenciaReporte/', AsistenciaReporteView.as_view(), name='asistenciaReporte'),
    path('asistencia/asistenciaReporteAnterior/', AsistenciaReporteAnteriorView.as_view(), name='asistenciaReporteAnterior'),
    path('permisoInasistencia/', permisoInasistenciaListView.as_view(), name='permisoInasistencia'),
    path('permisoInasistenciaRH/', permisoInasistenciaRhView.as_view(), name='permisoInasistencia_rh'),

]
