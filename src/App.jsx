import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.css";

import Header from "./components/Header";
import Banner from "./components/Banner";
import RecipeCard from "./components/RecipeCard";
import Modal from "./components/Modal";

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "딸기 케이크",
      category: "cake",
      likes: 120,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    },

    {
      id: 2,
      title: "카페라떼",
      category: "coffee",
      likes: 95,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },

    {
      id: 3,
      title: "마카롱",
      category: "dessert",
      likes: 210,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
    },

    {
      id: 4,
      title: "티라미수",
      category: "cake",
      likes: 188,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    },

    {
      id: 5,
      title: "바닐라 라떼",
      category: "coffee",
      likes: 77,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },

    {
      id: 6,
      title: "레몬 타르트",
      category: "dessert",
      likes: 165,
      image: "https://images.unsplash.com/photo-1519869325930-281384150729",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [showUpload, setShowUpload] = useState(false);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    category: "cake",
    image: "",
  });

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.title.includes(search) &&
      (filter === "all" || recipe.category === filter)
    );
  });

  const toggleLike = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, likes: recipe.likes + 1 } : recipe,
      ),
    );
  };

  const addRecipe = () => {
    if (!newRecipe.title || !newRecipe.image) {
      alert("모든 항목 입력!");
      return;
    }

    const recipe = {
      id: Date.now(),
      title: newRecipe.title,
      category: newRecipe.category,
      image: newRecipe.image,
      likes: 0,
    };

    setRecipes([recipe, ...recipes]);

    setNewRecipe({
      title: "",
      category: "cake",
      image: "",
    });

    setShowUpload(false);
  };

  useEffect(() => {
    const blobs = document.querySelectorAll(".blob");

    const moveBlob = (e) => {
      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.02;

        blob.style.transform = `
          translate(
            ${e.clientX * speed}px,
            ${e.clientY * speed}px
          )
        `;
      });
    };

    window.addEventListener("mousemove", moveBlob);

    return () => window.removeEventListener("mousemove", moveBlob);
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Blob Background */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* Header */}
      <Header
        setSearch={setSearch}
        setFilter={setFilter}
        toggleDark={() => setDarkMode(!darkMode)}
      />

      {/* Hero Banner */}
      <Banner />

      <div className="upload-wrapper">
        <button className="upload-open-btn" onClick={() => setShowUpload(true)}>
          + 레시피 추가
        </button>
      </div>

      {/* Section Title */}
      <div className="section-title">
        <h2>✨ 인기 레시피</h2>
        <p>오늘 가장 사랑받는 홈카페 메뉴</p>
      </div>

      {/* Recipe Cards */}
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onLike={toggleLike}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <Modal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>

      {showUpload && (
        <div className="modal" onClick={() => setShowUpload(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>새 레시피 업로드 ✨</h2>

            <input
              type="text"
              placeholder="레시피 이름"
              value={newRecipe.title}
              onChange={(e) =>
                setNewRecipe({
                  ...newRecipe,
                  title: e.target.value,
                })
              }
            />

            <select
              value={newRecipe.category}
              onChange={(e) =>
                setNewRecipe({
                  ...newRecipe,
                  category: e.target.value,
                })
              }
            >
              <option value="cake">케이크</option>
              <option value="coffee">커피</option>
              <option value="dessert">디저트</option>
            </select>

            <input
              type="text"
              placeholder="이미지 URL"
              value={newRecipe.image}
              onChange={(e) =>
                setNewRecipe({
                  ...newRecipe,
                  image: e.target.value,
                })
              }
            />

            <button className="comment-btn" onClick={addRecipe}>
              업로드
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
