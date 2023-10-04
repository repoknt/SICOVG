from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.views.generic import TemplateView
from core.principales.models import Venta, Clientes  # Asegúrate de importar tus modelos

class SeguimientoVentas(LoginRequiredMixin, TemplateView):
    template_name = 'seguimientoVentas/seguimientoVentas.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Lógica para determinar la consulta SQL basada en el botón presionado
        boton = self.request.GET.get('boton', None)
        if boton == 'pendiente':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='Pendiente').values(
            'idVenta',     
            'clienteId__razonSocial',
            'clienteId__RFC',
            'clienteId__telefono',
            'comentario',
            'estatus'
)
    
        elif boton == 'espera_pago':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='En espera de pago').values(
        'idVenta', 
        'clienteId__razonSocial',
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )
        elif boton == 'proceso':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='En proceso').values(
        'idVenta', 
        'clienteId__razonSocial',
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )
        
        
        elif boton == 'revision':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='En Revisión').values(
        'idVenta', 
        'clienteId__razonSocial',
       
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )
        elif boton == 'enviada':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='Enviada').values(
        'idVenta', 
        'clienteId__razonSocial',
       
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )        

        
        
        
        elif boton == 'entregada':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='Entregada').values(
        'idVenta', 
        'clienteId__razonSocial',
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )
        elif boton == 'completada':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='Completada').values(
        'idVenta', 
        'clienteId__razonSocial',
       
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )    
            
            
        elif boton == 'rembolsada':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='Rembolsada').values(
        'idVenta', 
        'clienteId__razonSocial',
       
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )   
        
            
        elif boton == 'devuelta':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='Devuelta').values(
        'idVenta', 
        'clienteId__razonSocial',
       
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )   
        elif boton == 'cancelada':
            ventas = Venta.objects.select_related('clienteId').filter(estatus='Cancelada').values(
        'idVenta', 
        'clienteId__razonSocial',
       
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
    )             
        # Agrega más consultas específicas para otros botones si es necesario
        # ventas = ...

        else:
            # Consulta predeterminada, ejecuta la consulta SQL que proporcionaste
            ventas = Venta.objects.select_related('clienteId').values(
        'idVenta', 
                'clienteId__razonSocial',
     
        'clienteId__RFC',
        'clienteId__telefono',
        'comentario',
        'estatus'
            )

        # Convierte los resultados en una lista de diccionarios
        results = list(ventas)
        context['data'] = results
        return context

    def render_to_response(self, context, **response_kwargs):
        if self.request.is_ajax():
            # Si es una solicitud AJAX, devuelve los datos como JSON
            data = context.get('data', [])
            return JsonResponse(data, safe=False)
        return super().render_to_response(context, **response_kwargs)



    

