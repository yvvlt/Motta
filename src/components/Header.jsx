import { FaMoon, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { supabase } from "../supabase";

function Header({ setSearch, setFilter, toggleDark }) {
  // 이메일 로그인
  const login = async () => {
    const email = prompt("이메일 입력");

    if (!email) return;

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert("로그인 실패");
    } else {
      alert("이메일을 확인해주세요!");
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1>☕ 모두의 따뜻한 레시피</h1>

      <nav>
        <button onClick={() => setFilter("all")}>전체</button>

        <button onClick={() => setFilter("cake")}>케이크</button>

        <button onClick={() => setFilter("coffee")}>커피</button>

        <button onClick={() => setFilter("dessert")}>디저트</button>
      </nav>

      <div className="controls">
        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="검색..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 로그인 버튼 */}
        <button onClick={login}>로그인</button>

        {/* 다크모드 버튼 */}
        <button onClick={toggleDark}>
          <FaMoon />
        </button>
      </div>
    </motion.header>
  );
}

export default Header;
