from django.urls import path
from .views import EventoListView, EventoDetailView, CategoriaListView, FotoListView

urlpatterns = [
  path('categorias/', CategoriaListView.as_view(), name='categoria-list'),
  path('fotos/', FotoListView.as_view(), name='foto-list'),
  path('eventos/', EventoListView.as_view(), name='evento-list'),
  path('eventos/<int:pk>/', EventoDetailView.as_view(), name='evento-detail'),
]