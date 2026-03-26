from rest_framework import serializers
from .models import Evento, Foto

class FotoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Foto
    fields = ['id', 'imagem', 'legenda', 'ordem']

class EventoListSerializer(serializers.ModelSerializer):
  total_fotos = serializers.IntegerField(source='fotos.count', read_only=True)

  class Meta:
    model = Evento
    fields = ['id', 'titulo', 'descricao', 'data', 'capa', 'total_fotos']

class EventoDetailSerializer(serializers.ModelSerializer):
  fotos = FotoSerializer(many=True, read_only=True)

  class Meta:
    model = Evento
    fields = ['id', 'titulo', 'descricao', 'data', 'capa', 'fotos']