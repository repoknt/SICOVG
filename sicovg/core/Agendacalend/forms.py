from django.forms import *

from core.principales.models import Cita, Clientes

class EmpresaForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Clientes
        fields = '__all__'
        exclude = ['activo', 'comentario', 'elite', 'segmento']
        widgets = {
            'colonia': Select(),
        }

    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                instance = form.save()
                data = instance.toJSON()
            else:
                data['error'] = form.errors
        except Exception as e:
            data['error'] = str(e)
        return data

class CitaForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Cita
        fields = '__all__'
        exclude = ['idCita', 'fechaAgenda']

    def save(self, commit=False):
        data = {}
        form = super()
        try:
            if form.is_valid():
                instance = form.save()
                data = instance.toJSON()
                print(data)
            else:
                data['error'] = form.errors
        except Exception as e:
            data['error'] = str(e)
        return data