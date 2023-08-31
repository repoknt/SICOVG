from django.urls import path
from core.principales.principalesviews.views import DashboardView


app_name = 'principales'

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
