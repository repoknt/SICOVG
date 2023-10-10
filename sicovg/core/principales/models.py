from django.db import models
from django.forms import model_to_dict
from datetime import datetime
from datetime import date
from core.login.models import User


class Clientes(models.Model):
    idCliente = models.AutoField(primary_key=True, verbose_name='idCliente')
    razonSocial = models.CharField(max_length=256, verbose_name='Razon social', null=False, unique=False)
    cuenta = models.CharField(max_length=6, verbose_name='Numero de cuenta', null=False, unique=False)
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
<<<<<<< HEAD
    colaboradorId = models.ForeignKey(User, verbose_name=id, on_delete=models.PROTECT)
=======
>>>>>>> 1ef6b05c7bc6d72365171c9ee0aa73d12317b7e9
    totalDeVentas = models.FloatField(max_length=50, verbose_name='Total de Venta', null=False)
    fechaDeCompra = models.DateField(default=date.today, verbose_name='Fecha de Compra', null=False)
    estatus = models.CharField(max_length=100, verbose_name='Estatus', null=False)

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
<<<<<<< HEAD


=======
    
>>>>>>> 1ef6b05c7bc6d72365171c9ee0aa73d12317b7e9
class Agendarllamada(models.Model):
    idAgenda = models.AutoField(primary_key=True, verbose_name='idAgenda')
    user_al = models.ForeignKey(User, verbose_name='Empleado Agenda', on_delete=models.PROTECT)
    cliente_al = models.ForeignKey(Clientes, verbose_name='Cliente Agenda', on_delete=models.PROTECT)
    fechaAgenda = models.DateTimeField(null=True, default=datetime.now, verbose_name='Fecha agenda')
    fechaLlamada = models.DateTimeField(null=True, verbose_name='Fecha Llamada')
    color = models.CharField(max_length=20, null=True, verbose_name='Color', blank=True)
    estatus = models.CharField(max_length=20, null=True, verbose_name='Estatus', blank=True)
    comentario = models.CharField(max_length=100, null=True, verbose_name='Comentario', blank=True)
    url = models.CharField(max_length=128, verbose_name='Url', null=True, blank=True)
    categoria = models.CharField(max_length=20, null=True, verbose_name='Comentario', blank=True)

    def __str__(self):
        return self.empleado_al

    class Meta:
        db_table = 'Agendarllamada'
        verbose_name = 'Agendarllamada'
        verbose_name_plural = 'Agendarllamada'

    def toJSON(self):
        item = model_to_dict(self)
        item['empleado_al'] = self.empleado_al.toJSON()
        item['cliente_al'] = self.cliente_al.toJSON()
        return item
<<<<<<< HEAD

    class Cita(models.Model):
        idCita = models.AutoField(primary_key=True, verbose_name='idCita')
        empleado_c = models.ForeignKey(User, verbose_name='Empleado Cita', on_delete=models.PROTECT)
        razonSocial = models.CharField(max_length=128, null=True, verbose_name='Razon Social', blank=True)
        responsable = models.CharField(max_length=128, null=True, verbose_name='Responsable', blank=True)
        fechaAgenda = models.DateTimeField(null=True, default=datetime.now, verbose_name='Fecha agenda')
        fechaCita = models.DateTimeField(null=True, verbose_name='Fecha Cita')
        color = models.CharField(max_length=20, null=True, verbose_name='Color', blank=True)
        estatus = models.CharField(max_length=20, null=True, verbose_name='Estatus', blank=True)
        url = models.CharField(max_length=50, verbose_name='Url', null=True, blank=True)

        def __str__(self):
            return self.empleado_c

        class Meta:
            db_table = 'Cita'
            verbose_name = 'Cita'
            verbose_name_plural = 'Citas'

        def toJSON(self):
            item = model_to_dict(self)
            return item
=======
    
class Cita(models.Model):
    idCita = models.AutoField(primary_key=True, verbose_name='idCita')
    empleado_c = models.ForeignKey(User, verbose_name='Empleado Cita', on_delete=models.PROTECT)
    razonSocial = models.CharField(max_length=128, null=True, verbose_name='Razon Social', blank=True)
    responsable = models.CharField(max_length=128, null=True, verbose_name='Responsable', blank=True)
    fechaAgenda = models.DateTimeField(null=True, default=datetime.now, verbose_name='Fecha agenda')
    fechaCita = models.DateTimeField(null=True, verbose_name='Fecha Cita')
    color = models.CharField(max_length=20, null=True, verbose_name='Color', blank=True)
    estatus = models.CharField(max_length=20, null=True, verbose_name='Estatus', blank=True)
    url = models.CharField(max_length=50, verbose_name='Url', null=True, blank=True)

    def __str__(self):
        return self.empleado_c

    class Meta:
        db_table = 'Cita'
        verbose_name = 'Cita'
        verbose_name_plural = 'Citas'

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
class Llamadas(models.Model):
    idLlamada = models.AutoField(primary_key=True, verbose_name='idLlamada')
    empleado = models.ForeignKey(User, verbose_name='idEmpleado', on_delete=models.PROTECT)
    segundos = models.CharField(max_length=128, null=True, verbose_name='segundos', blank=True)
    fecha = models.DateField(null=True, blank=True, verbose_name='Fecha', default=datetime.now)

    def __str__(self):
        return self.empleado.username

    class Meta:
        db_table = 'Llamadas'
        verbose_name = 'Llamada'
        verbose_name_plural = 'Llamadas'

    def toJSON(self):
        item = model_to_dict(self)
        item['empleado'] = self.empleado.toJSON()
        return item
class EmpresaAsignada(models.Model):
    idAsignacion = models.AutoField(primary_key=True, verbose_name='idAsignacion')
    empresa = models.ForeignKey(Clientes, verbose_name='idEmpresa', on_delete=models.PROTECT)
    empleado = models.ForeignKey(User, verbose_name='idEmpleado', on_delete=models.PROTECT)
    comentario = models.CharField(verbose_name='Comentario', max_length=128, default='PROPIA')
    fechaAsignada = models.DateField(default=datetime.now, verbose_name='Fecha Asignación', null=True, blank=True)
    estatus = models.CharField(verbose_name='Estatus', max_length=15, default='SIN ESTATUS')
    

    def __str__(self):
        return self.empleado.username

    class Meta:
        db_table = 'EmpresaAsignada'
        verbose_name = 'EmpresaAsignada'
        verbose_name_plural = 'EmpresasAsignadas'

    def toJSON(self):
        item = model_to_dict(self)
        item['empresa'] = self.empresa.toJSON()
        item['empleado'] = self.empleado.toJSON()
        return item
class PermisosEdicion(models.Model):
    idPermiso = models.AutoField(primary_key=True, verbose_name='idPermiso')
    empresa = models.ForeignKey(Clientes, verbose_name='idEmpresa', on_delete=models.PROTECT)
    empleado = models.ForeignKey(User, verbose_name='idEmpleado', on_delete=models.PROTECT)
    comentario = models.CharField(max_length=128, null=True, verbose_name='Comentario', blank=True)
    estatus = models.CharField(max_length=128, null=True, verbose_name='Estatus', blank=True)
    password = models.CharField(max_length=18, null=True, verbose_name='Contraseña', blank=True)
    fechaEdicion = models.DateField(null=True, default=datetime.now, verbose_name='Fecha de Edición')

    def __str__(self):
        return self.empresa.RFC

    class Meta:
        db_table = 'PermisosEdicion'
        verbose_name = 'PermisosEdicion'
        verbose_name_plural = 'PermisosEdiciones'

    def toJSON(self):
        item = model_to_dict(self)
        item['empresa'] = self.empresa.toJSON()
        item['empleado'] = self.empleado.toJSON()
        return item
class EmpresaDN(models.Model):
    idEmpresaDN = models.AutoField(primary_key=True, verbose_name='idEmpresaDN')
    empresa = models.ForeignKey(Clientes, verbose_name='idEmpresa', on_delete=models.PROTECT)
    dn = models.CharField(max_length=10, unique=False, null=True, verbose_name='DN', blank=True)
    activo = models.BooleanField(default=True, null=False, verbose_name='Activo')

    def __str__(self):
        return self.dn

    class Meta:
        db_table = 'EmpresaDN'
        verbose_name = 'EmpresaDN'
        verbose_name_plural = 'EmpresasDNs'

    def toJSON(self):
        item = model_to_dict(self)
        item['empresa'] = self.empresa.toJSON()
        return item
>>>>>>> 1ef6b05c7bc6d72365171c9ee0aa73d12317b7e9
