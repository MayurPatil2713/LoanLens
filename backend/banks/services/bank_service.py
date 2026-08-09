from banks.repositories.bank_repository import BankRepository

class BankService:

    @staticmethod
    def get_all_banks():
        return BankRepository.get_all_banks()

    @staticmethod
    def add_bank(bank_data):
        return BankRepository.add_bank(bank_data)

    @staticmethod
    def update_bank(bank_id, bank_data):
        return BankRepository.update_bank(bank_id, bank_data)

    @staticmethod
    def delete_bank(bank_id):
        return BankRepository.delete_bank(bank_id)

    @staticmethod
    def update_bank(bank_id, data):
        BankRepository.update(bank_id, data)

    @staticmethod
    def delete_bank(bank_id):
        BankRepository.delete(bank_id)

    @staticmethod
    def get_bank(bank_id):
        return BankRepository.get_by_id(bank_id)

    @staticmethod
    def search_bank(bank_code):
        return BankRepository.get_by_code(bank_code)

    @staticmethod
    def filter_banks(loan_type):
        return BankRepository.filter_by_loan_type(loan_type)