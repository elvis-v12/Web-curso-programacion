import { CursosService } from "/server/script/service/CursosService.js";
export class CursosView {
        constructor() {
                this.views = {
                };
                this.init();
        }

        init() {
                this.btnFindCourse = document.querySelector("#btn-find-course");
                this.content = document.querySelector(".content-upload-course")
                this.btnFindCourse.addEventListener("click", this.clickBuscarCurso);
                // this.clickBuscarCurso()
                // this.testData()
        }
        clickBuscarCurso = async () => {
                try {
                        const data = await CursosService.findAll();
                        this.content.innerHTML = data.map(({ code, portada, name, author, score, votes, price, pricePrevous }) =>
                                `
                                <article class="curso-upload-curso" id="${code}">
                                <header class="curso__header-upload-curso">
                                        <img src="${portada}" alt="${name}">
                                </header>
                                <div class="curso__content-upload-curso">
                                        <h3 class="curso__title-upload-curso">${name}</h3>
                                        <div class="curso__body-upload-curso">
                                                <div class="cursos__data-upload-curso">
                                                        <p class="curso__data_item-upload-curso">${author}</p>
                                                        <ul class="popular__item_calification">
                                                                <li class="curso__calification_item-upload-curso">${score}</li>
                                                                <li class="curso__calification_item-upload-curso">(${votes})</li>
                                                        </ul>
                                                </div>
                                                <div class="cursos__price-upload-curso">
                                                        <span>${price}</span>
                                                        <del>${pricePrevous}</del>
                                                </div>
                                        </div>
                                        <div class="curso__footer-upload-curso">
                                                <span class="">Lo más vendido</span>
                                        </div>
                                </div>
                                </article>
                                `
                        ).join("");

                        const CURSO_SELECTOR = '.curso-upload-curso';
                        document.querySelectorAll(CURSO_SELECTOR).forEach(curso => curso.addEventListener('click', () => this.clickCurso(data.find(c => c.code === curso.id))));
                } catch (error) {
                        console.error(error);
                }
        }

        clickCurso = curso => {

        }
        testData = async () => {
                try {
                        let curso = (await CursosService.findAll()).find(c => c.code === "CUR001");
                        this.content.innerHTML = `
                                ${curso.code}
                        `
                } catch (error) {
                        console.error(error);
                }
        }
}