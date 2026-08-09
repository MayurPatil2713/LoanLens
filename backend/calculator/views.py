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

                from history.services.history_service import HistoryService
                
                history_data = {
                    "principal": data["principal"],
                    "interest_rate": data["interest_rate"],
                    "tenure": data["tenure"],
                    "monthly_emi": result["monthly_emi"],
                    "total_interest": result["total_interest"],
                    "total_payment": result["total_payment"]
                }

                HistoryService.save(history_data)

                return Response(result, status=status.HTTP_200_OK)

            except ValueError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)