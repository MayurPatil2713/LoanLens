from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from common.amortization import AmortizationSchedule
from .amortization_serializer import AmortizationSerializer


class AmortizationView(APIView):

    def post(self, request):

        serializer = AmortizationSerializer(data=request.data)

        if serializer.is_valid():

            data = serializer.validated_data

            schedule = AmortizationSchedule.generate(
                principal=data["principal"],
                annual_rate=data["interest_rate"],
                tenure_years=data["tenure"]
            )

            return Response(schedule, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)