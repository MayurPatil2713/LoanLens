import math


class AmortizationSchedule:

    @staticmethod
    def generate(principal, annual_rate, tenure_years):

        monthly_rate = annual_rate / (12 * 100)
        months = tenure_years * 12

        emi = (
            principal
            * monthly_rate
            * math.pow(1 + monthly_rate, months)
        ) / (
            math.pow(1 + monthly_rate, months) - 1
        )

        balance = principal
        schedule = []

        for month in range(1, months + 1):

            interest = balance * monthly_rate
            principal_paid = emi - interest
            balance -= principal_paid

            if balance < 0:
                balance = 0

            schedule.append({
                "month": month,
                "emi": round(emi, 2),
                "principal_paid": round(principal_paid, 2),
                "interest_paid": round(interest, 2),
                "remaining_balance": round(balance, 2)
            })

        return schedule