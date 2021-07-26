# Generated by Django 3.2.5 on 2021-07-26 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default='', max_length=6, unique=True)),
                ('host', models.CharField(max_length=50, unique=True)),
                ('guest_can_pause', models.BooleanField(default=False)),
                ('guest_can_skip', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField()),
            ],
        ),
    ]
