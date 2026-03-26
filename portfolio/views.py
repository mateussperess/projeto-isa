from rest_framework import generics
from .models import Evento
from .serializers import EventoListSerializer, EventoDetailSerializer

class EventoListView(generics.ListAPIView):
  queryset = Evento.objects.prefetch_related('fotos').all()
  serializer_class = EventoListSerializer

class EventoDetailView(generics.RetrieveAPIView):
  queryset = Evento.objects.prefetch_related('fotos').all()
  serializer_class = EventoDetailSerializer