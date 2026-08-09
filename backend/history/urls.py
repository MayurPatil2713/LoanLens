from django.urls import path
from .views import LoanHistoryView

urlpatterns = [
    path("", LoanHistoryView.as_view(), name="loan-history"),
    path("<str:history_id>/", LoanHistoryView.as_view(), name="delete-history"),
]