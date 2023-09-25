from datetime import datetime, timezone
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404
from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, TemplateView, FormView, DeleteView
from django.contrib import messages
from core.principales.models import Proovedor
from django.utils import timezone


# Nombre de la clase y su herencia
class Ventaview(LoginRequiredMixin, TemplateView):
    template_name = 'Ventaview.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        self.id = request.user.id
        self.usuario = request.user
        return super().dispatch(request, *args, **kwargs)