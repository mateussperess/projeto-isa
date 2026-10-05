from rest_framework import serializers
from .models import Evento, Foto, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Categoria
    fields = ['id', 'nome', 'slug']

class FotoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Foto
    fields = ['id', 'imagem', 'legenda', 'ordem']

class EventoListSerializer(serializers.ModelSerializer):
  total_fotos = serializers.IntegerField(source='fotos.count', read_only=True)
  categoria = CategoriaSerializer(read_only=True)

  class Meta:
    model = Evento
    fields = ['id', 'titulo', 'descricao', 'data', 'capa', 'categoria', 'total_fotos']

class EventoDetailSerializer(serializers.ModelSerializer):
  fotos = FotoSerializer(many=True, read_only=True)
  categoria = CategoriaSerializer(read_only=True)

  class Meta:
    model = Evento
    fields = ['id', 'titulo', 'descricao', 'data', 'capa', 'categoria', 'fotos']