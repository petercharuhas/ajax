const gifArea = document.getElementById("gif-area");
const searchInput = document.getElementById("search");
const searchForm = document.getElementById("searchForm");
const removeButton = document.getElementById("remove");

function addGif(url) {
  const newCol = document.createElement("div");
  newCol.className = "col-md-4 col-12 mb-4";
  const newGif = document.createElement("img");
  newGif.src = url;
  newGif.className = "w-100";
  newCol.appendChild(newGif);
  gifArea.appendChild(newCol);
}

async function handleSubmit(event) {
  event.preventDefault();
  const searchTerm = searchInput.value;
  searchInput.value = "";

  try {
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
    });

    const numResults = response.data.data.length;
    if (numResults) {
      const randomIdx = Math.floor(Math.random() * numResults);
      addGif(response.data.data[randomIdx].images.original.url);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function removeAllGifs() {
  gifArea.innerHTML = "";
}

searchForm.addEventListener("submit", handleSubmit);
removeButton.addEventListener("click", removeAllGifs);
