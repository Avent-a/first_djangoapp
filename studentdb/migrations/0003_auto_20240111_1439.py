# Generated by Django 3.2.12 on 2024-01-11 14:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studentdb', '0002_productsmovement_hidden'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='hidden',
        ),
        migrations.RemoveField(
            model_name='components',
            name='hidden',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='hidden',
        ),
        migrations.RemoveField(
            model_name='order',
            name='hidden',
        ),
        migrations.RemoveField(
            model_name='product',
            name='hidden',
        ),
        migrations.RemoveField(
            model_name='productsmovement',
            name='hidden',
        ),
    ]