from django.urls import path

from .views import EMICalculatorView
from .comparison_views import BankComparisonView

urlpatterns = [
    path("", EMICalculatorView.as_view(), name="emi-calculator"),
    path("compare/", BankComparisonView.as_view(), name="bank-comparison"),
]