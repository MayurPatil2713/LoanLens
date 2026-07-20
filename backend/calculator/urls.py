from django.urls import path
from .views import EMICalculatorView

urlpatterns = [
    path("", EMICalculatorView.as_view(), name="emi-calculator"),
]