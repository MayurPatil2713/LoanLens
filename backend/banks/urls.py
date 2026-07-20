from django.urls import path
from .views import BankListCreateView

urlpatterns = [
    path("", BankListCreateView.as_view(), name="bank-list-create"),
]