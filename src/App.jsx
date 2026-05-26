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
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  useEffect(() => {
    const blobs = document.querySelectorAll(".blob");

    const moveBlob = (e) => {
      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.02;

        blob.style.transform = `
          translate(${e.clientX * speed}px, ${e.clientY * speed}px)
        `;
      });
    };

    window.addEventListener("mousemove", moveBlob);

    return () => window.removeEventListener("mousemove", moveBlob);
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <Header
        setSearch={setSearch}
        setFilter={setFilter}
        toggleDark={() => setDarkMode(!darkMode)}
      />

      <Banner />

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

      <AnimatePresence>
        {selectedRecipe && (
          <Modal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
