from django.db import models
from django.utils.timezone import now

# Create your models here.
class Noticia(models.Model):
    idNoticia = models.IntegerField(primary_key=True, verbose_name='Id')
    titulo = models.CharField(max_length=50, verbose_name='Titulo')
    texto = models.TextField(max_length=500, verbose_name='Texto')
    fecha = models.DateField(null=True, blank=True)
    imagen = models.ImageField(upload_to='dailyDuoc/static/dailyDuoc/imagenes', null=True, blank=True)
    

    def __str__(self):
        return self.titulo
