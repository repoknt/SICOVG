from django.urls import path

from core.Inventario.views import InventarioView,  InventarioCreateView, InventarioUpdateView, InventarioDeleteView


app_name = 'Inventario'

urlpatterns = [
    path('List/', InventarioView.as_view(), name='List'),
    path('Create/', InventarioCreateView.as_view(), name='Create'),
    path('Update/<int:pk>/', InventarioUpdateView.as_view(), name='Update'),
    path('Delete/<int:pk>/', InventarioDeleteView.as_view(), name='Delete'),
]