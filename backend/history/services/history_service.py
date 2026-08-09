from history.repositories.history_repository import HistoryRepository


class HistoryService:

    @staticmethod
    def save(data):
        return HistoryRepository.save_history(data)

    @staticmethod
    def get_all():
        return HistoryRepository.get_all()

    @staticmethod
    def delete(history_id):
        return HistoryRepository.delete(history_id)