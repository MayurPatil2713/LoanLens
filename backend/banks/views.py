from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import BankSerializer
from .services.bank_service import BankService


class BankListCreateView(APIView):

    def get(self, request):
        banks = BankService.get_all_banks()

        for bank in banks:
            bank["_id"] = str(bank["_id"])

        return Response(banks)

    def post(self, request):
        serializer = BankSerializer(data=request.data)

        if serializer.is_valid():
            bank_id = BankService.add_bank(serializer.validated_data)

            return Response(
                {
                    "message": "Bank added successfully",
                    "id": bank_id
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)