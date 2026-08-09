from django.urls import path

from .views import BankListCreateView
from .detail_views import BankDetailView
from .search_views import BankSearchView, BankFilterView

urlpatterns = [
    path("", BankListCreateView.as_view(), name="bank-list-create"),

    # Search and Filter FIRST
    path("search/", BankSearchView.as_view(), name="bank-search"),
    path("filter/", BankFilterView.as_view(), name="bank-filter"),

    # Dynamic route LAST
    path("<str:bank_id>/", BankDetailView.as_view(), name="bank-detail"),
]