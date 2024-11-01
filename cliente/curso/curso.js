import { CursosService } from "../../server/script/service/CursosService.js";

(() => {
        document.addEventListener('DOMContentLoaded', (e) => {
                new CursoProgress({ code: "CUR001" });
        });

        class CursoProgress {

                cursosService = new CursosService()

                constructor({ code }) {
                        this.cursosService.findByCodeByUser({ username: "USER001", code: code }).then(curso => {
                                this.curso = curso;
                                this.elements();
                                this.init();
                                this.progress.innerHTML = this.calculateProgress() + "%";
                                this.progressContainerInterno.style.width = `${this.calculateProgress()}%`;
                        });
                }

                elements() {
                        this.progress = document.querySelector('.curso__progreso-number');
                        this.progressContainerInterno = document.querySelector('.curso__progreso_barra-interna');
                }
                init() { }

                // Método para calcular el porcentaje de progreso
                calculateProgress() {
                        if (!this.curso || !this.curso.modules) return 0;

                        let totalContents = 0;
                        let seenContents = 0;

                        this.curso.modules.forEach(module => {
                                module.contenidos.forEach(content => {
                                        totalContents += 1;
                                        if (content.visto) seenContents += 1;
                                });
                        });

                        // Calcula el porcentaje
                        const progress = totalContents > 0 ? (seenContents / totalContents) * 100 : 0;
                        return progress.toFixed(2);
                }
        }
})();
