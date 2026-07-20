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