# Generated by Django 3.2.2 on 2023-08-31 17:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0008_auto_20230831_1723'),
    ]

    operations = [
        migrations.RenameField(
            model_name='codigospostales',
            old_name='Estados',
            new_name='Estado',
        ),
    ]
