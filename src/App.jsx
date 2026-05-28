import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.css";

import Header from "./components/Header";
import Banner from "./components/Banner";
import RecipeCard from "./components/RecipeCard";
import Modal from "./components/Modal";

/* 🔥 Supabase import */
import { supabase } from "./supabase";

function App() {
  /* 레시피 */
  const [recipes, setRecipes] = useState([]);

  /* 검색 */
  const [search, setSearch] = useState("");

  /* 필터 */
  const [filter, setFilter] = useState("all");

  /* 다크모드 */
  const [darkMode, setDarkMode] = useState(false);

  /* 상세 모달 */
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  /* 업로드 모달 */
  const [showUpload, setShowUpload] = useState(false);

  /* 새 레시피 */
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    category: "cake",
    image: "",
  });

  /* 🔥 DB에서 레시피 가져오기 */
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("id", {
          ascending: false,
        });

      if (error) {
        console.log(error);
      } else {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, []);

  /* 검색 + 필터 */
  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || recipe.category === filter)
    );
  });

  /* 좋아요 */
  const toggleLike = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              likes: recipe.likes + 1,
            }
          : recipe,
      ),
    );
  };

  /* 🔥 레시피 추가 */
  const addRecipe = async () => {
    if (!newRecipe.title || !newRecipe.image) {
      alert("모든 항목 입력!");
      return;
    }

    /* DB 저장 */
    const { error } = await supabase.from("recipes").insert([
      {
        title: newRecipe.title,
        category: newRecipe.category,
        image: newRecipe.image,
        likes: 0,
      },
    ]);

    if (error) {
      console.log(error);
      return;
    }

    /* 다시 불러오기 */
    const { data: updatedRecipes } = await supabase
      .from("recipes")
      .select("*")
      .order("id", {
        ascending: false,
      });

    setRecipes(updatedRecipes);

    /* 입력 초기화 */
    setNewRecipe({
      title: "",
      category: "cake",
      image: "",
    });

    setShowUpload(false);
  };

  /* Blob Effect */
  useEffect(() => {
    const blobs = document.querySelectorAll(".blob");

    const moveBlob = (e) => {
      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.02;

        const x = e.clientX * speed;

        const y = e.clientY * speed;

        blob.style.transform = "translate(" + x + "px, " + y + "px)";
      });
    };

    window.addEventListener("mousemove", moveBlob);

    return () => window.removeEventListener("mousemove", moveBlob);
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Blob */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* Header */}
      <Header
        setSearch={setSearch}
        setFilter={setFilter}
        toggleDark={() => setDarkMode(!darkMode)}
      />

      {/* Banner */}
      <Banner />

      {/* 업로드 버튼 */}
      <div className="upload-wrapper">
        <button className="upload-open-btn" onClick={() => setShowUpload(true)}>
          + 레시피 추가
        </button>
      </div>

      {/* 섹션 */}
      <div className="section-title">
        <h2>✨ 인기 레시피</h2>

        <p>오늘 가장 사랑받는 홈카페 메뉴</p>
      </div>

      {/* 카드 리스트 */}
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

      {/* 상세 모달 */}
      <AnimatePresence>
        {selectedRecipe && (
          <Modal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>

      {/* 업로드 모달 */}
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
