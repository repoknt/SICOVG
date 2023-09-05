from django.urls import path

from core.Proovedores.ProovedorViews.views import ProovedorView, ProovedorCreateView, ProovedorUpdateView, ProovedorDeleteView

app_name = 'Proovedores'

urlpatterns = [
    path('List/', ProovedorView.as_view(), name='Proovedor'),
    path('Create/', ProovedorCreateView.as_view(), name='CreatePr'),
    path('Update/<int:pk>/', ProovedorUpdateView.as_view(), name='UpdatePr'),
    path('Delete/<int:pk>/', ProovedorDeleteView.as_view(), name='DeletePr'),

]
