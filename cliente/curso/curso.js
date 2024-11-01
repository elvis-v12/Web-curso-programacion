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
                        this.updateButtonStates();
                        this.updateVideo(); // Initial video load
                  });
            }

            elements() {
                  this.progress = document.querySelector('.curso__progreso-number');
                  this.progressContainerInterno = document.querySelector('.curso__progreso_barra-interna');
                  this.sessionName = document.querySelector('.curso__name');
                  this.sessionNumber = document.querySelector('.main__header_btn-left span');
                  this.previousButton = document.getElementById('main__header_btn-previous');
                  this.nextButton = document.getElementById('main__header_btn-next');
                  this.videoContainer = document.querySelector('.curso__content-video');
            }

            init() {
                  this.previousButton.addEventListener('click', () => this.changeSession(-1));
                  this.nextButton.addEventListener('click', () => this.changeSession(1));
            }

            changeSession(direction) {
                  const contents = this.getAllContents();
                  const newIndex = this.currentSessionIndex + direction;

                  if (newIndex >= 0 && newIndex < contents.length) {
                        this.currentSessionIndex = newIndex;
                        contents[this.currentSessionIndex].visto = true;

                        this.updateSessionInfo();
                        this.updateProgress();
                        this.updateButtonStates();
                        this.updateVideo(); // Update video for the current session
                  }
            }

            updateSessionInfo() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];

                  this.sessionName.textContent = currentContent.nombre;
                  this.sessionNumber.textContent = this.currentSessionIndex + 1;
            }

            updateButtonStates() {
                  const contents = this.getAllContents();

                  if (this.currentSessionIndex === 0) {
                        this.previousButton.disabled = true;
                        this.previousButton.classList.add('boton-desactivado');
                  } else {
                        this.previousButton.disabled = false;
                        this.previousButton.classList.remove('boton-desactivado');
                  }

                  if (this.currentSessionIndex === contents.length - 1) {
                        this.nextButton.disabled = true;
                        this.nextButton.classList.add('boton-desactivado');
                  } else {
                        this.nextButton.disabled = false;
                        this.nextButton.classList.remove('boton-desactivado');
                  }
            }

            getAllContents() {
                  return this.curso.modules.flatMap(module => module.contenidos);
            }

            updateProgress() {
                  const progressValue = this.calculateProgress();
                  this.progress.innerHTML = `${progressValue}%`;
                  this.progressContainerInterno.style.width = `${progressValue}%`;
            }

            calculateProgress() {
                  const contents = this.getAllContents();
                  const totalContents = contents.length;

                  if (this.currentSessionIndex === totalContents - 1) {
                        return 100; // Set to 100% if at the last session
                  } else {
                        const progress = ((this.currentSessionIndex + 1) / totalContents) * 100;
                        return progress.toFixed(2);
                  }
            }

            updateVideo() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];
                  const videoUrl = currentContent.contenido;
                  // Attempt to embed the video
                  this.videoContainer.innerHTML = `
                      <iframe width="100%" height="500" src="${videoUrl.replace("watch?v=", "embed/")}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  `;
            }

      }
})();
