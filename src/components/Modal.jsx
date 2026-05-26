import { useState } from "react";
import { motion } from "framer-motion";

function Modal({ recipe, onClose }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const addComment = () => {
    if (!input) return;

    setComments([...comments, input]);
    setInput("");
  };

  return (
    <motion.div
      className="modal"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{
          scale: 0.8,
          opacity: 0,
          y: 50,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        exit={{
          scale: 0.8,
          opacity: 0,
          y: 50,
        }}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{recipe.title}</h2>

        <p>⏰ 조리시간: 30분</p>

        <textarea
          placeholder="댓글 입력..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="comment-btn" onClick={addComment}>
          댓글 등록
        </button>

        <ul>
          {comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
