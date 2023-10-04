from django.http import JsonResponse
from core.principales.models import Venta
def buscar_datos(request):
    if request.method == 'POST':
        tipo_campo = request.POST.get('tipoCampo')
        valor = request.POST.get('valor')

        # Determina qué campo de modelo debes usar en la consulta
        campo_modelo = None
        if tipo_campo == 'Numero de cuenta':
            campo_modelo = 'cuenta'  # Ajusta esto según tu modelo
        elif tipo_campo == 'RFC':
            campo_modelo = 'clienteId__RFC'  # Ajusta esto según tu modelo
        elif tipo_campo == 'Razon social':
            campo_modelo = 'clienteId__razonSocial'  # Ajusta esto según tu modelo

        try:
            # Imprime información para depuración
            print(f"Campo modelo: {campo_modelo}")
            print(f"Valor: {valor}")

            # Realiza la búsqueda en tu modelo y devuelve los resultados
            resultados = Venta.objects.filter(**{campo_modelo: valor}).values(
                'idVenta',  # Ajusta esto según tu modelo
                'clienteId__razonSocial',
                'clienteId__RFC',
                'clienteId__telefono',
                'comentario',
                'estatus'
            )

            # Convierte los resultados en una lista para la respuesta JSON
            resultados_lista = list(resultados)

            print(f"Resultados: {resultados_lista}")

            return JsonResponse(resultados_lista, safe=False)

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Método no permitido'}, status=405)