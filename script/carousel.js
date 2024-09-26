import { PortalService } from "./service/PortalService.js";

document.addEventListener("DOMContentLoaded", () => {
        const carousel = new Carousel();
        carousel.visibleItems = 5
        try {
                const listPopularPromise = PortalService.findAllPopular();
                listPopularPromise.then(listaPopulares => {
                        carousel.addListPopulars(listaPopulares);
                });
        } catch (error) {
                console.error(error);
        }
});

class Carousel {
        constructor() {
                this.btnNext = document.querySelector(".carousel-next");
                this.btnPrev = document.querySelector(".carousel-prev");
                this.carouselItems = document.querySelector('.popular__content');
                this.currentIndex = 0;
                this.visibleItems = 5;
                this.popularItemList = [];
                this.listaPopulares = [];
                this.init();
        }

        init() {
                this.btnNext.addEventListener('click', this.btnNextClick);
                this.btnPrev.addEventListener('click', this.btnPrevClick);
        }

        btnNextClick = () => {
                if (this.currentIndex + this.visibleItems < this.popularItemList.length) {
                        this.currentIndex += this.visibleItems - 1;
                        this.updateCarousel();
                        this.isVisibility();
                }
        }

        btnPrevClick = () => {
                if (this.currentIndex > 0) {
                        this.currentIndex -= this.visibleItems - 1;
                        this.updateCarousel();
                        this.isVisibility();
                }
        }

        addListPopulars(listaPopulares) {
                this.listaPopulares = listaPopulares;
                this.updatePopularItemList()
                this.updateCarousel();
                this.isVisibility();
        }

        updatePopularItemList() {
                this.popularItemList = this.listaPopulares.map(popular => {
                        const articlePopularItem = document.createElement('article');
                        articlePopularItem.classList.add('popular__item');
                        articlePopularItem.innerHTML = `
                                <a href="${popular.url}?code=${popular.id}" class="popular__item-url">
                                <header class="popular__item-header">
                                        <img src="${popular.portada}" alt="${popular.name}">
                                </header>
                                <div class="popular__item-content">
                                        <h3 class="popular__item-title">${popular.name}</h3>
                                        <div class="popular__item-data">
                                                <div class="popular__item-info">
                                                        <p class="popular__item-author">${popular.author}</p>
                                                        <ul class="popular__item-calification">
                                                                <li class="popular__item-score">${popular.score}</li>
                                                                <li class="popular__item-votes">(${popular.votes})</li>
                                                        </ul>
                                                </div>
                                                <div class="popular__item-price">
                                                        <span>${popular.price}</span>
                                                        <del>${popular.pricePrevous}</del>
                                                </div>
                                        </div>
                                        <div class="popular__item-badges">
                                                <span class="popular__item-badge">Lo más vendido</span>
                                        </div>
                                </div>
                                </a>
                        `;
                        this.addEventHover(articlePopularItem, popular)
                        this.addEventOut(articlePopularItem)
                        return articlePopularItem;
                });
        }

        updateCarousel() {
                const totalItems = this.popularItemList.length;
                this.carouselItems.innerHTML = '';
                const fragmentElement = document.createDocumentFragment();
                for (let i = this.currentIndex; i < this.currentIndex + this.visibleItems && i < totalItems; i++) {
                        fragmentElement.appendChild(this.popularItemList[i]);
                }
                this.carouselItems.appendChild(fragmentElement);
        }

        isVisibility = () => {
                if (this.currentIndex === 0) {
                        this.btnPrev.classList.add("hidden");
                } else {
                        this.btnPrev.classList.remove("hidden");
                }

                if ((this.currentIndex + this.visibleItems) > this.popularItemList.length) {
                        this.btnNext.classList.add("hidden")
                } else {
                        this.btnNext.classList.remove("hidden");
                }
        }

        addEventHover = (popularItemHTML, popular) => {
                popularItemHTML.addEventListener('mouseenter', () => {
                        if (document.querySelector(".details")) {
                                return;
                        }
                        let details = `
                        <div class="details">
                                <header class="details__header">
                                        <p class="details__header-text">
                                                ${popular.name}
                                        </p>
                                </header>
                                <main class="details__body">
                                        <section class="details__update">Ultima actualización: ${popular.lastUpdate}</section>
                                        <section class="details__language">${popular.language}</section>
                                        <section class="details__info">${popular.details}</section>
                                </main>
                                <footer class="details__options">
                                        <button type="button">Comprar</button>
                                        <button type="button">Mas Detalles</button>
                                </footer>
                        </div>`;
                        popularItemHTML.innerHTML += details
                })
        }

        addEventOut = (popularItemHTML) => {
                popularItemHTML.addEventListener('mouseleave', () => {
                        if (!document.querySelector(".details")) {
                                return;
                        }
                        const details = document.querySelector(".details")
                        details.remove()
                })
        }
}