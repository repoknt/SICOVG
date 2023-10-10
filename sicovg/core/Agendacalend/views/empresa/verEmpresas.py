from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

from core.principales.models import Clientes


class VerEmpresasView(LoginRequiredMixin, TemplateView):
    template_name = 'empresa/verEmpresas.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['empresas'] = Clientes.objects.all()
        context['title'] = "Empresas"
        return context