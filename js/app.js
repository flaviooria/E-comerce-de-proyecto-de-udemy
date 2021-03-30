const carrito = document.querySelector("#carrito")
const listaCursos = document.querySelector("#lista-cursos")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
let articulosCarrito = []

cargarEventListener()

function cargarEventListener() {
    //Para añadir un nuevo curso
    listaCursos.addEventListener("click", agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso)

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [] // reseteamos el carrito
        limpiarContenedor() // elimina todo el contenedor con articulos
    })
}

function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains("agregar-carrito")) {
        //obtener la informcion del curso que estamos haciendo click
        let infoCurso = e.target.parentElement.parentElement
        leerDatosCurso(infoCurso)
    }

}

function leerDatosCurso(curso) {
    const infoCurso = {
        img: curso.querySelector("img").src,
        titulo: curso.querySelector(".info-card h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        autor: curso.querySelector(".info-card p").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //revisa si un curso ya se agregado y aumenta la cantidad
    let cursoAgregado = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (cursoAgregado) {
        //actulizamos la cantidad
        let cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso
            } else return curso
        })
        console.log(cursos);
        articulosCarrito = [...cursos]
    } else {
        //agrego elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    //muestro los curso del carrito
    addCursosCarrito()
}

//muestra los cursos en el contenedor carrito
function addCursosCarrito() {
    //limpiar el contenedor de carrito, para que cada vez que añadimos un curso nuevo no vuelva a meter ambos
    limpiarContenedor()

    //recorre el carrito añadiendo los cursos
    articulosCarrito.forEach(curso => {
        //hacemos un destructuring para acceder a las claves de forma mas rapida y corta
        const { img,titulo,precio,cantidad,id, autor} = curso

        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>
            <img src="${img}" width="100"/>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${autor}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `
        //añadimos al cuerpo del contenedor
        contenedorCarrito.appendChild(tr)
    })
}

//limpia el contenedor
function limpiarContenedor() {
    //forma lenta
    //contenedorCarrito.innerHTML = ""

    //Busca si tiene un primer hijo y si es asi lo elimina hasta que no haya ni uno
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

//elimina curso que no queramos
function eliminarCurso(e) {
    if(e.target.classList.contains("borrar-curso")) {
        let idCursoABorrar = e.target.getAttribute("data-id")
        
        //eliminando el curso
        articulosCarrito =  articulosCarrito.filter(curso => curso.id !== idCursoABorrar)
        //aqui llamamos esta funcion porque iterara de nuevo en articulosCarrito que ya esta modificado y los pintara
        addCursosCarrito()  
    }
}

