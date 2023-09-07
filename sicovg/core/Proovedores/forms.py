from datetime import datetime

from django.forms import *

from core.principales.models import Proovedor


class PrForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields['codigoPostal'].queryset = CodigosPostales.objects.first()

    class Meta:
        model = Proovedor
        fields = '__all__'

        widgets = {
            'colonia': Select(),
            'fechaNacimiento': DateInput(
                format='%Y-%m-%d',
                attrs={
                    'value': datetime.now().strftime('%Y-%m-%d'),
                    'class': 'form-control'
                }
            ),
        }

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
