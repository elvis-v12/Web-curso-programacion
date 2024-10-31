import { NovedadService } from "../script/service/NovedadService.js";
document.addEventListener('DOMContentLoaded', (e) => {
        new IndexView();
});

class IndexView {
        constructor() {
                this.novedadService = new NovedadService()
                this.init();
        }

        init() {
                this.categoriasContent = document.querySelector('.categorias__content');
                this.carouselContainer = document.querySelector('.carousel__container');
                this.carouselItems;
                this.eventContent = document.querySelectorAll('.novedad__content')
                this.currentSlide = 0;

                this.prevButton = document.querySelector('.carousel__control.prev');
                this.nextButton = document.querySelector('.carousel__control.next');

                this.prevButton.addEventListener('click', () => this.moveSlide(-1));
                this.nextButton.addEventListener('click', () => this.moveSlide(1));

                this.dataCarousel()
                this.autoPlay()

                // Menu
                this.menuContent = document.querySelector('.menu__content');
                this.menuContent.addEventListener('click', (e) => {
                        const menu = document.querySelector('.menu');
                        
                        if(menu.classList.contains('menu__active')){
                                menu.classList.remove("menu__active");
                        }else{
                                menu.classList.add("menu__active");
                        }
                        
                });
        }

        moveSlide(direction) {
                this.carouselItems[this.currentSlide].classList.remove('active');
                this.currentSlide = (this.currentSlide + direction + this.carouselItems.length) % this.carouselItems.length;
                this.carouselItems[this.currentSlide].classList.add('active');
        }

        manualMoveSlide(direction) {
                this.moveSlide(direction);
                clearInterval(this.autoPlayInterval);
                this.autoPlay();
        }

        autoPlay() {
                this.autoPlayInterval = setInterval(() => {
                        this.moveSlide(1);
                }, 5000);
        }
        async dataCarousel() {

                try {
                        let novedades = await this.novedadService.findAll();
                        console.log(novedades)
                        this.carouselContainer.innerHTML = novedades.map(novedad => `
                        <article class="carousel__item">
                            <img src="${novedad.portada}" alt="${novedad.name}">
                            <div class="novedad">
                                <div class="novedad__content">
                                    <h3 class="novedad__title">${novedad.name}</h3>
                                    <p class="novedad__description">${novedad.description}</p>
                                    <span class="novedad__date">${novedad.date}</span>
                                </div>
                            </div>
                        </article>
                        `
                        ).join('');

                        this.carouselItems = document.querySelectorAll('.carousel__item');
                        this.carouselItems[this.currentSlide].classList.add('active');
                } catch (error) {
                        console.log("Error cargando el carousel:", error);
                }
        }

}
