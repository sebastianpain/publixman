document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.querySelector('form');
  const comentariosList = document.getElementById('comentarios-list');

  // Obtener comentarios almacenados en el almacenamiento local
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  // Inicializar el contador de comentarios al máximo ID existente
  let contadorComentarios = comentarios.length > 0 ? Math.max(...comentarios.map(comment => comment.id)) + 1 : 1;

  // Función para actualizar la lista de comentarios en el almacenamiento local
  function actualizarAlmacenamientoLocal() {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
  }

  // Función para agregar un comentario al DOM y a la lista
  function agregarComentarioALaLista(nombre, email, mensaje) {
    // Crear un nuevo comentario como objeto JSON
    const nuevoComentario = {
      id: contadorComentarios,
      nombre: nombre,
      email: email,
      mensaje: mensaje
    };

    // Agregar el comentario a la lista
    comentarios.push(nuevoComentario);

    // Crear un nuevo elemento de lista para el comentario
    const nuevoComentarioElemento = document.createElement('li');
    nuevoComentarioElemento.classList.add('list-group-item');
    nuevoComentarioElemento.innerHTML = `<strong>Comentario ${contadorComentarios}:</strong> Nombre: ${nombre}, Email: ${email}, Mensaje: ${mensaje}`;

    // Agregar el comentario al contenedor de comentarios
    comentariosList.appendChild(nuevoComentarioElemento);

    // Incrementar el contador de comentarios
    contadorComentarios++;

    // Actualizar el almacenamiento local
    actualizarAlmacenamientoLocal();
  }

  // Mostrar comentarios almacenados en el almacenamiento local al cargar la página
  comentarios.forEach(function (comentario) {
    agregarComentarioALaLista(comentario.nombre, comentario.email, comentario.mensaje);
  });

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Agregar el comentario al DOM y a la lista
    agregarComentarioALaLista(nombre, email, mensaje);

    // Limpiar el formulario después de agregar el comentario
    formulario.reset();
  });
});
