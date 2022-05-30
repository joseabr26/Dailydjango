from django.shortcuts import render, redirect
from .models import Noticia
from .forms import *
from django.http import HttpResponse


# Create your views here.
def index(request):
    noticias = Noticia.objects.all()
    datos = {
        'noticias':noticias
    }
    contexto={"nombre":"Axel Elgueta"}
    return render(request, 'dailyDuoc/index.html',datos)

def form_noticia(request):
    datos = {
        'form' : NoticiaForm()
    }

    if (request.method == 'POST'):
        formulario = NoticiaForm(request.POST, request.FILES)
        if formulario.is_valid():
            formulario.save() #insert
            datos['mensaje'] = "Se guardó Noticia"
        else:
            datos['mensaje'] = "Revise datos"
    return render(request,'dailyDuoc/form_noticia.html', datos)

    
def modificar_noticia(request, id):
    noticia = Noticia.objects.get(idNoticia = id)
        
    datos = {
        'form': NoticiaForm(instance = noticia)
    }
        
    if(request.method == 'POST'):
        formulario = NoticiaForm(data = request.POST, instance = noticia)
        if formulario.is_valid():
            formulario.save() #insert
            datos['mensaje'] = "Se modifico Noticia"
        else:
            datos['mensaje'] = "Revise datos"
    return render(request,'dailyDuoc/modificar_noticia.html', datos)

def eliminar_Noticia(request, id):
    noticia = Noticia.objects.get(idNoticia = id)
    noticia.delete()
    
    return redirect(to='index')

