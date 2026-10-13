from rest_framework import generics
from .models import Evento, Categoria, Foto
from .serializers import EventoListSerializer, EventoDetailSerializer, CategoriaSerializer, FotoSerializer

class CategoriaListView(generics.ListAPIView):
  queryset = Categoria.objects.all()
  serializer_class = CategoriaSerializer

class FotoListView(generics.ListAPIView):
  queryset = Foto.objects.select_related('evento__categoria').all()
  serializer_class = FotoSerializer

class EventoListView(generics.ListAPIView):
  queryset = Evento.objects.select_related('categoria').prefetch_related('fotos').all()
  serializer_class = EventoListSerializer

class EventoDetailView(generics.RetrieveAPIView):
  queryset = Evento.objects.select_related('categoria').prefetch_related('fotos').all()
  serializer_class = EventoDetailSerializer