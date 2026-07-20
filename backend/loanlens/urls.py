from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/banks/", include("banks.urls")),

    path("api/calculate/", include("calculator.urls")),
]