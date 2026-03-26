from django.contrib import admin
from .models import Evento, Foto

class FotoInline(admin.TabularInline):
  model = Foto
  extra = 3
  fields = ['imagem', 'legenda', 'ordem']

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
  inlines = [FotoInline]
  list_display = ['titulo', 'data', 'total_fotos', 'criado_em']
  list_filter = ['data']
  search_fields = ['titulo', 'descricao']
  date_hierarchy = 'data'

  def total_fotos(self, obj):
    return obj.fotos.count()