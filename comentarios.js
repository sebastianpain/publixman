document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.querySelector('form');
  const comentariosList = document.getElementById('comentarios-list');

  // Obtener comentarios almacenados en el almacenamiento local
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  // Función para actualizar la lista de comentarios en el almacenamiento local
  function actualizarAlmacenamientoLocal() {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
  }

  // Función para obtener la hora actual en Argentina
  function obtenerHoraArgentina() {
    const horaUTC = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' });
    return horaUTC;
  }

  // Función para agregar un comentario al DOM y a la lista
  function agregarComentarioALaLista(nombre, email, mensaje, hora) {
    // Crear un nuevo comentario como objeto JSON
    const nuevoComentario = {
      id: 1, // Usar el mismo ID para todos los comentarios
      nombre: nombre,
      email: email,
      mensaje: mensaje,
      hora: hora
    };

    // Limpiar la lista de comentarios en el DOM
    comentariosList.innerHTML = '';

    // Mostrar el último comentario en el contenedor de comentarios
    const comentarioElemento = document.createElement('li');
    comentarioElemento.classList.add('list-group-item');
    comentarioElemento.innerHTML = `<strong>Comentario:</strong> Nombre: ${nuevoComentario.nombre}, Email: ${nuevoComentario.email}, Mensaje: ${nuevoComentario.mensaje}, Hora: ${nuevoComentario.hora}`;
    comentariosList.appendChild(comentarioElemento);

    // Actualizar la lista de comentarios con el último comentario
    comentarios = [nuevoComentario];

    // Actualizar el almacenamiento local
    actualizarAlmacenamientoLocal();
  }

  // Mostrar el último comentario almacenado al cargar la página
  if (comentarios.length > 0) {
    const ultimoComentario = comentarios[0];
    agregarComentarioALaLista(ultimoComentario.nombre, ultimoComentario.email, ultimoComentario.mensaje, ultimoComentario.hora);
  }

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Obtener la hora actual de Argentina
    const horaActual = obtenerHoraArgentina();

    // Agregar el comentario al DOM y a la lista
    agregarComentarioALaLista(nombre, email, mensaje, horaActual);

    // Limpiar el formulario después de agregar el comentario
    formulario.reset();
  });
});
