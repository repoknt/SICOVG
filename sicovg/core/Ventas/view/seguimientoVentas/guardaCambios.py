from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from core.principales.models import Venta

@csrf_exempt
def guardar_cambios(request):
    if request.method == 'POST':
        id_venta = request.POST.get('idVenta')
        nuevo_estatus = request.POST.get('nuevoEstatus')
        comentario = request.POST.get('comentario')

        # Obtén la instancia de la venta y actualiza los campos
        venta = Venta.objects.get(idVenta=id_venta)
        venta.estatus = nuevo_estatus
        venta.comentario = comentario
        venta.save()

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Método no permitido'})
