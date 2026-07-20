from rest_framework import serializers

class EMICalculatorSerializer(serializers.Serializer):
    principal = serializers.FloatField()
    interest_rate = serializers.FloatField()
    tenure = serializers.IntegerField()