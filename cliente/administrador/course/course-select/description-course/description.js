export class DescriptionViewAdmin {
        constructor(curso) {
                this.curso = curso;
                this.init();
        }
        init() {
                /* ELEMNTS */
                this.descriptionCourse = document.querySelector('.description-course');
                this.btnStyleBold = document.querySelector('#btnStyleBoldDescription');
                this.btnStyleList = document.querySelector('#btnStyleListDescription');
                this.btnStyleListOrd = document.querySelector('#btnStyleListOrdDescription');
                this.btnStyleSaveDescription = document.querySelector("#btnStyleSaveDescription");
                // ACTIONS
                this.descriptionCourse.innerHTML = this.curso.description
                this.list = false;
                this.btnStyleBold.addEventListener('click', e => {
                        document.execCommand('bold');
                });
                this.btnStyleList.addEventListener('click', e => {
                        if (this.list) {
                                document.execCommand('formatBlock', false, 'p');
                        } else {
                                document.execCommand('insertUnorderedList', false, true);
                        }
                        this.list = !this.list;
                });
                this.btnStyleListOrd.addEventListener('click', e => {
                        if (this.list) {
                                document.execCommand('formatBlock', false, 'p');
                        } else {
                                document.execCommand('insertOrderedList', false, true);
                        }
                        this.list = !this.list;
                });
                this.btnStyleSaveDescription.addEventListener('click', e => {

                });
        }

}