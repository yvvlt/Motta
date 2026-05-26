from supabase import create_client
import config

class Database:
    def __init__(self):
        self.client = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)

    def get_recipes(self):
        result = self.client.table("recipes").select("*").execute()
        if result.error:
            print("DB 조회 오류:", result.error)
            return []
        return result.data

    def add_recipe(self, recipe):
        result = self.client.table("recipes").insert(recipe).execute()
        if result.error:
            print("레시피 추가 오류:", result.error)
            return False
        return True