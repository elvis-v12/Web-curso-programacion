export class ContentViewAdmin {
        constructor(curso) {
                this.curso = curso;
                this.init();
        }
        init() {
                this.nameFormHTML = document.querySelector("#nameUpdateFormHTML");
                this.textAreaFormHTML = document.querySelector("#descriptionCourseFormHTML");
                this.contentFileFormHTML = document.querySelector("#contentCourse");
                this.buttonSaveFormHTML = document.querySelector("#btnCambiosContentCursoForm")
                this.buttonNewFormHTML = document.querySelector("#btnNuevoContentCursoForm")
                this.listContentHTML = document.querySelector('.aside__list-course-select-content');

                this.codeContentSelect = 0;
                this.curso.contenidos.forEach(content => {
                        let asideItemCourse = document.createElement("li")
                        asideItemCourse.classList.add("aside__item-course-select-content");
                        asideItemCourse.innerHTML = content.nombre
                        asideItemCourse.addEventListener('click', () => {
                                this.nameFormHTML.value = content.nombre
                                this.textAreaFormHTML.innerHTML = content.descripcion
                                this.codeContentSelect = content.code
                        })
                        this.listContentHTML.appendChild(asideItemCourse)
                });

                this.buttonSaveFormHTML.addEventListener('click', () => {
                        const name = this.nameFormHTML.value;
                        const descripcion = this.textAreaFormHTML.innerHTML;
                        const code = this.codeContentSelect;
                        alert("Se guardo cambios")
                        this.limpiarForm()
                });
                this.buttonNewFormHTML.addEventListener('click', () => {
                        this.limpiarForm()
                });
        }

        limpiarForm() {
                this.nameFormHTML.value = ""
                this.textAreaFormHTML.innerHTML = ""
                this.codeContentSelect = 0;
        }

}