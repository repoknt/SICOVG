from django.urls import path

from core.Proovedores.ProovedorViews.views import ProovedorView, ProovedorCreateView

app_name = 'Proovedores'

urlpatterns = [
    path('List/', ProovedorView.as_view(), name='Proovedor'),
    path('Create/', ProovedorCreateView.as_view(), name='CrearPr'),
]
