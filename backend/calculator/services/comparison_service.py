from banks.services.bank_service import BankService
from common.threading_service import EMIThread


class ComparisonService:

    @staticmethod
    def compare_banks(principal, tenure):

        banks = BankService.get_all_banks()

        threads = []
        results = []

        for bank in banks:
            thread = EMIThread(bank, principal, tenure, results)
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

        results.sort(key=lambda x: x["monthly_emi"])

        return results