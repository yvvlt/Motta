import { FaMoon, FaSearch } from "react-icons/fa";

import { motion } from "framer-motion";

function Header({ setSearch, setFilter, toggleDark, user, handleLogout }) {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
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

        <button onClick={toggleDark}>
          <FaMoon />
        </button>

        {/* 로그인 상태 */}
        {user ? (
          <div className="user-box">
            <span>{user.email}</span>

            <button onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <button>로그인</button>
        )}
      </div>
    </motion.header>
  );
}

export default Header;
