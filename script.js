document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú hamburguesa responsivo
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Filtro interactivo de la sección de talentos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const talentCards = document.querySelectorAll('.talent-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      talentCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'todos' || filterValue === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 3. Verificador interactivo de código de scout en la sección de Seguridad
  const verifyBtn = document.getElementById('verifyBtn');
  const verifyInput = document.getElementById('verifyInput');
  const verifyResult = document.getElementById('verifyResult');

  if (verifyBtn && verifyInput && verifyResult) {
    verifyBtn.addEventListener('click', () => {
      const code = verifyInput.value.trim();

      if (!code) {
        verifyResult.textContent = 'Por favor ingresa un código de verificación.';
        verifyResult.className = 'verify-result error';
        verifyResult.classList.remove('hidden');
        return;
      }

      // Simulación de verificación de credencial de scout
      if (code.toUpperCase().startsWith('SC-')) {
        verifyResult.textContent = `✓ El código "${code}" pertenece a un Scout Acreditado Oficialmente.`;
        verifyResult.className = 'verify-result success';
      } else {
        verifyResult.textContent = `✕ Código "${code}" no registrado. Contacta a soporte para validación manual.`;
        verifyResult.className = 'verify-result error';
      }
      verifyResult.classList.remove('hidden');
    });
  }

  // 4. Validación de Formulario de Contacto
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Limpiar errores previos
      document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

      // Validar Nombre
      const nombre = document.getElementById('nombre');
      if (!nombre.value.trim()) {
        document.getElementById('errorNombre').textContent = 'El nombre es obligatorio.';
        isValid = false;
      }

      // Validar Email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        document.getElementById('errorEmail').textContent = 'El correo electrónico es obligatorio.';
        isValid = false;
      } else if (!emailRegex.test(email.value.trim())) {
        document.getElementById('errorEmail').textContent = 'Ingresa un correo electrónico válido.';
        isValid = false;
      }

      // Validar Rol
      const rol = document.getElementById('rol');
      if (!rol.value) {
        document.getElementById('errorRol').textContent = 'Selecciona un tipo de perfil.';
        isValid = false;
      }

      // Validar Mensaje
      const mensaje = document.getElementById('mensaje');
      if (!mensaje.value.trim()) {
        document.getElementById('errorMensaje').textContent = 'El mensaje no puede estar vacío.';
        isValid = false;
      }

      if (isValid) {
        formFeedback.textContent = '¡Gracias por tu mensaje! Tu solicitud ha sido enviada con éxito.';
        formFeedback.className = 'form-feedback success';
        formFeedback.classList.remove('hidden');
        contactForm.reset();

        setTimeout(() => {
          formFeedback.classList.add('hidden');
        }, 5000);
      }
    });
  }
});