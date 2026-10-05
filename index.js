/* ==============================
   MENU
================================ */

const btnMenu =
    document.getElementById("btnMenu");

const menu =
    document.getElementById("menu");


btnMenu.addEventListener(
    "click",
    function () {

        menu.classList.toggle(
            "activo"
        );

    }
);


document
    .querySelectorAll(".menu a")
    .forEach(function (enlace) {

        enlace.addEventListener(
            "click",
            function () {

                menu.classList.remove(
                    "activo"
                );

            }
        );

    });


/* ==============================
   CARRITO
================================ */

let carrito =
    JSON.parse(
        localStorage.getItem(
            "carritoVentas"
        )
    ) || [];


const carritoPanel =
    document.getElementById(
        "carrito"
    );

const fondoCarrito =
    document.getElementById(
        "fondoCarrito"
    );

const abrirCarrito =
    document.getElementById(
        "abrirCarrito"
    );

const cerrarCarrito =
    document.getElementById(
        "cerrarCarrito"
    );

const carritoProductos =
    document.getElementById(
        "carritoProductos"
    );

const contadorCarrito =
    document.getElementById(
        "contadorCarrito"
    );

const totalCarrito =
    document.getElementById(
        "totalCarrito"
    );

const vaciarCarrito =
    document.getElementById(
        "vaciarCarrito"
    );

const irPedido =
    document.getElementById(
        "irPedido"
    );

const resumenPedido =
    document.getElementById(
        "resumenPedido"
    );

const totalPedido =
    document.getElementById(
        "totalPedido"
    );


/* ==============================
   ABRIR CARRITO
================================ */

abrirCarrito.addEventListener(
    "click",
    function () {

        carritoPanel.classList.add(
            "activo"
        );

        fondoCarrito.classList.add(
            "activo"
        );

        document.body.classList.add(
            "carrito-abierto"
        );

    }
);


cerrarCarrito.addEventListener(
    "click",
    cerrarPanelCarrito
);


fondoCarrito.addEventListener(
    "click",
    cerrarPanelCarrito
);


function cerrarPanelCarrito() {

    carritoPanel.classList.remove(
        "activo"
    );

    fondoCarrito.classList.remove(
        "activo"
    );

    document.body.classList.remove(
        "carrito-abierto"
    );

}


/* ==============================
   AGREGAR PRODUCTOS
================================ */

document
    .querySelectorAll(".agregar")
    .forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const producto = {

                    id:
                        this.dataset.id,

                    nombre:
                        this.dataset.nombre,

                    precio:
                        Number(
                            this.dataset.precio
                        ),

                    imagen:
                        this.dataset.imagen,

                    cantidad: 1

                };


                const productoExiste =
                    carrito.find(
                        function (item) {

                            return (
                                item.id ===
                                producto.id
                            );

                        }
                    );


                if (productoExiste) {

                    productoExiste.cantidad++;

                } else {

                    carrito.push(
                        producto
                    );

                }


                guardarCarrito();

                actualizarCarrito();


                mostrarNotificacion(
                    producto.nombre +
                    " agregado al carrito"
                );

            }
        );

    });


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

    carritoProductos.innerHTML =
        "";


    if (carrito.length === 0) {

        carritoProductos.innerHTML =
        `

        <div class="carrito-vacio">

            <div>

                <span>
                    🛒
                </span>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agrega productos
                    para comenzar.
                </p>

            </div>

        </div>

        `;

    } else {


        carrito.forEach(
            function (producto) {


                const subtotal =

                    producto.precio *

                    producto.cantidad;


                carritoProductos.innerHTML +=
                `

                <div class="carrito-item">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}">


                    <div class="carrito-info">

                        <h4>

                            ${producto.nombre}

                        </h4>


                        <strong>

                            S/
                            ${subtotal.toFixed(2)}

                        </strong>


                        <div class="cantidad">

                            <button
                                onclick="cambiarCantidad('${producto.id}', -1)">

                                −

                            </button>


                            <span>

                                ${producto.cantidad}

                            </span>


                            <button
                                onclick="cambiarCantidad('${producto.id}', 1)">

                                +

                            </button>

                        </div>

                    </div>


                    <button
                        class="eliminar-item"
                        onclick="eliminarProducto('${producto.id}')">

                        ✕

                    </button>

                </div>

                `;

            }
        );

    }


    const cantidadTotal =

        carrito.reduce(

            function (
                total,
                producto
            ) {

                return (
                    total +
                    producto.cantidad
                );

            },

            0

        );


    const precioTotal =

        carrito.reduce(

            function (
                total,
                producto
            ) {

                return (

                    total +

                    producto.precio *

                    producto.cantidad

                );

            },

            0

        );


    contadorCarrito.textContent =
        cantidadTotal;


    totalCarrito.textContent =

        "S/ " +

        precioTotal.toFixed(2);


    actualizarResumenPedido();

}


/* ==============================
   CAMBIAR CANTIDAD
================================ */

function cambiarCantidad(
    id,
    cambio
) {

    const producto =

        carrito.find(
            function (item) {

                return (
                    item.id === id
                );

            }
        );


    if (!producto) {

        return;

    }


    producto.cantidad +=
        cambio;


    if (
        producto.cantidad <= 0
    ) {

        eliminarProducto(
            id
        );

        return;

    }


    guardarCarrito();

    actualizarCarrito();

}


/* ==============================
   ELIMINAR PRODUCTO
================================ */

function eliminarProducto(id) {

    carrito =

        carrito.filter(
            function (producto) {

                return (
                    producto.id !== id
                );

            }
        );


    guardarCarrito();

    actualizarCarrito();

}


/* ==============================
   VACIAR CARRITO
================================ */

vaciarCarrito.addEventListener(
    "click",
    function () {


        if (
            carrito.length === 0
        ) {

            mostrarNotificacion(
                "El carrito ya está vacío"
            );

            return;

        }


        const respuesta =

            confirm(
                "¿Quieres eliminar todos los productos?"
            );


        if (respuesta) {

            carrito = [];


            guardarCarrito();

            actualizarCarrito();


            mostrarNotificacion(
                "Carrito vaciado"
            );

        }

    }
);


/* ==============================
   GUARDAR CARRITO
================================ */

function guardarCarrito() {

    localStorage.setItem(

        "carritoVentas",

        JSON.stringify(
            carrito
        )

    );

}


/* ==============================
   CONTINUAR PEDIDO
================================ */

irPedido.addEventListener(
    "click",
    function () {

        cerrarPanelCarrito();


        document
            .getElementById(
                "pedidos"
            )
            .scrollIntoView({

                behavior:
                    "smooth"

            });

    }
);


/* ==============================
   RESUMEN PEDIDO
================================ */

function actualizarResumenPedido() {

    resumenPedido.innerHTML =
        "";


    if (
        carrito.length === 0
    ) {


        resumenPedido.innerHTML =
        `

        <div class="resumen-vacio">

            <span>
                🛍️
            </span>

            <p>
                Aún no agregaste productos.
            </p>

            <a href="#productos">
                Ver productos
            </a>

        </div>

        `;


        totalPedido.textContent =
            "S/ 0.00";


        return;

    }


    let total = 0;


    carrito.forEach(
        function (producto) {


            const subtotal =

                producto.precio *

                producto.cantidad;


            total += subtotal;


            resumenPedido.innerHTML +=
            `

            <div class="resumen-item">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}">


                <div>

                    <h4>

                        ${producto.nombre}

                    </h4>

                    <small>

                        Cantidad:
                        ${producto.cantidad}

                    </small>

                </div>


                <strong>

                    S/
                    ${subtotal.toFixed(2)}

                </strong>

            </div>

            `;

        }
    );


    totalPedido.textContent =

        "S/ " +

        total.toFixed(2);

}


/* ==============================
   PEDIDO WHATSAPP
================================ */

const formPedido =

    document.getElementById(
        "formPedido"
    );


formPedido.addEventListener(

    "submit",

    function (event) {


        event.preventDefault();


        if (
            carrito.length === 0
        ) {

            alert(
                "Primero debes agregar productos al carrito."
            );


            document
                .getElementById(
                    "productos"
                )
                .scrollIntoView({

                    behavior:
                        "smooth"

                });


            return;

        }


        const nombre =

            document
                .getElementById(
                    "nombre"
                )
                .value
                .trim();


        const telefono =

            document
                .getElementById(
                    "telefono"
                )
                .value
                .trim();


        const correo =

            document
                .getElementById(
                    "correo"
                )
                .value
                .trim();


        const direccion =

            document
                .getElementById(
                    "direccion"
                )
                .value
                .trim();


        const ciudad =

            document
                .getElementById(
                    "ciudad"
                )
                .value;


        const tipoPedido =

            document
                .getElementById(
                    "tipoPedido"
                )
                .value;


        const mensaje =

            document
                .getElementById(
                    "mensaje"
                )
                .value
                .trim();


        let productosTexto =
            "";


        let total =
            0;


        carrito.forEach(

            function (producto) {


                const subtotal =

                    producto.precio *

                    producto.cantidad;


                total += subtotal;


                productosTexto +=

                    "\n• " +

                    producto.nombre +

                    " x" +

                    producto.cantidad +

                    " = S/ " +

                    subtotal.toFixed(2);

            }
        );


        const textoWhatsApp =
        `🛒 NUEVO PEDIDO - VENTAS EN LÍNEA

👤 Cliente: ${nombre}
📱 Teléfono: ${telefono}
📧 Correo: ${correo || "No indicado"}
📍 Ciudad: ${ciudad}
🏠 Dirección: ${direccion}
📦 Tipo de pedido: ${tipoPedido}

PRODUCTOS:
${productosTexto}

💰 TOTAL: S/ ${total.toFixed(2)}

📝 Indicaciones:
${mensaje || "Ninguna"}`;


        /*
            CAMBIA ESTE NUMERO
            POR TU WHATSAPP REAL
        */

        const numeroWhatsApp =

            "51987654321";


        const enlace =

            "https://wa.me/" +

            numeroWhatsApp +

            "?text=" +

            encodeURIComponent(
                textoWhatsApp
            );


        window.open(

            enlace,

            "_blank"

        );

    }
);


/* ==============================
   BUSCADOR
================================ */

const buscador =

    document.getElementById(
        "buscadorProductos"
    );


const productos =

    document.querySelectorAll(
        ".producto"
    );


const sinResultados =

    document.getElementById(
        "sinResultados"
    );


let categoriaActual =
    "todos";


buscador.addEventListener(

    "input",

    filtrarProductos

);


function filtrarProductos() {


    const texto =

        buscador.value

            .toLowerCase()

            .trim();


    let visibles =
        0;


    productos.forEach(

        function (producto) {


            const nombre =

                producto
                    .dataset
                    .nombre
                    .toLowerCase();


            const categoria =

                producto
                    .dataset
                    .categoria;


            const coincideTexto =

                nombre.includes(
                    texto
                );


            const coincideCategoria =

                categoriaActual ===
                "todos"

                ||

                categoria ===
                categoriaActual;


            if (

                coincideTexto

                &&

                coincideCategoria

            ) {


                producto
                    .classList
                    .remove(
                        "oculto"
                    );


                visibles++;


            } else {


                producto
                    .classList
                    .add(
                        "oculto"
                    );

            }

        }
    );


    sinResultados.style.display =

        visibles === 0

            ? "block"

            : "none";

}


/* ==============================
   FILTROS
================================ */

document
    .querySelectorAll(
        ".filtro"
    )
    .forEach(
        function (boton) {


            boton.addEventListener(

                "click",

                function () {


                    document
                        .querySelectorAll(
                            ".filtro"
                        )
                        .forEach(

                            function (
                                otroBoton
                            ) {

                                otroBoton
                                    .classList
                                    .remove(
                                        "activo"
                                    );

                            }

                        );


                    this
                        .classList
                        .add(
                            "activo"
                        );


                    categoriaActual =

                        this
                            .dataset
                            .categoria;


                    filtrarProductos();

                }

            );

        }
    );


/* ==============================
   FAQ
================================ */

document
    .querySelectorAll(
        ".faq-pregunta"
    )
    .forEach(
        function (pregunta) {


            pregunta.addEventListener(

                "click",

                function () {


                    const faq =

                        this
                            .parentElement;


                    faq
                        .classList
                        .toggle(
                            "activo"
                        );


                    const simbolo =

                        this
                            .querySelector(
                                "span"
                            );


                    if (

                        faq
                            .classList
                            .contains(
                                "activo"
                            )

                    ) {


                        simbolo.textContent =
                            "−";


                    } else {


                        simbolo.textContent =
                            "+";

                    }

                }

            );

        }
    );


/* ==============================
   CONTACTO
================================ */

const formContacto =

    document.getElementById(
        "formContacto"
    );


formContacto.addEventListener(

    "submit",

    function (event) {


        event.preventDefault();


        mostrarNotificacion(
            "Mensaje enviado correctamente"
        );


        formContacto.reset();

    }
);


/* ==============================
   CODIGO QR
================================ */

/*
    IMPORTANTE:

    AQUÍ TIENES QUE PONER
    EL ENLACE REAL DE TU
    GOOGLE FORM.

    NO USES 127.0.0.1
    NI LOCALHOST.
*/


const enlaceFormulario =

    "https://forms.google.com";


const codigoQR =

    document.getElementById(
        "codigoQR"
    );


const enlaceFormularioQR =

    document.getElementById(
        "enlaceFormularioQR"
    );


if (

    codigoQR

    &&

    enlaceFormularioQR

) {


    codigoQR.src =

        "https://api.qrserver.com/v1/create-qr-code/" +

        "?size=300x300&data=" +

        encodeURIComponent(
            enlaceFormulario
        );


    enlaceFormularioQR.href =

        enlaceFormulario;

}


/* ==============================
   NOTIFICACION
================================ */

function mostrarNotificacion(
    texto
) {


    const notificacion =

        document.getElementById(
            "notificacion"
        );


    notificacion.textContent =
        texto;


    notificacion
        .classList
        .add(
            "activa"
        );


    setTimeout(

        function () {


            notificacion
                .classList
                .remove(
                    "activa"
                );

        },

        2200

    );

}


/* ==============================
   INICIAR PAGINA
================================ */

actualizarCarrito();