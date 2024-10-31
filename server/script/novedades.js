import { NovedadService } from "../script/service/NovedadService.js";
document.addEventListener('DOMContentLoaded', () => {
        const novedadesHTML = document.querySelector('.novedades__content');
        renderNovedadItems(novedadesHTML);
})

async function renderNovedadItems(elementHTML) {
        try {
                const novedadList = NovedadService.findAll();
                const fragmentElement = document.createDocumentFragment();
                novedadList.then(listaNovedades => {
                        listaNovedades.forEach(element => {
                                const novedadItemHTML = document.createElement("article");
                                novedadItemHTML.classList.add("novedades__item");
                                novedadItemHTML.innerHTML = `
                                        <div class="novedades__item-header">
                                                <img src="${element.portada}" alt="${element.name}">
                                        </div>
                                        <div class="novedades__item-content">
                                                <div class="novedades__item-info">
                                                        <div class="novedades__item-title">${element.name}</div>
                                                        <div class="novedades__item-description">${element.description}</div>
                                                </div>
                                                <div class="novedades__item-footer">
                                                        <div class="novedades__item-border"></div>
                                                        <p class="novedades__item-date">${element.date}</p>
                                                </div>
                                        </div>
                                `;
                                fragmentElement.appendChild(novedadItemHTML);
                        });
                        elementHTML.appendChild(fragmentElement);

                })
        } catch (error) {
                console.log(error);
        }

}