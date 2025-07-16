// Start with empty images array, will load from localStorage or default
let images = [];

// Default images shown on first load
const defaultImages = [
  { url: "https://picsum.photos/id/1015/600/400", category: "nature" },
  { url: "https://picsum.photos/id/1011/600/400", category: "city" },
  { url: "https://picsum.photos/id/1025/600/400", category: "nature" },
  { url: "https://picsum.photos/id/1003/600/400", category: "city" }
];

let currentIndex = 0;

// Save images array to localStorage
function saveImages() {
  localStorage.setItem('gallery-images', JSON.stringify(images));
}

// Load images from localStorage or defaults
function loadImages() {
  const stored = localStorage.getItem('gallery-images');
  if (stored) {
    images = JSON.parse(stored);
  } else {
    images = [...defaultImages];
    saveImages();
  }
  renderGallery();
}

// Render gallery with delete buttons
function renderGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  images.forEach((imgObj, index) => {
    const card = document.createElement("div");
    card.className = `image-card ${imgObj.category}`;
    card.style.position = 'relative';

    const img = document.createElement("img");
    img.src = imgObj.url;
    img.alt = imgObj.category;
    img.onclick = () => openLightbox(index);

    // Category label
    const label = document.createElement("div");
    label.className = "category-label";
    label.textContent = imgObj.category.charAt(0).toUpperCase() + imgObj.category.slice(1);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent image click
      deleteImage(index);
    };

    card.appendChild(img);
    card.appendChild(label);
    card.appendChild(deleteBtn);
    gallery.appendChild(card);
  });
}

// Delete image from images and update
function deleteImage(index) {
  images.splice(index, 1);
  saveImages();
  renderGallery();
  closeLightbox();
}

// Lightbox functions
function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = images[currentIndex].url;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("lightbox-img").src = images[currentIndex].url;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("lightbox-img").src = images[currentIndex].url;
}

// Filter images
function filterImages(category) {
  const cards = document.querySelectorAll(".image-card");
  cards.forEach((card, index) => {
    const isMatch = category === "all" || images[index].category === category;
    card.style.display = isMatch ? "block" : "none";
  });
  closeLightbox();
}

// Add user image and save persistently
function addUserImage() {
  const urlInput = document.getElementById("img-url").value.trim();
  const fileInput = document.getElementById("img-file").files[0];
  const category = document.getElementById("img-category").value;

  if (!urlInput && !fileInput) {
    alert("Please provide an image URL or select a file.");
    return;
  }

  if (fileInput) {
    const reader = new FileReader();
    reader.onload = function (e) {
      insertImage(e.target.result, category);
    };
    reader.readAsDataURL(fileInput);
  } else {
    insertImage(urlInput, category);
  }

  document.getElementById("img-url").value = '';
  document.getElementById("img-file").value = '';
}

// Insert image into array, save, and re-render gallery
function insertImage(url, category) {
  images.push({ url, category });
  saveImages();
  renderGallery();
}

// Initialize on window load
window.onload = () => {
  loadImages();
};
