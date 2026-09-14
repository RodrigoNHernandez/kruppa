document.addEventListener("DOMContentLoaded", () => {
  // 1. LÓGICA DEL HERO BACKGROUND SLIDER (Rotación de fotos de fondo)
  const slides = document.querySelectorAll(".hero-bg-slider .slide");

  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000; // Cambia cada 5 segundos

    const nextSlide = () => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    };

    setInterval(nextSlide, slideInterval);
  }

  // 2. LÓGICA DE MEDIA & ARCHIVE (Grilla compacta y Lightbox)
  const grid = document.getElementById('mediaGrid');
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('closeLightbox');
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');

  if (grid) {
    const mediaItems = [
      {
        id: 1,
        type: 'photos',
        span: '',
        title: 'El viejo estudio de calle Mosconi',
        cat: 'Photography',
        desc: 'Aquí es donde todo esto comenzó...',
        media: 'Imagenes/hero/foto1.jpg'
      },
      {
        id: 2,
        type: 'flyers',
        span: '',
        title: 'Flyer Birra House',
        cat: 'Flyer Design',
        desc: 'Flyer del Live Set del 27 de Agosto de 2026 en Birra House',
        media: 'Imagenes/noticias/flyerbirra.jpg'
      },
      {
        id: 3,
        type: 'photos',
        span: '',
        title: 'Live Set',
        cat: 'Photography',
        desc: 'Live Set en Alabama Beer, Maipu, Mendoza, 31 de julio de 2026, luego del show de Populistas. Fotógrafo: Facundo Ceballos.',
        media: 'Imagenes/galeria/foto1.jpg'
      },
      {
        id: 4,
        type: 'photos',
        span: '',
        title: 'Live Set',
        cat: 'Photography',
        desc: 'Live Set en Alabama Beer, Maipu, Mendoza, 31 de julio de 2026, luego del show de Populistas. Fotógrafo: Facundo Ceballos.',
        media: 'Imagenes/galeria/foto2.jpg'
      },
      {
        id: 5,
        type: 'photos',
        span: '',
        title: 'Live Set',
        cat: 'Photography',
        desc: 'Live Set en Alabama Beer, Maipu, Mendoza, 31 de julio de 2026, luego del show de Populistas. Fotógrafo: Facundo Ceballos.',
        media: 'Imagenes/galeria/foto3.jpg'
      },
      {
        id: 6,
        type: 'photos',
        span: '',
        title: 'Studio',
        cat: 'Photography',
        desc: 'Estudio actual.',
        media: 'Imagenes/galeria/foto4.jpg'
      },
      {
        id: 7,
        type: 'flyers',
        span: '',
        title: 'Flyer Alabama Beer',
        cat: 'Flyer Design',
        desc: 'Flyer del Live Set del 31 de Agosto de 2026 en Alabama Beer, junto a Populistas',
        media: 'Imagenes/galeria/foto5.jpg'
      },
      {
        id: 8,
        type: 'photos',
        span: '',
        title: 'Live Set',
        cat: 'Photography',
        desc: 'Parte del desarme de equipos luego del Live Set en Birra House el 27 de agosto de 2026',
        media: 'Imagenes/galeria/foto6.jpg'
      },
      {
        id: 9,
        type: 'photos',
        span: '',
        title: 'Presentación',
        cat: 'Photography',
        desc: 'Mr. Kruppa.',
        media: 'Imagenes/galeria/foto7.jpg'
      }
    ];

    function renderItems(filter = 'all') {
      grid.innerHTML = '';
      const filtered = filter === 'all' ? mediaItems : mediaItems.filter(i => i.type === filter);
      filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = `media-item ${item.span}`;
        div.innerHTML = `
          <img src="${item.media}" alt="${item.title}" loading="lazy">
          <div class="media-overlay">
            <span class="media-category-tag">${item.cat}</span>
            <div class="media-title">${item.title}</div>
          </div>
        `;
        div.addEventListener('click', () => openLightbox(item));
        grid.appendChild(div);
      });
    }

    function openLightbox(item) {
      document.getElementById('lightboxCategory').textContent = item.cat;
      document.getElementById('lightboxTitle').textContent = item.title;
      document.getElementById('lightboxDesc').textContent = item.desc;
      const mediaBox = document.getElementById('lightboxMediaContainer');
      mediaBox.innerHTML = `<img src="${item.media}" alt="${item.title}">`;
      lightbox.classList.add('open');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
    }

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('open');
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderItems(btn.dataset.filter);
      });
    });

    renderItems('all');
  }

  // 3. DESACTIVAR CLIC DERECHO EN IMÁGENES DE MEDIA Y LIGHTBOX
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.media-item') || e.target.closest('.lightbox-media')) {
      e.preventDefault();
    }
  });
});