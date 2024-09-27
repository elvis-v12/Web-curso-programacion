import { Curso } from "/server/script/model/Curso.js";
import { Contenido } from "/server/script/model/SilaboCurso.js";
import { Temas } from "/server/script/model/SilaboCurso.js";

document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        var code = urlParams.get('code');
        const titleHTML = document.querySelector("title");
        const btnComprarCurso = document.querySelector(".btn__buy");
        obtenerDetalleCurso(code)
                .then(curso => {
                        titleHTML.textContent = curso.name;
                        render(curso);

                        btnComprarCurso.addEventListener('click', () => {

                        })
                })

                .catch(() => {
                     //   window.location.href = "/"
                });
});

const getStrella = () => {
        return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
     width="10px" height="10px" viewBox="0 0 10 10"
     preserveAspectRatio="xMidYMid meet">
     <g transform="translate(0.000000,10.000000) scale(0.00078125,-0.00078125)"
     fill="#00c3ff" stroke="none">
     <path d="M6327 11292 c-60 -180 -161 -489 -227 -687 -65 -198 -233 -709 -373
     -1135 -141 -426 -367 -1114 -503 -1527 l-248 -753 -2358 0 c-1297 0 -2358 -3
     -2358 -7 0 -5 170 -130 378 -279 207 -149 1057 -758 1887 -1353 831 -596 1518
     -1091 1528 -1100 20 -19 55 94 -420 -1346 -187 -570 -344 -1047 -628 -1910
     -141 -429 -286 -869 -322 -978 -36 -109 -63 -201 -60 -204 7 -6 -236 -180
     1912 1362 1012 726 1855 1331 1872 1343 l33 23 762 -548 c2447 -1758 3053
     -2191 3056 -2188 2 2 -46 153 -106 337 -61 183 -216 655 -346 1048 -511 1556
     -712 2168 -811 2470 -145 440 -185 563 -185 575 0 6 855 623 1900 1373 1045
     750 1900 1368 1900 1373 0 5 -909 10 -2357 11 l-2356 3 -164 500 c-90 275
     -272 826 -403 1225 -131 399 -383 1166 -560 1705 -177 539 -325 983 -329 987
     -4 5 -55 -139 -114 -320z"/>
     </g>
</svg>`
}

const render = curso => {
        // secciones: 
        const headerHTML = document.querySelector(".header")
        const habilidadesHTML = document.querySelector(".habilidades");
        const detallesHTML = document.querySelector(".detalles");
        const ventajasHTML = document.querySelector(".ventajas");
        const contenidoHTML = document.querySelector(".contenido");
        const requisitosHTML = document.querySelector(".requisitos");
        const descriptionHTML = document.querySelector(".descripcion");

        const data = document.createElement("div");
        data.classList.add("header__data")
        data.innerHTML = `
                <h1 class="header__title">${curso.name}</h1>
                <p class="header__description">${curso.shortDescription}</p>
                <ul class="header__calification">
                        <li class="header__calification-score">Puntuación ${curso.score} ${getStrella()}${getStrella()}${getStrella()}${getStrella()}${getStrella()}</li>
                        <li class="header__calification-votes">(${curso.votes} votos)</li>
                        <li class="header__calification-matriculados">${curso.matriculados} estudiantes</li>
                </ul>
                <p class="header__author">Creado por ${curso.author}</p>
                <p class="header__info">
                        <span class="header__info-update">Última actualización: ${curso.lastUpdate}</span>
                        <span class="header__info-language">(${curso.language})</span>
                </p>
        `;
        const imgHeader = document.createElement("div");
        imgHeader.classList.add("header__photo");
        imgHeader.innerHTML = `<img src="/cliente/principal/pictures/test.png" alt="">`
        headerHTML.appendChild(data);
        headerHTML.appendChild(imgHeader)

        const inner = (section, data, name, title) => {
                if (data) {
                        if (!title) {
                                title = name;
                        }
                        section.innerHTML = `
                        <h2 class="${name}__title">${title}:</h2>
                        <div class="${name}__content content">${data}</div>`;
                } else {
                        section.remove();
                }
        }

        inner(habilidadesHTML, curso.habilidades, "habilidades", "Habilidades Obtenidas:");
        inner(detallesHTML, curso.detalles, "detalles", "Detalles");
        inner(ventajasHTML, curso.ventajas, "ventajas", "Ventajas");
        inner(requisitosHTML, curso.requisitos, "requisitos", "Requisitos");
        inner(descriptionHTML, curso.description, "description", "Descripción");

        // contenido
        if (curso.sesiones) {
                contenidoHTML.innerHTML = `
                <h2 class="contenido__title">Contenido del Curso:</h2>
                <div class="contenido__content content"></div>`;
                let contenidoContentHTML = document.querySelector(".contenido__content");
                let sesionesListHTML = "";
                curso.sesiones.forEach(element => {
                        let temasHTML = ""
                        element.temas.forEach(temas => {
                                temasHTML += `
                                <p class="contenido__tema">
                                        <span class="contenido__tema-name">${temas.name}</span>
                                        <span class="contenido__tema-duracion">${temas.duracion}</span>
                                </p>`
                        })
                        sesionesListHTML += `
                                <details class="contenido__item">
                                        <summary class="contenido__item-name">
                                                <h3 class="contenido__item-title">${element.title}</h3>
                                                <span class="contenido__item-duracion">${element.duracion}</span>
                                        </summary>
                                        ${temasHTML}
                                </details>
                        `
                })
                contenidoContentHTML.innerHTML = sesionesListHTML
        } else {
                contenidoHTML.remove();
        }

        const contentStyle = document.querySelectorAll("main > section")
        contentStyle.forEach((element, index) => {
                if (index % 2 != 0) {
                        element.classList.add("content-impar");
                } else {
                        element.classList.add("content-par")
                }
        });
}

const obtenerDetalleCurso = async code => {
        try {
                let peticion = await fetch("/server/data/dataCourseDetails.json");
                if (!peticion.ok) {
                        throw new Error("No existe el curso")
                }
                const data = await peticion.json()
                let detalleCurso = data.find(element => element.id == code)

                let sesionesDetalleCurso = detalleCurso.sesiones;
                let sesionesProcesadas = []
                sesionesDetalleCurso.forEach((element, indexSesiones) => {
                        let temasDetalleCurso = element.temas;
                        let temas = []
                        temasDetalleCurso.forEach((t, indexTemas) => {
                                temas[indexTemas] = new Temas(t.name, t.duracion)
                        })
                        sesionesProcesadas[indexSesiones] = new Contenido(element.title, element.duracion, temas)
                })

                new Contenido(detalleCurso.title, detalleCurso.duracion,)
                return new Curso(
                        detalleCurso.id,
                        detalleCurso.author,
                        detalleCurso.name,
                        detalleCurso.score,
                        detalleCurso.stars,
                        detalleCurso.votes,
                        detalleCurso.price,
                        detalleCurso.pricePrevous,
                        detalleCurso.matriculados,
                        detalleCurso.lastUpdate,
                        detalleCurso.language,
                        detalleCurso.description,
                        detalleCurso.shortDescription,
                        detalleCurso.requisitos,
                        detalleCurso.habilidades,
                        detalleCurso.detalles,
                        detalleCurso.ventajas,
                        sesionesProcesadas
                );
        } catch (error) {
                console.log(error)
        }

}
