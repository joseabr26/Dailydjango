from unicodedata import name
from django.urls import path
from rest_noticia.views import lista_noticias, detalle_noticia

urlpatterns = [
    path('lista_noticias',lista_noticias,name="lista_noticias"),
    path('detalle_noticia/<id>',detalle_noticia,name='detalle_noticia'),
]
