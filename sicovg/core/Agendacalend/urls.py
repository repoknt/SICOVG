from core.Agendacalend.views.agendarLlamada.calendario import CalendarioLlamadaView, CalendarioListLlamadaView, \
    CalendarioCreateLlamadaView
from django.urls import path
from core.Agendacalend.views.agendarLlamada import calendario
from core.Agendacalend.views.empresa.views import Ventaview


app_name = 'Agendacalend'

urlpatterns = [
    # Empresa
    path('empresa/detalle/', Ventaview.as_view(), name='empresa_datelle_cuenta'),

    # Agendar llamada
    path('editarevent/<int:id>/', calendario.editarevent, name='editarevent'),
    path('eliminarevent/<int:id>/', calendario.eliminarevent, name='eliminarevent'),
    path('eliminacionid/<int:id>/', calendario.eliminacionid, name='eliminacionid'),
    path('agendarLlamada/', CalendarioLlamadaView.as_view(), name='c_llamada'),
    path('agendarLlamada/list/', CalendarioListLlamadaView.as_view(), name='l_llamada'),
    path('agendarLlamada/create/<str:cuenta>/', CalendarioCreateLlamadaView.as_view(), name='cr_llamada'),
]
