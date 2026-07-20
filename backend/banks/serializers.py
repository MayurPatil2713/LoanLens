from rest_framework import serializers

class BankSerializer(serializers.Serializer):

    bank_name = serializers.CharField(max_length=100)
    bank_code = serializers.CharField(max_length=20)
    interest_rate = serializers.FloatField()
    processing_fee = serializers.FloatField()
    max_tenure = serializers.IntegerField()
    loan_types = serializers.ListField(
        child=serializers.CharField()
    )