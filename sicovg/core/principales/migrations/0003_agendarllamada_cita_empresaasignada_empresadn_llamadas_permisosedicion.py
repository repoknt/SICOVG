# Generated by Django 3.2.2 on 2023-10-10 15:59

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('principales', '0002_venta_colaboradorid'),
    ]

    operations = [
        migrations.CreateModel(
            name='PermisosEdicion',
            fields=[
                ('idPermiso', models.AutoField(primary_key=True, serialize=False, verbose_name='idPermiso')),
                ('comentario', models.CharField(blank=True, max_length=128, null=True, verbose_name='Comentario')),
                ('estatus', models.CharField(blank=True, max_length=128, null=True, verbose_name='Estatus')),
                ('password', models.CharField(blank=True, max_length=18, null=True, verbose_name='Contraseña')),
                ('fechaEdicion', models.DateField(default=datetime.datetime.now, null=True, verbose_name='Fecha de Edición')),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='idEmpleado')),
                ('empresa', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='principales.clientes', verbose_name='idEmpresa')),
            ],
            options={
                'verbose_name': 'PermisosEdicion',
                'verbose_name_plural': 'PermisosEdiciones',
                'db_table': 'PermisosEdicion',
            },
        ),
        migrations.CreateModel(
            name='Llamadas',
            fields=[
                ('idLlamada', models.AutoField(primary_key=True, serialize=False, verbose_name='idLlamada')),
                ('segundos', models.CharField(blank=True, max_length=128, null=True, verbose_name='segundos')),
                ('fecha', models.DateField(blank=True, default=datetime.datetime.now, null=True, verbose_name='Fecha')),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='idEmpleado')),
            ],
            options={
                'verbose_name': 'Llamada',
                'verbose_name_plural': 'Llamadas',
                'db_table': 'Llamadas',
            },
        ),
        migrations.CreateModel(
            name='EmpresaDN',
            fields=[
                ('idEmpresaDN', models.AutoField(primary_key=True, serialize=False, verbose_name='idEmpresaDN')),
                ('dn', models.CharField(blank=True, max_length=10, null=True, verbose_name='DN')),
                ('activo', models.BooleanField(default=True, verbose_name='Activo')),
                ('empresa', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='principales.clientes', verbose_name='idEmpresa')),
            ],
            options={
                'verbose_name': 'EmpresaDN',
                'verbose_name_plural': 'EmpresasDNs',
                'db_table': 'EmpresaDN',
            },
        ),
        migrations.CreateModel(
            name='EmpresaAsignada',
            fields=[
                ('idAsignacion', models.AutoField(primary_key=True, serialize=False, verbose_name='idAsignacion')),
                ('comentario', models.CharField(default='PROPIA', max_length=128, verbose_name='Comentario')),
                ('fechaAsignada', models.DateField(blank=True, default=datetime.datetime.now, null=True, verbose_name='Fecha Asignación')),
                ('estatus', models.CharField(default='SIN ESTATUS', max_length=15, verbose_name='Estatus')),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='idEmpleado')),
                ('empresa', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='principales.clientes', verbose_name='idEmpresa')),
            ],
            options={
                'verbose_name': 'EmpresaAsignada',
                'verbose_name_plural': 'EmpresasAsignadas',
                'db_table': 'EmpresaAsignada',
            },
        ),
        migrations.CreateModel(
            name='Cita',
            fields=[
                ('idCita', models.AutoField(primary_key=True, serialize=False, verbose_name='idCita')),
                ('razonSocial', models.CharField(blank=True, max_length=128, null=True, verbose_name='Razon Social')),
                ('responsable', models.CharField(blank=True, max_length=128, null=True, verbose_name='Responsable')),
                ('fechaAgenda', models.DateTimeField(default=datetime.datetime.now, null=True, verbose_name='Fecha agenda')),
                ('fechaCita', models.DateTimeField(null=True, verbose_name='Fecha Cita')),
                ('color', models.CharField(blank=True, max_length=20, null=True, verbose_name='Color')),
                ('estatus', models.CharField(blank=True, max_length=20, null=True, verbose_name='Estatus')),
                ('url', models.CharField(blank=True, max_length=50, null=True, verbose_name='Url')),
                ('empleado_c', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Empleado Cita')),
            ],
            options={
                'verbose_name': 'Cita',
                'verbose_name_plural': 'Citas',
                'db_table': 'Cita',
            },
        ),
        migrations.CreateModel(
            name='Agendarllamada',
            fields=[
                ('idAgenda', models.AutoField(primary_key=True, serialize=False, verbose_name='idAgenda')),
                ('fechaAgenda', models.DateTimeField(default=datetime.datetime.now, null=True, verbose_name='Fecha agenda')),
                ('fechaLlamada', models.DateTimeField(null=True, verbose_name='Fecha Llamada')),
                ('color', models.CharField(blank=True, max_length=20, null=True, verbose_name='Color')),
                ('estatus', models.CharField(blank=True, max_length=20, null=True, verbose_name='Estatus')),
                ('comentario', models.CharField(blank=True, max_length=100, null=True, verbose_name='Comentario')),
                ('url', models.CharField(blank=True, max_length=128, null=True, verbose_name='Url')),
                ('categoria', models.CharField(blank=True, max_length=20, null=True, verbose_name='Comentario')),
                ('cliente_al', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='principales.clientes', verbose_name='Cliente Agenda')),
                ('user_al', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Empleado Agenda')),
            ],
            options={
                'verbose_name': 'Agendarllamada',
                'verbose_name_plural': 'Agendarllamada',
                'db_table': 'Agendarllamada',
            },
        ),
    ]