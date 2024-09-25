import { PortalService } from "./service/PortalService.js";

document.addEventListener("DOMContentLoaded", () => {
        const carousel = new Carousel();
        carousel.visibleItems = 5
        renderPopularItems(carousel)
});

async function renderPopularItems(carousel) {
        try {
                const listPopularPromise = PortalService.findAllPopular();
                listPopularPromise.then(listaPopulares => {
                        /* convertir la lista en los itesm */
                        const items = listaPopulares.map(popular => {
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
                                return articlePopularItem;
                        });

                        // Establecer los items en el carrusel
                        carousel.setItems(items);
                });
        } catch (error) {
                console.error(error);
        }
}

class Carousel {
        constructor() {
                this.btnNext = document.querySelector(".carousel-next");
                this.btnPrev = document.querySelector(".carousel-prev");
                this.carouselItems = document.querySelector('.popular__content');
                this.currentIndex = 0;
                this.visibleItems = 5;
                this.items = [];
                this.init();
        }

        init() {
                this.btnNext.addEventListener('click', this.btnNextClick);
                this.btnPrev.addEventListener('click', this.btnPrevClick);

        }

        btnNextClick = () => {
                if (this.currentIndex + this.visibleItems < this.items.length) {
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

        setItems(items) {
                this.items = items;
                this.addEventHover();
                this.addEventOut();
                this.updateCarousel();
                this.isVisibility();
        }

        updateCarousel() {
                const totalItems = this.items.length;
                this.carouselItems.innerHTML = '';
                const fragmentElement = document.createDocumentFragment();
                for (let i = this.currentIndex; i < this.currentIndex + this.visibleItems && i < totalItems; i++) {
                        fragmentElement.appendChild(this.items[i]);
                }
                this.carouselItems.appendChild(fragmentElement);
        }

        isVisibility = () => {
                if (this.currentIndex === 0) {
                        this.btnPrev.classList.add("hidden");
                } else {
                        this.btnPrev.classList.remove("hidden");
                }

                if ((this.currentIndex + this.visibleItems) > this.items.length) {
                        this.btnNext.classList.add("hidden")
                } else {
                        this.btnNext.classList.remove("hidden");
                }
        }

        addEventHover = () => {
                this.items.forEach(element => {
                        element.addEventListener('mouseenter', () => {
                                console.log("Entro")
                        })
                });
        }
        addEventOut = () => {
                this.items.forEach(element => {
                        element.addEventListener('mouseleave', () => {
                                console.log("Salio")
                        })
                })
        }
}
