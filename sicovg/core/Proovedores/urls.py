from django.urls import path

from core.Proovedores.views import ProovedorView, ProovedorCreateView, ProovedorUpdateView, ProovedorDeleteView

app_name = 'Proovedores'

urlpatterns = [
    path('List/', ProovedorView.as_view(), name='List'),
    path('Create/', ProovedorCreateView.as_view(), name='Create'),
    path('Update/<int:pk>/', ProovedorUpdateView.as_view(), name='Update'),
    path('Delete/<int:pk>/', ProovedorDeleteView.as_view(), name='Delete'),
]
