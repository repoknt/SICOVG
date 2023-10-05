# views.py

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from core.principales.models import Venta

@require_POST
def guardarComentario(request):
    id_venta = request.POST.get('idVenta')
    nuevo_estatus = request.POST.get('nuevoEstatus')
    comentario = request.POST.get('comentario')

    try:
        # Obtener el objeto de venta
        venta = Venta.objects.get(idVenta=id_venta)

        # Actualizar el comentario y el estado
        venta.comentario = comentario
        venta.estatus = nuevo_estatus
        venta.save()

        return JsonResponse({'mensaje': 'Datos actualizados correctamente'})
    except Venta.DoesNotExist:
        return JsonResponse({'mensaje': 'Venta no encontrada'}, status=404)
