from django.db import models
from django.forms import model_to_dict
from datetime import datetime
from datetime import date
from core.login.models import User


class Clientes(models.Model):
    idCliente = models.AutoField(primary_key=True, verbose_name='idCliente')
    razonSocial = models.CharField(max_length=256, verbose_name='Razon social', null=False, unique=False)
    cuenta = models.CharField(max_length=6, verbose_name='Cuenta', null=False, blank=True)
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
    idProveedor = models.AutoField(primary_key=True, verbose_name='idProveedor')
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

    def toJSON(self):
        item = model_to_dict(self)
        return item



class Inventario(models.Model):
    idInventario = models.AutoField(primary_key=True, verbose_name='idInventario')
    NombresProducto = models.CharField(max_length=100, verbose_name='Nombre Producto', null=False)
    Descripcion = models.CharField(max_length=200, verbose_name=' Descripcion', null=False)
    Categoria = models.CharField(max_length=100, verbose_name='Categoria ', null=False)
    NumeroDeSerie = models.CharField(max_length=20, verbose_name=' Numero De Serie', null=False)
    CantidadDeStock = models.IntegerField(verbose_name=' Cantidad En Stock', null=False)
    PrecioUnitario = models.FloatField(max_length=50, verbose_name=' Precio Unitario', null=False)
    PrecioDeCompra = models.FloatField(max_length=50, verbose_name=' Precio De Compra', null=False)
    FechaDeCompra = models.DateField(default=datetime.now, verbose_name='Fecha De Compra', null=False)
    NivelDeReordenamiento = models.IntegerField(verbose_name=' Numero De Ordenamiento ', null=False)

    class Meta:
        db_table = 'Inventario'
        verbose_name = 'Inventario'
        verbose_name_plural = 'Inventarios'

    def toJSON(self):
        item = model_to_dict(self)
        return item


class Venta(models.Model):
    idVenta = models.AutoField(primary_key=True, verbose_name='idVenta')
    clienteId = models.ForeignKey(Clientes, verbose_name='idCliente', on_delete=models.PROTECT)
    colaboradorId=models.ForeignKey(User, verbose_name=id, on_delete=models.PROTECT)
    totalDeVentas = models.FloatField(max_length=50, verbose_name='Total de Venta', null=False)
    fechaDeCompra = models.DateField(default=date.today, verbose_name='Fecha de Compra', null=False)
    estatus = models.CharField(max_length=100, verbose_name='Estatus', null=False)
    comentario = models.CharField(max_length=250, verbose_name='Estatus', null=False)

    class Meta:
        db_table = 'Venta'
        verbose_name = 'Venta'
        verbose_name_plural = 'Ventas'

    def toJSON(self):
        item = model_to_dict(self)
        return item


class DetalleVenta(models.Model):
    idDetalleVenta = models.AutoField(primary_key=True, verbose_name='idDetalleVenta')
    ventaId = models.ForeignKey(Venta, verbose_name='idVenta', on_delete=models.PROTECT)
    inventarioId = models.ForeignKey(Inventario, verbose_name='idInventario', on_delete=models.PROTECT)
    cantidad = models.IntegerField(verbose_name='Cantidad', null=False)
    precioUnitario = models.FloatField(max_length=50, verbose_name='Precio Unitario', null=False)
    precioTotal = models.FloatField(max_length=50, verbose_name='Precio Total', null=False)
    fechaDeCompra = models.DateField(default=date.today, verbose_name='Fecha de Compra', null=False)

    class Meta:
        db_table = 'DetalleVenta'
        verbose_name = 'DetalleVenta'
        verbose_name_plural = 'DetalleVentas'

    def toJSON(self):
        item = model_to_dict(self)
        return item