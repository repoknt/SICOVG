
from email.message import EmailMessage
from datetime import datetime
import random
from django.core.mail import EmailMessage
import smtplib
import sicovg.settings as settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import model_to_dict
# from core.erp.models import CodigosPostales
from core.login.choices import user_choices, gender_choices


class CodigosPostales(models.Model):
    idCodigoPostal = models.IntegerField(primary_key=True, verbose_name='idCodigoPostal')
    Codigo = models.IntegerField(verbose_name='Codigo', null=True, blank=True)
    Municipio = models.CharField(max_length=128, verbose_name='Municipio', null=True, blank=True)
    Estado = models.CharField(max_length=128, verbose_name='Estado', null=True, blank=True)
    Colonia = models.CharField(max_length=128, verbose_name='Colonia', null=True, blank=True)

    def __str__(self):
        return '{} / {} / {}'.format(self.Municipio, self.Estado, self.Colonia)

    def get_full_name(self):
        return '{} / {} / {}'.format(self.Municipio, self.Estado, self.Colonia)

    class Meta:
        db_table = 'CodigosPostales'
        verbose_name = 'CodigoPostal'
        verbose_name_plural = 'CodigosPotales'

    def toJSON(self):
        item = model_to_dict(self, exclude=['id'])
        item['id'] = self.idCodigoPostal
        return item





class User(AbstractUser):
    last_name_m = models.CharField(max_length=64, verbose_name='Apellido Materno', null=True)
    calle = models.CharField(max_length=128, verbose_name='Calle', null=True)
    noExt = models.CharField(max_length=15, verbose_name='No exterior', default='SN')
    noInt = models.CharField(max_length=15, verbose_name='No interior', default='SN')
    codigoPostal = models.CharField(verbose_name='Codigo Postal', max_length=5, null=True, blank=True)
    municipio = models.CharField(verbose_name='Municipio', max_length=128, null=True, blank=True)
    estado = models.CharField(verbose_name='Estado', max_length=64, null=True, blank=True)
    colonia = models.CharField(verbose_name='Colonia', max_length=128, null=True, blank=True)
    tipoEmpleado = models.CharField(max_length=25, choices=user_choices, default='Ejecutivo',
                                    verbose_name='Tipo de Empleado')
    telefonoPersonal = models.CharField(max_length=10, verbose_name='Telefono personal', null=True)
    fechaNacimiento = models.DateField(default=datetime.now, verbose_name='Fecha de nacimiento', null=True, blank=True)
    parentesco = models.CharField(max_length=64, verbose_name='Parentesco', null=True, blank=True)
    token = models.UUIDField(primary_key=False, editable=False, null=True, blank=True)
    generated_username = models.CharField(max_length=100, blank=True)
    generated_password = models.CharField(max_length=100, blank=True)

    # Convertir el modelo a un diccionario de datos para una mejor manipulación
    def toJSON(self):
        item = model_to_dict(self, exclude=['last_login', 'groups', 'user_permissions', 'password'])
        if self.last_login:
            item['last_login'] = self.last_login.strftime('%Y-%m-%d')
        if self.fechaNacimiento:
            item['fechaNacimiento'] = self.fechaNacimiento.strftime('%Y-%m-%d')
        if self.fechaBaja:
            item['fechaBaja'] = self.fechaBaja.strftime('%Y-%m-%d')
        item['date_joined'] = self.date_joined.strftime('%Y-%m-%d')
        item['full_name'] = '{} {} {}'.format(self.first_name, self.last_name, self.last_name_m)
        item['colaborador'] = self.comprobarArchivo(self.colaborador)
        return item

    # sobreescribir el metodo save de django, para poder cifrar la contraseña del usuario y personalizar el usuario
    def contraseña(self):
        longitud = 8
        valores = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ<=>@#%&+"
        p = "".join([random.choice(valores) for i in range(longitud)])
        print(p)
        return p

    def nombreUsuario(self):
        return '{}{}{}{}'.format(self.first_name[0].upper(), self.last_name.upper(), self.last_name_m[0].upper(),
                                 self.edad)

    def save(self, *args, **kwargs):
        if self.pk is None:
            contra = self.contraseña()
            self.username = self.nombreUsuario()
            self.set_password(contra)
            self.generated_username = self.username
            self.generated_password = contra
        super().save()
        try:
            remitente = "sistemas.kon.knt@gmail.com"
            destinatario = "isabeltrujillo.konect@gmail.com"
            mensaje = 'Tu contraseña es: ' + contra + ' y tu usuario es: ' + self.nombreUsuario()
            email = EmailMessage()
            email['From'] = remitente
            email['To'] = destinatario
            email['Subject'] = 'USUARIO SICOV'
            email.set_content(mensaje)
            smtp = smtplib.SMTP_SSL('smtp.gmail.com')
            smtp.login(remitente, 'mltiukpaeqibddqo')
            smtp.sendmail(remitente, destinatario, email.as_string())
            smtp.quit()
        except Exception as e:
            print(str(e))

    def comprobarArchivo(self, archivo):
        if archivo != "":
            return '{}'.format(settings.MEDIA_URL, archivo)
        return '#!'

def upload_path_handler(instance, filename):
    return "expedienteuser/{}/{}".format(instance.idEmpleado, filename)