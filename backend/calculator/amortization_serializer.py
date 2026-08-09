from rest_framework import serializers

class AmortizationSerializer(serializers.Serializer):
    principal = serializers.FloatField()
    interest_rate = serializers.FloatField()
    tenure = serializers.IntegerField()