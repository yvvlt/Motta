# main.py: 모따 프로젝트 메인 실행 파일

from database import Database
from recipes import RecipeManager
from users import UserManager

def main():
    print("모따 프로젝트에 오신 것을 환영합니다!")

    db = Database()
    recipe_manager = RecipeManager(db)
    user_manager = UserManager(db)

    # 예시: 전체 레시피 목록 출력
    recipes = recipe_manager.list_recipes()
    if recipes:
        print("\n레시피 목록:")
        for i, r in enumerate(recipes, 1):
            print(f"{i}. {r['title']} ({r['category']})")
    else:
        print("등록된 레시피가 없습니다.")

if __name__ == "__main__":
    main()