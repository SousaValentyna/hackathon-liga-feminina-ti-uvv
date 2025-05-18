document.addEventListener("DOMContentLoaded", function () {
    fetch('data/integrantes.json')
      .then(response => response.json())
      .then(integrantes => {
        const container = document.querySelector('.row.integrantes-container');
  
        if (!container) {
          console.error('Container dos integrantes não encontrado!');
          return;
        }
  
        container.innerHTML = '';

        integrantes.forEach(pessoa => {
          const div = document.createElement('div');
          div.className = 'col-md-6 col-lg-3';
          div.setAttribute('data-aos', 'zoom-in');
          div.setAttribute('data-aos-delay', '400');
  
          div.innerHTML = `
            <div class="member-card">
              <div class="member-image">
                <img src="${pessoa.imagem}" class="img-fluid" alt="${pessoa.nome}">
                <div class="member-overlay">
                  <p>${pessoa.descricao}</p>
                  <div class="member-social">
                    ${pessoa.instagram ? `<a href="${pessoa.instagram}" target="_blank"><i class="bi bi-instagram"></i></a>` : ''}
                    ${pessoa.linkedin ? `<a href="${pessoa.linkedin}" target="_blank"><i class="bi bi-linkedin"></i></a>` : ''}
                  </div>
                </div>
              </div>
              <div class="member-content">
                <h4>${pessoa.nome}</h4>
                <span class="position">${pessoa.curso}</span>
              </div>
            </div>
          `;
  
          container.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os integrantes:', error);
      });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    fetch('data/posts.json')
      .then(response => response.json())
      .then(posts => {
        const container = document.querySelector('.row.isotope-container');
        container.innerHTML = '';
  
        posts.forEach(post => {
          const col = document.createElement('div');
          col.className = `col-lg-6 col-md-6 post-item isotope-item ${post.filtro || ''}`;
  
          col.innerHTML = `
            <div class="post-card">
              <div class="post-image">
                <img src="${post.imagem}" class="img-fluid" alt="${post.titulo}" loading="lazy">
                <div class="post-overlay">
                  <div class="post-actions">
                    <a href="${post.linkImagem}" class="glightbox preview-link" data-gallery="${post.galeria}"><i class="bi bi-eye"></i></a>
                    <a href="${post.linkPost}" class="details-link" target="_blank"><i class="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </div>
              <div class="post-content">
                <a href="${post.linkPost}" class="link-none" target="_blank">
                  <h3>${post.titulo}</h3>
                  <p>${post.descricao}</p>
                </a>
              </div>
            </div>
          `;
  
          container.appendChild(col);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os posts:', error);
      });
  });
  
  window.onscroll = function () {
    const btn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }