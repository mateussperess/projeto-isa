from django.urls import path
from .views import EventoListView, EventoDetailView

urlpatterns = [
  path('eventos/', EventoListView.as_view(), name='evento-list'),
  path('eventos/<int:pk>/', EventoDetailView.as_view(), name='evento-detail'),
]