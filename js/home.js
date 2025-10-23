document.addEventListener("DOMContentLoaded", () => {
  const previewArea = document.getElementById("announcePreview");
  const modalBox = new bootstrap.Modal(document.getElementById("announceModal"));
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalDate = document.getElementById("modalDate");
  const modalImg = document.getElementById("modalImg");

  fetch("data/announcements.json")
    .then(res => res.json())
    .then(data => {
      const latest = data.slice(0, 3); 
      renderPreview(latest);
    })
    .catch(err => {
      previewArea.innerHTML = `<p class="text-danger">Error loading announcements.</p>`;
      console.error(err);
    });

    function renderPreview(arr) {
  previewArea.innerHTML = "";
  arr.forEach(a => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 fadeItem";

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0 clickableCard" style="cursor:pointer;">
        <img src="${a.img || 'img/placeholder.jpg'}" class="card-img-top rounded" alt="${a.title}">
        <div class="card-body text-center">
          <h6 class="card-title text-success">${a.title}</h6>
          <p class="small text-muted mb-1">${a.month} • ${a.date}</p>
        </div>
      </div>
    `;


    const card = col.querySelector(".clickableCard");
    card.addEventListener("click", () => {
      modalTitle.textContent = a.title;
      modalText.innerHTML = `
        <p>${a.text}</p>
        <p class="mt-2">${a.details}</p>
        <p class="fw-bold text-muted mt-3">Posted by: ${a.postedBy}</p>
      `;
      modalDate.textContent = `${a.month.toUpperCase()} | ${a.date}`;
      if (a.img) {
        modalImg.src = a.img;
        modalImg.classList.remove("d-none");
      } else {
        modalImg.classList.add("d-none");
      }
      modalBox.show();
    });

    previewArea.appendChild(col);

    setTimeout(() => col.classList.add("fadeVisible"), 100);
  });
}

});
