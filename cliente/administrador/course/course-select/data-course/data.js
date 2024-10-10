export class DataViewAdmin {
        constructor(curso) {
                this.curso = curso;
                this.init();
        }
        init() {
                // Los que son inputs:
                this.courseDataInput = document.querySelectorAll('.data-course__input');
                this.courseName = document.querySelector('#courseName');
                this.courseFilel = document.querySelector('#courseFile');
                this.courseCreator = document.querySelector('#courseCreator');
                this.courseLanguage = document.querySelector('#courseLanguage');
                this.coursePrice = document.querySelector('#coursePrice');

                // Los que son divs (contenteditable)
                this.courseDataContent = document.querySelectorAll('.data-course__content');
                this.courseSkills = document.querySelector('#courseSkills');
                this.courseDetails = document.querySelector('#courseDetails');
                this.courseRequirements = document.querySelector('#courseRequirements');
                this.courseShortDescription = document.querySelector('#courseShortDescription');

                // BTN Style
                this.btnStyleBoldDescription = document.querySelector('#btnStyleBoldDescription');
                this.btnStyleListDescription = document.querySelector('#btnStyleListDescription');
                this.btnStyleListOrdDescription = document.querySelector('#btnStyleListOrdDescription');

                // Atributos
                this.elementFocus = null; // Último elemento en foco (un div contenteditable)
                this.list = false; // Para alternar entre lista y párrafo

                // Events
                this.addEventListeners();
                this.addDataCursoInput();
        }

        addEventListeners() {
                // Añadir listeners para detectar el último div seleccionado (focus)
                this.courseDataContent.forEach(div => {
                        div.addEventListener('focus', e => {
                                this.elementFocus = e.target; // Guardamos el último div en foco
                                console.log(e.target)
                        });
                });

                // Añadir listeners a los inputs para evitar que los botones funcionen cuando se selecciona un input
                this.courseDataInput.forEach(input => {
                        input.addEventListener('focus', () => {
                                this.elementFocus = null; // No hay div en foco, se desactiva la edición
                        });
                });

                // Listener para negrita
                this.btnStyleBoldDescription.addEventListener('click', e => {
                        if (this.elementFocus) { // Solo aplicar si hay un div en foco
                                document.execCommand('bold');
                        }
                });

                // Listener para lista desordenada
                this.btnStyleListDescription.addEventListener('click', e => {
                        if (this.elementFocus) { // Solo aplicar si hay un div en foco
                                if (this.list) {
                                        document.execCommand('formatBlock', false, 'p');
                                } else {
                                        document.execCommand('insertUnorderedList', false, true);
                                }
                                this.list = !this.list;
                        }
                });

                // Listener para lista ordenada
                this.btnStyleListOrdDescription.addEventListener('click', e => {
                        if (this.elementFocus) { // Solo aplicar si hay un div en foco
                                if (this.list) {
                                        document.execCommand('formatBlock', false, 'p');
                                } else {
                                        document.execCommand('insertOrderedList', false, true);
                                }
                                this.list = !this.list;
                        }
                });
        }

        addDataCursoInput() {
                this.courseName.value = this.curso.name;
                this.courseCreator.value = this.curso.author;
                this.courseLanguage.value = this.curso.language;
                this.coursePrice.value = this.curso.price;

                // Los que son divs (contenteditable)
                this.courseSkills.innerHTML = this.curso.habilidades;
                this.courseDetails.innerHTML = this.curso.detalles;
                this.courseRequirements.innerHTML = this.curso.requisitos;
                this.courseShortDescription.innerHTML = this.curso.shortDescription;
        }
}