# Generated by Django 3.2.2 on 2023-09-12 14:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('principales', '0011_rename_nombreproducto_inventario_nombresproducto'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inventario',
            old_name='CantidadEnStock',
            new_name='CantidadDeStock',
        ),
    ]