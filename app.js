document.getElementById("recipe-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const instructions = document.getElementById("instructions").value.trim();

  if (!title || !category || !ingredients || !instructions) {
    alert("모든 항목을 입력해 주세요.");
    return;
  }

  // 여기에서 서버 API 호출해 레시피 등록 가능
  // 현재는 임시로 목록에 추가만 함

  const li = document.createElement("li");
  li.textContent = `${title} (${category})`;
  document.getElementById("recipes").appendChild(li);

  this.reset();
});
