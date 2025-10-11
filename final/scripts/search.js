const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  window.location.href = `meals.html?query=${encodeURIComponent(query)}`;
});