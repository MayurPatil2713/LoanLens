from django.urls import path

from .views import EMICalculatorView
from .comparison_views import BankComparisonView
from .amortization_views import AmortizationView

urlpatterns = [
    path("", EMICalculatorView.as_view(), name="emi-calculator"),
    path("compare/", BankComparisonView.as_view(), name="bank-comparison"),
    path("amortization/", AmortizationView.as_view(), name="amortization"),
]