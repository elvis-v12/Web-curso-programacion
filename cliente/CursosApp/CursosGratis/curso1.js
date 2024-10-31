import { CursoService } from "../../../server/script/service/CursoService.js";
(() => {
        document.addEventListener('DOMContentLoaded', async () => {
                new CursoView({ code: "CUR001" });
        });



        class CursoView {
                cursoService = new CursoService();
                constructor(curso = null) {
                        curso = this.cursoService.findById(curso);
                        this.curso = curso;
                        this.elements();
                        this.init();
                }
                elements() {
                        this.modulosCursos = () => document.querySelector(".modulos_curso");

                }

                init() {
                        this.curso.then(c => {
                                this.renderModules(c.modules);
                        })


                }

                renderModules(modules = null) {
                        const modulosCursos = this.modulosCursos();

                        if (modules) {
                                const html = modules.map((modulo) => moduleTemplade(modulo));
                                modulosCursos.innerHTML = html.join("");
                        }
                }
        }

        const moduleTemplade = ({ name, contenidos }) => {
                let sesiones = contenidos.map(contenido => sesionTemplade(contenido)).join('');
                return `
                <div class="module-section">
                        <h2>${name}</h2>
                        <ul class="module-list">${sesiones}</ul>
                </div>
                `;
        }
        const sesionTemplade = ({ code, nombre, descripcion }) =>
                `
                <li class="module-item">
                        <button class="module-link">${nombre}</button>
                </li>
                `


})();
