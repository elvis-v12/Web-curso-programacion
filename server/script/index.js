document.addEventListener('DOMContentLoaded', (e) => {
        new IndexView()
});
class IndexView {
        constructor() {
                this.init();
        }
        init() {
                this.categoriasContent = document.querySelector('.categorias__content');
        }
}