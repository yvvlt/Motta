import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.css";

import Header from "./components/Header";
import Banner from "./components/Banner";
import RecipeCard from "./components/RecipeCard";
import Modal from "./components/Modal";

import { supabase } from "./supabase";

function App() {
  /* ---------------- RECIPES ---------------- */

  const [recipes, setRecipes] = useState([]);

  /* ---------------- SEARCH/FILTER ---------------- */

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  /* ---------------- DARK MODE ---------------- */

  const [darkMode, setDarkMode] = useState(false);

  /* ---------------- MODAL ---------------- */

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [user, setUser] = useState(null);

  /* ---------------- UPLOAD ---------------- */

  const [showUpload, setShowUpload] = useState(false);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    category: "cake",
    image: "",
  });

  /* ---------------- AUTH ---------------- */

  /* =======================================================
      로그인 상태 확인
  ======================================================= */

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* =======================================================
      로그아웃
  ======================================================= */

  const handleLogout = async () => {
    await supabase.auth.signOut();

    alert("로그아웃 완료!");
  };

  const handleLogin = async () => {
    const email = prompt("로그인할 이메일을 입력하세요");

    if (!email) return;

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      console.log(error);

      alert("로그인 실패");
    } else {
      alert("이메일로 로그인 링크를 보냈어요!");
    }
  };

  /* =======================================================
      레시피 불러오기
  ======================================================= */

  useEffect(() => {
    fetchRecipes();
  }, []);

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

  /* =======================================================
      좋아요
  ======================================================= */

  const toggleLike = async (id, currentLikes) => {
    const { error } = await supabase
      .from("recipes")
      .update({
        likes: currentLikes + 1,
      })
      .eq("id", id);

    if (!error) {
      fetchRecipes();
    }
  };

  /* =======================================================
      레시피 업로드
  ======================================================= */

  const addRecipe = async () => {
    if (!newRecipe.title || !newRecipe.image) {
      alert("모든 항목 입력!");
      return;
    }

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

      alert("업로드 실패");
    } else {
      alert("업로드 완료!");

      fetchRecipes();

      setNewRecipe({
        title: "",
        category: "cake",
        image: "",
      });

      setShowUpload(false);
    }
  };

  /* =======================================================
      검색 필터
  ======================================================= */

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || recipe.category === filter)
    );
  });

  /* =======================================================
      Blob Effect
  ======================================================= */

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* =======================================================
      UI
  ======================================================= */

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
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
      />

      {/* Banner */}

      <Banner />

      {/* Upload Button */}

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

      {/* Recipe List */}

      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onLike={() => toggleLike(recipe.id, recipe.likes)}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      {/* Recipe Modal */}

      <AnimatePresence>
        {selectedRecipe && (
          <Modal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>

      {/* Upload Modal */}

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
