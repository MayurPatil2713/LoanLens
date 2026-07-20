from database.mongodb import db
from bson import ObjectId

class BankRepository:

    @staticmethod
    def get_collection():
        return db["banks"]

    @staticmethod
    def get_all_banks():
        return list(BankRepository.get_collection().find())

    @staticmethod
    def get_bank_by_id(bank_id):
        return BankRepository.get_collection().find_one(
            {"_id": ObjectId(bank_id)}
        )

    @staticmethod
    def add_bank(bank_data):
        result = BankRepository.get_collection().insert_one(bank_data)
        return str(result.inserted_id)

    @staticmethod
    def update_bank(bank_id, bank_data):
        return BankRepository.get_collection().update_one(
            {"_id": ObjectId(bank_id)},
            {"$set": bank_data}
        )

    @staticmethod
    def delete_bank(bank_id):
        return BankRepository.get_collection().delete_one(
            {"_id": ObjectId(bank_id)}
        )