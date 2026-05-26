import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

function RecipeCard({ recipe, onLike, onClick }) {
  return (
    <motion.div
      className="recipe-card"
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: -5,
        y: -10,
      }}
    >
      <img src={recipe.image} alt="" />

      <h3>{recipe.title}</h3>

      <p>❤️ {recipe.likes}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onLike(recipe.id);
        }}
      >
        <FaHeart /> 좋아요
      </button>
    </motion.div>
  );
}

export default RecipeCard;
