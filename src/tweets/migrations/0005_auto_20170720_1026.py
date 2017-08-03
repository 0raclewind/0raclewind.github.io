# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-07-20 10:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0004_auto_20170720_1024'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tweet',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
