from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import BankSerializer
from .services.bank_service import BankService


class BankDetailView(APIView):

    def put(self, request, bank_id):

        serializer = BankSerializer(data=request.data)

        if serializer.is_valid():

            BankService.update_bank(
                bank_id,
                serializer.validated_data
            )

            return Response(
                {"message": "Bank updated successfully"},
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, bank_id):

        BankService.delete_bank(bank_id)

        return Response(
            {"message": "Bank deleted successfully"},
            status=status.HTTP_200_OK
        )