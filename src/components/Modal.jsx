import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { supabase } from "../supabase";

function Modal({ recipe, onClose }) {
  const [comments, setComments] = useState([]);

  const [input, setInput] = useState("");

  /* =========================
      댓글 불러오기
  ========================= */

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("recipe_id", recipe.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
    } else {
      setComments(data);
    }
  };

  /* =========================
      댓글 추가
  ========================= */

  const addComment = async () => {
    if (!input) return;

    const { error } = await supabase.from("comments").insert([
      {
        recipe_id: recipe.id,

        content: input,
      },
    ]);

    if (error) {
      console.log(error);
    } else {
      setInput("");

      fetchComments();
    }
  };

  return (
    <motion.div
      className="modal"
      onClick={onClose}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
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

        {/* 댓글 입력 */}

        <textarea
          placeholder="댓글 입력..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="comment-btn" onClick={addComment}>
          댓글 등록
        </button>

        {/* 댓글 목록 */}

        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
