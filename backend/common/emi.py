import math

class EMICalculator:

    @staticmethod
    def calculate(principal, annual_rate, tenure_years):

        monthly_rate = annual_rate / (12 * 100)

        months = tenure_years * 12

        emi = (
            principal
            * monthly_rate
            * math.pow(1 + monthly_rate, months)
        ) / (
            math.pow(1 + monthly_rate, months) - 1
        )

        total_payment = emi * months

        total_interest = total_payment - principal

        return {
            "monthly_emi": round(emi, 2),
            "total_interest": round(total_interest, 2),
            "total_payment": round(total_payment, 2)
        }