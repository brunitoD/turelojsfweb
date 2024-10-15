// let productos = [];
// let contador = 0;
// const cantidadPorCarga = 12; // Número de productos a cargar por vez
// let categoriaActual = "todos"; // Establecer por defecto a "todos"

// fetch("productos.json")
//     .then(response => response.json())
//     .then(data => {
//         productos = data;
//         cargarProductos(); // Cargar los primeros 12 productos al inicio
//         observarUltimoElemento(); // Observar el último elemento
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// const contenedorProductos = document.querySelector("#contenedor-productos");
// const botonesCategorias = document.querySelectorAll(".boton-categoria");

// botonesCategorias.forEach(boton => {
//     boton.addEventListener("click", () => {
//         categoriaActual = boton.id; // Cambiar esto para usar el id como categoría
//         contador = 0; // Reiniciar contador al cambiar de categoría
//         contenedorProductos.innerHTML = ""; // Limpiar productos anteriores
//         cargarProductos(); // Cargar productos de la nueva categoría
//         observarUltimoElemento(); // Observar el nuevo último elemento
//     });
// });

// const cargarProductos = () => {
//     const productosFiltrados = categoriaActual === "todos" ? productos : productos.filter(producto => producto.categoria === categoriaActual);
    
//     // Si no hay más productos para cargar, salir de la función
//     if (contador >= productosFiltrados.length) {
//         return;
//     }

//     const publicacionesAlCargar = productosFiltrados.slice(contador, contador + cantidadPorCarga);
    
//     publicacionesAlCargar.forEach(producto => {
//         contenedorProductos.innerHTML += `
//         <div class="producto">
//             <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
//             <div class="producto-detalles">
//                 <h3 class="producto-titulo">${producto.titulo}</h3>
//                 <p class="producto-precio">$${producto.precio}</p>
//                 <button class="producto-agregar" id="${producto.id}">Agregar</button>
//             </div>
//         </div>
//         `;
//     });

//     contador += publicacionesAlCargar.length; // Incrementar el contador

//     // Si se han cargado todos los productos, mostrar el mensaje al final
//     if (contador >= productosFiltrados.length) {
//         contenedorProductos.innerHTML += `<h3 style="margin:40px; text-align:center; font-weight:700;">No hay más productos</h3>`;
//         observer.disconnect(); // Dejar de observar si no hay más productos
//     } else {
//         observarUltimoElemento(); // Observar el nuevo último elemento
//     }
//     actualizarBotonesAgregar();
// }

// // Inicializar con los primeros 12 productos de "todos"
// cargarProductos();

// const cargarMasProductos = (entries) => {
//     if (entries[0].isIntersecting) {
//         cargarProductos(); // Cargar más productos si el último elemento es visible
//     }
// };

// const observer = new IntersectionObserver(cargarMasProductos);

// const observarUltimoElemento = () => {
//     const publicacionElements = document.querySelectorAll(".producto");
//     if (publicacionElements.length > 0) {
//         const ultimoElemento = publicacionElements[publicacionElements.length - 1];
//         observer.observe(ultimoElemento); // Observar el último elemento cargado
//     }
// };



let productos = [];
let contador = 0;
const cantidadPorCarga = 12; // Número de productos a cargar por vez
let categoriaActual = "todos"; // Establecer por defecto a "todos"

fetch("productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(); // Cargar los primeros 12 productos al inicio
        observarUltimoElemento(); // Observar el último elemento
    })
    .catch(error => {
        console.error('Error:', error);
    });

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", () => {
        categoriaActual = boton.getAttribute("data-categoria"); // Obtener la categoría del data-categoria
        contador = 0; // Reiniciar contador al cambiar de categoría
        contenedorProductos.innerHTML = ""; // Limpiar productos anteriores

        window.scrollTo(0, 0);

        cargarProductos(); // Cargar productos de la nueva categoría
        observarUltimoElemento(); // Observar el nuevo último elemento
    });
});

const cargarProductos = () => {
    const productosFiltrados = categoriaActual === "todos" ? productos : productos.filter(producto => producto.categoria.id === categoriaActual);
    
    if (contador >= productosFiltrados.length) {
        return;
    }

    const publicacionesAlCargar = productosFiltrados.slice(contador, contador + cantidadPorCarga);
    
    publicacionesAlCargar.forEach(producto => {
        contenedorProductos.innerHTML += `
        <div class="producto">
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        </div>
        `;
    });

    contador += publicacionesAlCargar.length;

    if (contador >= productosFiltrados.length) {
        contenedorProductos.innerHTML += `<h3 style="margin:auto; text-align:center; font-weight:700;">No hay más productos</h3>`;
        observer.disconnect();
    } else {
        observarUltimoElemento();
    }
    actualizarBotonesAgregar();
}

// Inicializar con los primeros 12 productos de "todos"
cargarProductos();

const cargarMasProductos = (entries) => {
    if (entries[0].isIntersecting) {
        cargarProductos(); // Cargar más productos si el último elemento es visible
    }
};

const observer = new IntersectionObserver(cargarMasProductos);

const observarUltimoElemento = () => {
    const publicacionElements = document.querySelectorAll(".producto");
    if (publicacionElements.length > 0) {
        const ultimoElemento = publicacionElements[publicacionElements.length - 1];
        observer.observe(ultimoElemento); // Observar el último elemento cargado
    }
};


















botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const categoriaId = e.currentTarget.id;

        if (categoriaId !== "todos") {
            // Encuentra un solo producto para obtener la categoría
            const productoCategoria = productos.find(producto => producto.categoria && producto.categoria.id === categoriaId);

            if (productoCategoria) {
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;

                // Filtra todos los productos de la categoría seleccionada
                const productosBoton = productos.filter(producto => producto.categoria && producto.categoria.id === categoriaId);
                cargarProductos(productosBoton);
            } else {
                console.error("No se encontró la categoría con id:", categoriaId);
                // Manejar el caso cuando no se encuentra el productoCategoria
            }
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});




function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    location.href = "carrito.html";//agregado por nuestra parte para que al agregar un producto redirija al carrito
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}