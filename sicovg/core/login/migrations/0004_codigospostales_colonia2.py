# Generated by Django 3.2.2 on 2023-08-31 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0003_rename_estado_codigospostales_estados'),
    ]

    operations = [
        migrations.AddField(
            model_name='codigospostales',
            name='Colonia2',
            field=models.CharField(blank=True, max_length=128, null=True, verbose_name='Colonia'),
        ),
    ]
