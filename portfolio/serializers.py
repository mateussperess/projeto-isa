from rest_framework import serializers
from .models import Evento, Foto, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Categoria
    fields = ['id', 'nome', 'slug']

class FotoSerializer(serializers.ModelSerializer):
  imagem = serializers.SerializerMethodField()
  categoria = CategoriaSerializer(source='evento.categoria', read_only=True)
  evento_id = serializers.IntegerField(source='evento.id', read_only=True)
  evento_titulo = serializers.CharField(source='evento.titulo', read_only=True)
  evento_descricao = serializers.CharField(source='evento.descricao', read_only=True)

  class Meta:
    model = Foto
    fields = ['id', 'imagem', 'legenda', 'ordem', 'categoria', 'evento_id', 'evento_titulo', 'evento_descricao']

  def get_imagem(self, obj):
    if not obj.imagem:
      return None
    url_str = str(obj.imagem)
    if url_str.startswith('http://') or url_str.startswith('https://'):
      return url_str
    request = self.context.get('request')
    if request is not None:
      return request.build_absolute_uri(obj.imagem.url)
    return obj.imagem.url

class EventoListSerializer(serializers.ModelSerializer):
  total_fotos = serializers.IntegerField(source='fotos.count', read_only=True)
  categoria = CategoriaSerializer(read_only=True)
  capa = serializers.SerializerMethodField()

  class Meta:
    model = Evento
    fields = ['id', 'titulo', 'descricao', 'data', 'capa', 'categoria', 'total_fotos']

  def get_capa(self, obj):
    if not obj.capa:
      return None
    url_str = str(obj.capa)
    if url_str.startswith('http://') or url_str.startswith('https://'):
      return url_str
    request = self.context.get('request')
    if request is not None:
      return request.build_absolute_uri(obj.capa.url)
    return obj.capa.url

class EventoDetailSerializer(serializers.ModelSerializer):
  fotos = FotoSerializer(many=True, read_only=True)
  categoria = CategoriaSerializer(read_only=True)
  capa = serializers.SerializerMethodField()

  class Meta:
    model = Evento
    fields = ['id', 'titulo', 'descricao', 'data', 'capa', 'categoria', 'fotos']

  def get_capa(self, obj):
    if not obj.capa:
      return None
    url_str = str(obj.capa)
    if url_str.startswith('http://') or url_str.startswith('https://'):
      return url_str
    request = self.context.get('request')
    if request is not None:
      return request.build_absolute_uri(obj.capa.url)
    return obj.capa.url