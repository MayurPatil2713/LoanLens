import re

class LoanValidator:

    @staticmethod
    def validate_amount(amount):
        if amount <= 0:
            raise ValueError("Loan amount must be greater than zero.")

        if amount < 100000:
            raise ValueError("Minimum loan amount is ₹1,00,000.")

        return True

    @staticmethod
    def validate_interest(rate):
        if rate <= 0:
            raise ValueError("Interest rate must be greater than zero.")

        if rate > 20:
            raise ValueError("Interest rate cannot exceed 20%.")

        return True

    @staticmethod
    def validate_tenure(tenure):
        if tenure <= 0:
            raise ValueError("Loan tenure must be greater than zero.")

        if tenure > 30:
            raise ValueError("Maximum loan tenure is 30 years.")

        return True

    @staticmethod
    def validate_bank_code(bank_code):
        pattern = r"^[A-Z]{2,10}$"

        if not re.match(pattern, bank_code):
            raise ValueError("Invalid bank code.")

        return True