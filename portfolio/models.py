from django.db import models

# Create your models here.

class Evento(models.Model):
  titulo = models.CharField(max_length=200)
  descricao = models.TextField(blank=True)
  data = models.DateField()
  capa = models.ImageField(upload_to='eventos/capas/', blank=True, null=True)
  criado_em = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['-data']
    verbose_name = 'Evento'
    verbose_name_plural = 'Eventos'

    def __str__(self):
      return self.titulo
    
class Foto(models.Model):
  evento = models.ForeignKey(
    Evento,
    on_delete=models.CASCADE,
    related_name='fotos'
  )

  imagem = models.ImageField(upload_to='eventos/fotos/')
  legenda = models.CharField(max_length=300, blank=True)
  ordem = models.PositiveIntegerField(default=0)
  criado_em = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['ordem', 'criado_em']
    verbose_name = 'Foto'
    verbose_name_plural = 'Fotos'

    def __str__(self):
      return f"{self.evento.titulo} - foto {self.ordem or self.pk}"

