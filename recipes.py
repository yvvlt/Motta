# recipes.py: 레시피 관리 관련 기능

class RecipeManager:
    def __init__(self, db):
        self.db = db

    def list_recipes(self):
        return self.db.get_all_recipes()

    def register_recipe(self, title, category, ingredients, instructions, author):
        recipe = {
            "title": title,
            "category": category,
            "ingredients": ingredients,
            "instructions": instructions,
            "author": author
        }
        return self.db.add_recipe(recipe)