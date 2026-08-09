from common.amortization import AmortizationSchedule

schedule = AmortizationSchedule.generate(
    principal=5000000,
    annual_rate=8.35,
    tenure_years=20
)

print(schedule[:5])   # First 5 months