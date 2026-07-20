from common.emi import EMICalculator

result = EMICalculator.calculate(
    principal=5000000,
    annual_rate=8.35,
    tenure_years=20
)

print(result)