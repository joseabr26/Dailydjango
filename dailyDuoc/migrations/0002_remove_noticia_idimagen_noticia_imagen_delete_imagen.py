# Generated by Django 4.0.1 on 2022-05-20 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dailyDuoc', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='noticia',
            name='idImagen',
        ),
        migrations.AddField(
            model_name='noticia',
            name='imagen',
            field=models.ImageField(blank=True, upload_to='dailyDuoc/static/dailyDuoc/imagenes'),
        ),
        migrations.DeleteModel(
            name='Imagen',
        ),
    ]
