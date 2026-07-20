from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import EMICalculatorSerializer
from .services.comparison_service import ComparisonService


class BankComparisonView(APIView):

    def post(self, request):

        serializer = EMICalculatorSerializer(data=request.data)

        if serializer.is_valid():

            data = serializer.validated_data

            comparison = ComparisonService.compare_banks(
                principal=data["principal"],
                tenure=data["tenure"]
            )

            return Response(comparison, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)