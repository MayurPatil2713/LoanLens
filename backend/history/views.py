from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import LoanHistorySerializer
from .services.history_service import HistoryService


class LoanHistoryView(APIView):

    def get(self, request):

        history = HistoryService.get_all()

        for item in history:
            item["_id"] = str(item["_id"])

        return Response(history)

    def post(self, request):

        serializer = LoanHistorySerializer(data=request.data)

        if serializer.is_valid():

            history_id = HistoryService.save(serializer.validated_data)

            return Response(
                {
                    "message": "History saved successfully",
                    "id": history_id
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, history_id):
    
        HistoryService.delete(history_id)
    
        return Response(
            {
                "message": "History deleted successfully"
            }
        )