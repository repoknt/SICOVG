# Generated by Django 3.2.2 on 2023-08-28 12:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='curp',
        ),
        migrations.RemoveField(
            model_name='user',
            name='edad',
        ),
        migrations.RemoveField(
            model_name='user',
            name='genero',
        ),
        migrations.RemoveField(
            model_name='user',
            name='nombreReferencia',
        ),
        migrations.RemoveField(
            model_name='user',
            name='telefonoEmergencia',
        ),
        migrations.RemoveField(
            model_name='user',
            name='telefonoTrabajo',
        ),
    ]
