import threading
from common.emi import EMICalculator


class EMIThread(threading.Thread):

    def __init__(self, bank, principal, tenure, results):
        super().__init__()
        self.bank = bank
        self.principal = principal
        self.tenure = tenure
        self.results = results

    def run(self):

        emi = EMICalculator.calculate(
            principal=self.principal,
            annual_rate=self.bank["interest_rate"],
            tenure_years=self.tenure
        )

        self.results.append({
            "bank_name": self.bank["bank_name"],
            "bank_code": self.bank["bank_code"],
            "interest_rate": self.bank["interest_rate"],
            "processing_fee": self.bank["processing_fee"],
            "monthly_emi": emi["monthly_emi"],
            "total_interest": emi["total_interest"],
            "total_payment": emi["total_payment"]
        })