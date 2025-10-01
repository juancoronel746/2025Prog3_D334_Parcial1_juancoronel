
document.addEventListener("DOMContentLoaded", () => { // Espera a que se cargue el DOM

  // Array de frutas con sus datos
  const fruteria = [
    {id:1, nombre:"banana", precio:150, ruta_img:"https://imgs.search.brave.com/ZLVczFBH1yNSnL-_yP5zkCu7wRDtDS-Z3VmAT7p24tg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzY1NDQzNi1NTEE3/NTIyNDE1NzQzNV8w/MzIwMjQtVi53ZWJw"},
    {id:2, nombre:"manzana", precio:350, ruta_img:"https://imgs.search.brave.com/jIEQw2oGsnfX_iiImOSAa9EYhueuR7vbQw4HCw_CMXQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzk1NjI1MC1NTEE1/MzYxMzcxMjgyNV8w/MjIwMjMtVi53ZWJw"},
    {id:3, nombre:"arandanos", precio:250, ruta_img:"https://imgs.search.brave.com/VOkLNKd2xCuor5CVDISOTaUNyFT6U1iJSVR0Agc-a-I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzc0NDcyOC1NTFU3/ODk3MTU2Nzc4OF8w/OTIwMjQtVi53ZWJw"},
    {id:4, nombre:"pera", precio:50, ruta_img:"https://imgs.search.brave.com/O_4jd4_XejpgDG9R2mQ-9mSFD_PNIXovVaMtH3ESJ98/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxQnJNN1crTmZT/LmpwZw"},
    {id:5, nombre:"anana", precio:500, ruta_img:"https://imgs.search.brave.com/2-aozIkAbZcynyV6BPZnv5JmtaqvVg64rYCbZWWzZD0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg5MTE4OC1NTFU3/MjU5MTQ4MjE2NV8x/MDIwMjMtVi53ZWJw"},
    {id:6, nombre:"naranja", precio:980, ruta_img:"https://imgs.search.brave.com/CPwl2Vs-nbmNobq4hCAVQZp4UpUf2A1KXr6EN6FCH64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzY4ODE4OC1NTE01/MjM1MTMzMjM1OF8x/MTIwMjItVi53ZWJw"}
  ];

  let carrito = []; // Array vacío donde se almacenan los productos agregados al carrito

  // Referencias a elementos del HTML
  const contenedorProductos = document.getElementById("contenedor-productos");
  const contenedorNombre = document.getElementById("contenedor-nombre");
  const buscador = document.getElementById("buscador");
  const contenedorCarrito = document.getElementById("carrito");
  const contadorHeader = document.getElementById("contador-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const botonOrdenNombre = document.getElementById("orden-nombre");
  const botonOrdenPrecio = document.getElementById("orden-precio");

  // Mostrar nombre del alumno en el nav y en la consola
  function imprimirDatosAlumno() {
    const alumno = { nombre: "Juan", apellido: "Coronel" };
    console.log(`${alumno.nombre} ${alumno.apellido}`); // Consola
    contenedorNombre.innerHTML = `<strong>${alumno.nombre} ${alumno.apellido}</strong>`; // Nav
  }

  // Mostrar lista de frutas en el contenedor principal
  function mostrarLista(lista) {
    let htmlProductos = "";
    lista.forEach(fruta => {
      htmlProductos += `
        <div class="card-producto">
          <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
          <h3>${fruta.nombre}</h3>
          <p>${fruta.precio}$</p>
          <button data-id="${fruta.id}" class="btn-agregar">Agregar al carrito</button>
        </div>
      `;
    });
    contenedorProductos.innerHTML = htmlProductos;

    // Agrega eventos a cada botón de "Agregar al carrito"
    document.querySelectorAll(".btn-agregar").forEach(boton => {
      boton.addEventListener("click", () => {
        const id = parseInt(boton.getAttribute("data-id"));
        agregarCarrito(id);
      });
    });
  }

  // Filtrar frutas según el texto escrito en el buscador
  function filtrarProductos() {
    const valorBusqueda = buscador.value.trim().toLowerCase();
    mostrarLista(fruteria.filter(fruta => fruta.nombre.toLowerCase().includes(valorBusqueda)));
  }

  // Mostrar el contenido del carrito
  function mostrarCarrito() {
    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
      contadorHeader.innerText = "0 productos";
      totalCarrito.innerText = "";
      return;
    }

    let htmlCarrito = "<ul>";
    let total = 0;
    carrito.forEach((fruta, index) => {
      htmlCarrito += `
        <li class="bloque-item">
          <p class="nombre-item">${fruta.nombre} - ${fruta.precio}$</p>
          <button data-index="${index}" class="btn-eliminar">Eliminar</button>
        </li>
      `;
      total += fruta.precio;
    });
    htmlCarrito += "</ul>";
    htmlCarrito += `<button id="vaciar-carrito">Vaciar carrito</button>`;
    contenedorCarrito.innerHTML = htmlCarrito;

    // Actualizar contador y total
    contadorHeader.innerText = `${carrito.length} productos`;
    totalCarrito.innerText = `Total: ${total}$`;

    // Eventos para eliminar productos individuales
    document.querySelectorAll(".btn-eliminar").forEach(boton => {
      boton.addEventListener("click", () => {
        const index = parseInt(boton.getAttribute("data-index"));
        eliminarDelCarrito(index);
      });
    });

    // Evento para vaciar todo el carrito
    const botonVaciar = document.getElementById("vaciar-carrito");
    if (botonVaciar) botonVaciar.addEventListener("click", vaciarCarrito);
  }

  // Agregar un producto al carrito
  function agregarCarrito(idfruta) {
    const fruta = fruteria.find(f => f.id === idfruta);
    if (fruta) {
      carrito.push(fruta);
      mostrarCarrito(); // Actualiza la visualización del carrito
    }
  }

  // Vaciar el carrito completo
  function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
  }

  // Eliminar un producto específico del carrito
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
  }

  // Ordenar carrito por nombre alfabéticamente
  function ordenarCarritoPorNombre() {
    carrito.sort((a,b) => a.nombre.localeCompare(b.nombre));
    mostrarCarrito();
  }

  // Ordenar carrito por precio de menor a mayor
  function ordenarCarritoPorPrecio() {
    carrito.sort((a,b) => a.precio - b.precio);
    mostrarCarrito();
  }

  // Inicialización: se ejecuta al cargar la página
  function init() {
    imprimirDatosAlumno();        // Mostrar nombre del alumno
    mostrarLista(fruteria);       // Mostrar todas las frutas
    mostrarCarrito();             // Mostrar carrito vacío inicialmente
    buscador.addEventListener("input", filtrarProductos); // Activar filtro en tiempo real
    botonOrdenNombre.addEventListener("click", ordenarCarritoPorNombre); // Ordenar por nombre
    botonOrdenPrecio.addEventListener("click", ordenarCarritoPorPrecio); // Ordenar por precio
  }

  init(); // Llamada inicial
});
