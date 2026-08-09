from rest_framework.views import APIView
from rest_framework.response import Response

from .services.bank_service import BankService


class BankSearchView(APIView):

    def get(self, request):

        code = request.GET.get("code")

        bank = BankService.search_bank(code)

        if bank:
            bank["_id"] = str(bank["_id"])
            return Response(bank)

        return Response({"message": "Bank not found"}, status=404)


class BankFilterView(APIView):

    def get(self, request):

        loan_type = request.GET.get("loan_type")

        banks = BankService.filter_banks(loan_type)

        for bank in banks:
            bank["_id"] = str(bank["_id"])

        return Response(banks)