# Generated by Django 3.2.2 on 2023-09-11 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('principales', '0007_inventario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventario',
            name='CantidadEnStock',
            field=models.IntegerField(verbose_name=' Cantidad En Stock'),
        ),
        migrations.AlterField(
            model_name='inventario',
            name='NiverDeReordenamiento',
            field=models.IntegerField(verbose_name=' Numero De Ordenamiento '),
        ),
    ]