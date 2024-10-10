import { CursosService } from "/server/script/service/CursosService.js";
import { ContentViewAdmin } from "./course-select/content-course/content.js";
import { DataViewAdmin } from "./course-select/data-course/data.js";
import { DescriptionViewAdmin } from "./course-select/description-course/description.js";
export class CursosView {
        constructor() {
                this.views = {
                        "description-course": DescriptionViewAdmin,
                        "content-course": ContentViewAdmin,
                        "data-course": DataViewAdmin
                };
                this.init();
                this.clickBuscarCurso()
        }

        init() {
                /* Elements */
                this.btnFindCourse = document.querySelector("#btn-find-course");
                this.content = document.querySelector(".content-upload-course");
                this.courseSelectHTML = document.querySelector(".course-select");
                this.bodyCourseSelectHTML = document.querySelector(".body-course-select");
                this.normal = document.querySelector(".normal");
                this.tabCourseSelect = document.querySelectorAll(".tabs__item-course-select");
                /* Actions */
                this.courseSelectHTML.style.display = 'none';
                this.btnFindCourse.addEventListener("click", this.clickBuscarCurso);


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
                        document.querySelectorAll('.curso-upload-curso').forEach(cursoUploadCurso => {
                                cursoUploadCurso.addEventListener('click', () => {
                                        this.courseSelectHTML.style.display = "grid"
                                        this.normal.style.display = 'none';
                                        const curso = data.find(c => c.code === cursoUploadCurso.id)
                                        console.log(cursoUploadCurso.id)

                                        this.clickTabCourseSelect(document.querySelector("#description-course"), curso)

                                        this.tabCourseSelect.forEach(tab => {
                                                tab.addEventListener("click", () => this.clickTabCourseSelect(tab, curso));
                                        });
                                })
                        });

                } catch (error) {
                        console.error(error);
                }
        }

        clickTabCourseSelect = async (targetElement, curso) => {
                try {
                        if (!targetElement.id || !this.views.hasOwnProperty(targetElement.id)) {
                                return
                        }
                        const response = await fetch(`course/course-select/${targetElement.id}/${targetElement.id}.html`);
                        if (!response.ok) {
                                throw new Error('Failed to fetch course-select.html');
                        }

                        let contentHTMLTXT = await response.text()

                        this.bodyCourseSelectHTML.innerHTML = contentHTMLTXT;
                        new this.views[targetElement.id](curso)
                } catch (error) {
                        console.log(error);
                }
        }
}