from common.validators import LoanValidator

try:
    LoanValidator.validate_amount(5000000)
    LoanValidator.validate_interest(8.35)
    LoanValidator.validate_tenure(20)
    LoanValidator.validate_bank_code("SBI")

    print("All validations passed.")

except ValueError as e:
    print(e)