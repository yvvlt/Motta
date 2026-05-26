# database.py: Supabase DB 연결 및 간단한 데이터 처리 예시

from supabase import create_client, Client
import config

class Database:
    def __init__(self):
        self.client: Client = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)

    def get_all_recipes(self):
        response = self.client.table("recipes").select("*").execute()
        if response.error:
            print("DB 조회 오류:", response.error)
            return []
        return response.data

    def add_recipe(self, recipe_data):
        response = self.client.table("recipes").insert(recipe_data).execute()
        if response.error:
            print("레시피 추가 오류:", response.error)
            return False
        return True