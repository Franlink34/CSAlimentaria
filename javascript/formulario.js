document.addEventListener('DOMContentLoaded', () => {

  const formulario = document.getElementById('miFormulario');
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const email = document.getElementById('email');
  const terminos = document.getElementById('terminos');

  const errorNombre = document.getElementById('errorNombre');
  const errorApellidos = document.getElementById('errorApellidos');
  const errorEmail = document.getElementById('errorEmail');
  const errorTerminos = document.getElementById('errorTerminos');
  const resultado = document.getElementById('resultado');

 
  formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 

    errorNombre.textContent = '';
    errorApellidos.textContent = '';
    errorEmail.textContent = '';
    errorTerminos.textContent = '';
    resultado.textContent = '';

    let valid = true;

    if (nombre.value.trim() === '') {
      errorNombre.textContent = 'El nombre es obligatorio';
      valid = false;
    }

    if (apellidos.value.trim() === '') {
      errorApellidos.textContent = 'Los apellidos son obligatorios';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      errorEmail.textContent = 'Introduce un email válido';
      valid = false;
    }

    if (!terminos.checked) {
      errorTerminos.textContent = 'Debes aceptar los términos';
      valid = false;
    }

    if (valid) {
      resultado.textContent = 'Formulario enviado correctamente ✅';
      formulario.reset();
    }
  });
});