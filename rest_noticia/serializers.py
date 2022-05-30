from rest_framework import serializers
from dailyDuoc.models import Noticia

class NoticiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noticia
        fields = ['titulo','texto','fecha','imagen']