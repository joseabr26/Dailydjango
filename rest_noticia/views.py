from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from dailyDuoc.models import Noticia
from rest_noticia.serializers import NoticiaSerializer

@csrf_exempt
@api_view(['GET','POST'])
def lista_noticias(request):
    if request.method == 'GET':
        listaNoticias = Noticia.objects.all()
        serializer = NoticiaSerializer(listaNoticias, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        dataP = JSONParser().parse(request)
        serializer = NoticiaSerializer(data=dataP)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET','PUT','DELETE'])
def detalle_noticia(request, id):
    try:
        noticia = Noticia.objects.get(idNoticia=id)
    except Noticia.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = NoticiaSerializer(noticia)
        return Response(serializer.data)
    elif request.method == "PUT":
        dataP = JSONParser().parse(request)
        serializer = NoticiaSerializer(noticia, data=dataP)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        noticia.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)