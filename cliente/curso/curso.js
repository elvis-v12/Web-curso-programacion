import { CursosService } from "../../server/script/service/CursosService.js";
import { CursoComentarios } from "./session-comentarios.js";
import { CursoContent } from "./session-content.js";
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
                        this.cursoComentarios = new CursoComentarios(this.commentsContainer);
                        this.cursoContent = new CursoContent(this.main__left)
                        this.updateProgress();
                        this.updateButtonStates();
                        this.updateSessionInfo();
                        this.updateComments();
                  });
            }

            elements() {
                  this.main__left = document.querySelector('.main__left');
                  this.progress = document.querySelector('.curso__progreso-number');
                  this.progressContainerInterno = document.querySelector('.curso__progreso_barra-interna');
                  this.cursoName = document.querySelector('.curso__name');
                  this.sessionNumber = document.querySelector('.main__header_btn-left span');
                  this.previousButton = document.getElementById('main__header_btn-previous');
                  this.nextButton = document.getElementById('main__header_btn-next');
                  this.commentsContainer = document.querySelector('.comentarios__content');
                  this.commentInput = document.querySelector('.comentarios__form input');
            }

            init() {
                  // nombre curso
                  this.cursoName.innerHTML = this.curso.name;
                  // cambiar sesion
                  this.previousButton.addEventListener('click', () => this.changeSession(-1));
                  this.nextButton.addEventListener('click', () => this.changeSession(1));
                  // btn comentar
            }

            getAllContents() {
                  return this.curso.modules.flatMap(module => module.contenidos);
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
                        this.updateComments();
                  }

            }

            updateSessionInfo() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];
                  this.cursoContent.updateDataSession({
                        name: currentContent.nombre,
                        date: currentContent.fechaPublicacion,
                        video: currentContent.contenido,
                        recursos: currentContent.recursos,
                        resumen: currentContent.resumen
                  })
                  this.getAllContents()
                  this.sessionNumber.textContent = this.currentSessionIndex + 1;
            }

            formatMonth(monthNumber) {
                  const months = [
                        "enero", "febrero", "marzo", "abril", "mayo", "junio",
                        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
                  ];
                  return months[monthNumber - 1];
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

            updateProgress() {
                  const progressValue = this.calculateProgress();
                  this.progress.innerHTML = `${progressValue}%`;
                  this.progressContainerInterno.style.width = `${progressValue}%`;
            }

            calculateProgress() {
                  const contents = this.getAllContents();
                  const totalContents = contents.length;

                  if (this.currentSessionIndex === totalContents - 1) {
                        return 100;
                  } else {
                        const progress = ((this.currentSessionIndex + 1) / totalContents) * 100;
                        return progress.toFixed(2);
                  }
            }

            updateComments() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];

                  this.cursosService.findCommentsByCourseModuleSession({
                        course: this.curso.code,
                        module: currentContent.module,
                        session: currentContent.code,
                  })
                        .then(comments => this.cursoComentarios.renderComments(comments))
                        .catch(error => console.error("Error loading comments:", error));
            }
      }
})();
