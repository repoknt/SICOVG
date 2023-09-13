from datetime import datetime

from django.forms import *

from core.principales.models import Inventario


class InventarioForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields['codigoPostal'].queryset = CodigosPostales.objects.first()

    class Meta:
        model = Inventario
        exclude = ['FechaDeCompra']
        fields = '__all__'


        

    def save(self, commit=False):
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
