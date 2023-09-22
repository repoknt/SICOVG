
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView




class SeguimientoVentas(LoginRequiredMixin, TemplateView):
    template_name = 'seguimientoVentas/seguimientoVentas.html'