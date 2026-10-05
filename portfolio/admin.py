from django.contrib import admin
from .models import Evento, Foto, Categoria

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
  list_display = ['nome', 'slug']
  prepopulated_fields = {'slug': ('nome',)}
  search_fields = ['nome']

class FotoInline(admin.TabularInline):
  model = Foto
  extra = 3
  fields = ['imagem', 'legenda', 'ordem']

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
  inlines = [FotoInline]
  list_display = ['titulo', 'categoria', 'data', 'total_fotos', 'criado_em']
  list_filter = ['categoria', 'data']
  search_fields = ['titulo', 'descricao']
  date_hierarchy = 'data'

  def total_fotos(self, obj):
    return obj.fotos.count()