
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import CreateView, TemplateView
from core.Proovedores.forms import ProovedorForm
from core.principales.models import Proovedor


class ProovedorView(LoginRequiredMixin, TemplateView):
    template_name = 'ProovedorView.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.id = request.user.id
        self.usuario = request.user
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Lista de Proovedores'
        context['create_url'] = reverse_lazy('Proovedores:CrearPr')
        return context


def page_not_found404(request, exception):
    return render(request, '404.html')


class ProovedorCreateView(LoginRequiredMixin, CreateView):
    model = Proovedor
    template_name = 'Create_proovedor.html'

    # Formulario que ocuparemos en la vista
    form_class = ProovedorForm
    success_url = reverse_lazy('Proovedores:Proovedor')
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
        context['title'] = 'Agregar nuevo proovedor'
        return context