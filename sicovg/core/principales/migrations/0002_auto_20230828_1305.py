# Generated by Django 3.2.2 on 2023-08-28 13:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('principales', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Clientes',
        ),
        migrations.DeleteModel(
            name='Proovedor',
        ),
    ]
