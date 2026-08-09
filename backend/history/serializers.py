from rest_framework import serializers


class LoanHistorySerializer(serializers.Serializer):
    principal = serializers.FloatField()
    interest_rate = serializers.FloatField()
    tenure = serializers.IntegerField()
    monthly_emi = serializers.FloatField()
    total_interest = serializers.FloatField()
    total_payment = serializers.FloatField()