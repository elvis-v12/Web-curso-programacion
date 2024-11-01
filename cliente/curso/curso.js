import { CursosService } from "../../server/script/service/CursosService.js";

(() => {
        document.addEventListener('DOMContentLoaded', (e) => {
                new CursoProgress({ code: "CUR001" });
        });

        class CursoProgress {

                cursosService = new CursosService();
                currentSessionIndex = 0;

                constructor({ code }) {
                        this.cursosService.findByCodeByUser({ username: "USER001", code: code }).then(curso => {
                                this.curso = curso;
                                this.elements();
                                this.init();
                                this.updateSessionInfo();
                                this.updateProgress();
                        });
                }

                elements() {
                        this.progress = document.querySelector('.curso__progreso-number');
                        this.progressContainerInterno = document.querySelector('.curso__progreso_barra-interna');
                        this.sessionName = document.querySelector('.curso__name');
                        this.sessionNumber = document.querySelector('.main__header_btn-left span');
                        this.previousButton = document.getElementById('main__header_btn-previous');
                        this.nextButton = document.getElementById('main__header_btn-next');
                }

                init() {
                        this.previousButton.addEventListener('click', () => this.changeSession(-1));
                        this.nextButton.addEventListener('click', () => this.changeSession(1));
                }

                // Method to navigate sessions and mark them as seen
                changeSession(direction) {
                        const contents = this.getAllContents();
                        const newIndex = this.currentSessionIndex + direction;

                        // Check if the new index is within bounds
                        if (newIndex >= 0 && newIndex < contents.length) {
                                this.currentSessionIndex = newIndex;
                                contents[this.currentSessionIndex].visto = true; // Mark session as seen

                                this.updateSessionInfo();
                                this.updateProgress();
                        }

                        // Disable buttons if at the boundaries
                        this.updateButtonStates();
                }

                // Update session name and number based on the current session
                updateSessionInfo() {
                        const contents = this.getAllContents();
                        const currentContent = contents[this.currentSessionIndex];

                        this.sessionName.textContent = currentContent.nombre; // Update session name
                        this.sessionNumber.textContent = this.currentSessionIndex + 1; // Update session number (1-based index)
                }

                // Enable/disable navigation buttons based on session index
                updateButtonStates() {
                        const contents = this.getAllContents();
                        this.previousButton.disabled = this.currentSessionIndex === 0;
                        this.nextButton.disabled = this.currentSessionIndex === contents.length - 1;
                }

                // Get all contents in a flat array
                getAllContents() {
                        return this.curso.modules.flatMap(module => module.contenidos);
                }

                // Calculate and update the progress display
                updateProgress() {
                        const progressValue = this.calculateProgress();
                        this.progress.innerHTML = `${progressValue}%`;
                        this.progressContainerInterno.style.width = `${progressValue}%`;
                }

                // Calculate the current progress percentage
                calculateProgress() {
                        const contents = this.getAllContents();
                        const totalContents = contents.length;
                        const seenContents = contents.filter(content => content.visto).length;
                        const progress = totalContents > 0 ? (seenContents / totalContents) * 100 : 0;
                        return progress.toFixed(2);
                }
        }
})();
