# Generated by Django 3.2.2 on 2023-08-31 16:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0002_auto_20230828_1254'),
    ]

    operations = [
        migrations.RenameField(
            model_name='codigospostales',
            old_name='Estado',
            new_name='Estados',
        ),
    ]
