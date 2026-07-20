from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from common.emi import EMICalculator
from common.validators import LoanValidator
from .serializers import EMICalculatorSerializer


class EMICalculatorView(APIView):

    def post(self, request):

        serializer = EMICalculatorSerializer(data=request.data)

        if serializer.is_valid():

            data = serializer.validated_data

            try:
                LoanValidator.validate_amount(data["principal"])
                LoanValidator.validate_interest(data["interest_rate"])
                LoanValidator.validate_tenure(data["tenure"])

                result = EMICalculator.calculate(
                    principal=data["principal"],
                    annual_rate=data["interest_rate"],
                    tenure_years=data["tenure"]
                )

                return Response(result, status=status.HTTP_200_OK)

            except ValueError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)