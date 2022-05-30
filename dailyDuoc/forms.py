from dataclasses import fields
from django import forms
from django.forms import ModelForm
from .models import Noticia


class NoticiaForm(ModelForm):
    class Meta:
        model = Noticia
        fields = ['titulo','texto','fecha','imagen']
 
