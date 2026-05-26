import { motion } from "framer-motion";

function Banner() {
  return (
    <motion.section
      className="banner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img
        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
        alt=""
      />

      <div>
        <h2>오늘의 인기 레시피 🍰</h2>

        <p>따뜻하고 달콤한 홈카페 디저트를 만나보세요.</p>
      </div>
    </motion.section>
  );
}

export default Banner;
