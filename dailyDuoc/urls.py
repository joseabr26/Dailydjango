import statistics
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import index, form_noticia, modificar_noticia, eliminar_Noticia

urlpatterns = [
    path('', index, name="index"),
    path('form_noticia',form_noticia,name='form_noticia'),
    path('modificar_noticia/<id>',modificar_noticia,name='modificar_noticia'),
    path('eliminar_Noticia/<id>',eliminar_Noticia,name='eliminar_Noticia'),  
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)