from database.mongodb import db
from bson import ObjectId


class HistoryRepository:

    @staticmethod
    def get_collection():
        return db["loan_history"]

    @staticmethod
    def save_history(data):
        result = HistoryRepository.get_collection().insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def get_all():
        return list(HistoryRepository.get_collection().find())

    @staticmethod
    def delete(history_id):
        return HistoryRepository.get_collection().delete_one(
            {"_id": ObjectId(history_id)}
        )