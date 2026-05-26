# users.py: 사용자 정보 및 커뮤니티 기능 간단 예시

class UserManager:
    def __init__(self, db):
        self.db = db

    def get_user(self, user_id):
        response = self.db.client.table("users").select("*").eq("id", user_id).execute()
        if response.error:
            print("사용자 조회 오류:", response.error)
            return None
        if response.data:
            return response.data[0]
        return None

    def register_user(self, user_info):
        response = self.db.client.table("users").insert(user_info).execute()
        if response.error:
            print("사용자 등록 오류:", response.error)
            return False
        return True