from database import Database

def main():
    print("모따 프로젝트 백엔드 테스트")

    db = Database()
    recipes = db.get_recipes()
    print(f"레시피 수: {len(recipes)}")
    for r in recipes:
        print(f"- {r['title']} ({r['category']})")

if __name__ == "__main__":
    main()