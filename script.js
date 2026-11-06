// --- ЛАБОРАТОРНАЯ РАБОТА №4 (Логика анализа длительности фильмов) ---
const movieDurations = [150, 45, 90, 135, 30, 180, 60]; 

function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

function filterLongMovies(arr) {
  return arr.filter(duration => duration > 120);
}

function calculateSum(arr) {
  return arr.reduce((sum, current) => sum + current, 0);
}

let userName = prompt("Введите ваше имя:");

const maxDuration = findMax(movieDurations);
const longMovies = filterLongMovies(movieDurations);
const totalDuration = calculateSum(movieDurations);
const totalLongDuration = calculateSum(longMovies);

let shortMoviesCount = 0;
let totalShortDuration = 0;

for (let i = 0; i < movieDurations.length; i++) {
  if (movieDurations[i] <= 40) {
    shortMoviesCount++;
    totalShortDuration += movieDurations[i];
  }
}

if (userName) {
  alert(`Привет, ${userName}!\nОбщая длительность просмотра – ${totalDuration} минут, из них ${totalLongDuration} минут – полнометражные фильмы.`);
} else {
  alert(`Привет!\nОбщая длительность просмотра – ${totalDuration} минут, из них ${totalLongDuration} минут – полнометражные фильмы.`);
}

console.log(`Количество короткометражек: ${shortMoviesCount}`);
console.log(`Суммарная длительность короткометражек: ${totalShortDuration} минут`);

if (maxDuration >= 180) {
  console.log("Это почти как полноценный театральный спектакль!");
}


document.addEventListener("DOMContentLoaded", () => {
  const addMovieBtn = document.getElementById("add-movie-btn");
  const clearWatchlistBtn = document.getElementById("clear-watchlist-btn");
  const toggleWatchlistBtn = document.getElementById("toggle-watchlist-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  
  const watchlistTbody = document.getElementById("watchlist-tbody");
  const watchlistTableContainer = document.querySelector(".table-container");

  if (!addMovieBtn || !clearWatchlistBtn || !watchlistTbody) {
    console.error("Ошибка: Не найдены необходимые элементы управления таблицей фильмов.");
    return;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("theme-light");
  }

  let savedMovies = JSON.parse(localStorage.getItem("watchlistMovies"));
  if (!savedMovies) {
    savedMovies = [
      { title: "Начало", year: "2010", status: "Просмотрено" },
      { title: "Интерстеллар", year: "2014", status: "К просмотру" }
    ];
  }

  function renderWatchlist() {
    watchlistTbody.innerHTML = "";
    savedMovies.forEach((movie, index) => {
      const tr = document.createElement("tr");
      
      const tdTitle = document.createElement("td");
      tdTitle.textContent = movie.title;
      tdTitle.style.padding = "8px";

      const tdYear = document.createElement("td");
      tdYear.textContent = movie.year;
      tdYear.style.padding = "8px";

      const tdStatus = document.createElement("td");
      tdStatus.textContent = movie.status;
      tdStatus.style.padding = "8px";

      tr.appendChild(tdTitle);
      tr.appendChild(tdYear);
      tr.appendChild(tdStatus);
      
      watchlistTbody.appendChild(tr);
    });
  }

  function saveMoviesToStorage() {
    localStorage.setItem("watchlistMovies", JSON.stringify(savedMovies));
  }

  renderWatchlist();

  addMovieBtn.addEventListener("click", () => {
    const title = prompt("Введите название фильма:");
    if (!title) return; // отмена ввода

    const year = prompt("Введите год выпуска фильма:");
    if (!year) return;

    const status = prompt("Введите статус (например: 'К просмотру' или 'Просмотрено'):", "К просмотру");

    const newMovie = { title, year, status: status || "К просмотру" };
    savedMovies.push(newMovie);
    
    saveMoviesToStorage();
    renderWatchlist();
  });

  clearWatchlistBtn.addEventListener("click", () => {
    if (savedMovies.length === 0) {
      alert("Список уже пуст!");
      console.log("Нет фильмов для удаления.");
      return;
    }

    if (confirm("Вы уверены, что хотите очистить весь список фильмов?")) {
      savedMovies = [];
      saveMoviesToStorage();
      renderWatchlist();
    }
  });

  if (toggleWatchlistBtn && watchlistTableContainer) {
    toggleWatchlistBtn.addEventListener("click", () => {
      watchlistTableContainer.classList.toggle("hidden");
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("theme-light");
      
      if (document.body.classList.contains("theme-light")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
    });
  }
});