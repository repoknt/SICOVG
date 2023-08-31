from django.db import models
from django.forms import model_to_dict


class Clientes(models.Model):
    razonSocial = models.CharField(max_length=256, verbose_name='Razon social', null=False, unique=False)
    email = models.CharField(max_length=128, verbose_name='Email', blank=True, null=True)
    RFC = models.CharField(max_length=18, verbose_name='RFC', unique=False)
    calle = models.CharField(max_length=128, verbose_name='Calle', null=True, blank=True)
    noExt = models.CharField(max_length=15, verbose_name='No exterior', default='SN', blank=True)
    noInt = models.CharField(max_length=15, verbose_name='No Interior', default='SN', blank=True)
    codigoPostal = models.CharField(verbose_name='Codigo Postal', max_length=5, null=True, blank=True)
    municipio = models.CharField(verbose_name='Municipio', max_length=128, null=True, blank=True)
    estado = models.CharField(verbose_name='Estado', max_length=64, null=True, blank=True)
    colonia = models.CharField(verbose_name='Colonia', max_length=128, null=True, blank=True)
    telefono = models.CharField(max_length=10, verbose_name='Telefono', null=True, blank=True)

    class Meta:
        db_table = 'Cliente'
        verbose_name = 'cliente'
        verbose_name_plural = 'Clientes'

    def toJSON(self):
        item = model_to_dict(self)
        return item


class Proovedor(models.Model):
    razonSocial = models.CharField(max_length=256, null=False, unique=False)
    cuenta = models.CharField(max_length=10, verbose_name='Cuenta', unique=True)
    RFC = models.CharField(max_length=18, verbose_name='RFC', unique=False)
    codigoPostal = models.CharField(verbose_name='Codigo Postal', max_length=5, null=True, blank=True)
    municipio = models.CharField(verbose_name='Municipio', max_length=128, null=True, blank=True)
    estado = models.CharField(verbose_name='Estado', max_length=64, null=True, blank=True)
    colonia = models.CharField(verbose_name='Colonia', max_length=128, null=True, blank=True)
    telefono = models.CharField(max_length=10, verbose_name='Telefono', null=True, blank=True)
    email = models.CharField(max_length=128, verbose_name='Email', blank=True, null=True)
    activo = models.CharField(max_length=5, verbose_name='Activo', null=True, blank=True)
    representanteLegal = models.CharField(max_length=128, verbose_name='Representante legal', null=True, blank=True)

    class Meta:
        db_table = 'Proovedor'
        verbose_name = 'Proovedor'
        verbose_name_plural = 'Proovedores'
