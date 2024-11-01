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
                        this.updateVideo();
                        this.updateResources();
                        this.updatePublicationDate();
                        this.updateComments();
                  });
            }

            elements() {
                  this.progress = document.querySelector('.curso__progreso-number');
                  this.progressContainerInterno = document.querySelector('.curso__progreso_barra-interna');
                  this.cursoName = document.querySelector('.curso__name');
                  this.sessionName = document.querySelector('.session__name');
                  this.sessionNumber = document.querySelector('.main__header_btn-left span');
                  this.previousButton = document.getElementById('main__header_btn-previous');
                  this.nextButton = document.getElementById('main__header_btn-next');
                  this.videoContainer = document.querySelector('.curso__content-video');
                  this.resourcesContainer = document.querySelector('.session__recursos_content');
                  this.publicationDateLabel = document.querySelector('.session__fecha');
                  this.commentsContainer = document.querySelector('.comentarios__content');
                  this.commentInput = document.querySelector('.comentarios__form input');
                  this.resourcesTab = document.getElementById("sessionRecursos");
                  this.summaryTab = document.getElementById("sessionResumen");
            }

            init() {
                  this.cursoName.innerHTML = this.curso.name;
                  this.previousButton.addEventListener('click', () => this.changeSession(-1));
                  this.nextButton.addEventListener('click', () => this.changeSession(1));
                  this.commentInput.addEventListener('keydown', (event) => this.handleCommentSubmit(event));
                  this.resourcesTab.addEventListener("click", () => this.showResources());
                  this.summaryTab.addEventListener("click", () => this.showSummary());
            }
            // evento del input para comentario
            handleCommentSubmit(event) {
                  if (event.key === 'Enter') {
                        event.preventDefault(); // Prevent the default form submission
                        const commentText = this.commentInput.value.trim();

                        if (commentText) {
                              this.addComment(commentText);
                              this.commentInput.value = ''; // Clear the input after submission
                        }
                  }
            }
            addComment(commentText) {
                  // Example of creating a new comment element in the UI
                  const commentElement = document.createElement('article');
                  commentElement.className = 'comentario';

                  // Define comment content with dummy user data and current date for simplicity
                  const date = new Date();
                  const formattedDate = `${date.getDate()} de ${this.formatMonth(date.getMonth() + 1)} de ${date.getFullYear()}`;

                  commentElement.innerHTML = `
                      <header class="comentario__header">
                          <span class="comentario__user-name">Usuario</span>
                          <span class="comentario__date">${formattedDate}</span>
                      </header>
                      <div class="comentario__body">
                          <p class="comentario__text">${commentText}</p>
                      </div>
                  `;

                  // Append the new comment to the comments container
                  this.commentsContainer.appendChild(commentElement);
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
                        this.updateVideo();
                        this.updateResources();
                        this.updatePublicationDate();
                        this.updateComments(); // Update date for the current session
                  }
            }

            updateSessionInfo() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];

                  this.sessionName.textContent = currentContent.nombre;
                  this.sessionNumber.textContent = this.currentSessionIndex + 1;
            }

            async updateComments() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];

                  try {
                        const comments = await this.cursosService.findCommentsByCourseModuleSession({
                              course: this.curso.code,
                              session: currentContent.code
                        });

                        // Clear the existing comments
                        this.commentsContainer.innerHTML = '';

                        // Generate HTML for each comment and append to the container
                        comments.forEach(comment => {
                              const commentElement = this.createCommentElement(comment);
                              this.commentsContainer.appendChild(commentElement);
                        });
                  } catch (error) {
                        console.error("Error al cargar los comentarios:", error);
                  }
            }

            formatMonth(monthNumber) {
                  const months = [
                        "enero", "febrero", "marzo", "abril", "mayo", "junio",
                        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
                  ];
                  return months[monthNumber - 1];
            }

            createCommentElement(comment) {
                  const commentElement = document.createElement('article');
                  commentElement.className = 'comentario';

                  // Comment header
                  const header = document.createElement('header');
                  header.className = 'comentario__header';
                  header.innerHTML = `
                      <span class="comentario__user-name">${comment.user.name}</span>
                      <span class="comentario__date">${formatDate(comment.commentDate)}</span>
                  `;

                  // Comment body
                  const body = document.createElement('div');
                  body.className = 'comentario__body';
                  body.innerHTML = `<p class="comentario__text">${comment.comment}</p>`;

                  // Append header and body to the comment element
                  commentElement.appendChild(header);
                  commentElement.appendChild(body);

                  // Replies section, if any
                  if (comment.replies && comment.replies.length > 0) {
                        const repliesSection = document.createElement('section');
                        repliesSection.className = 'comentario__replies';

                        comment.replies.forEach(reply => {
                              const replyElement = this.createReplyElement(reply);
                              repliesSection.appendChild(replyElement);
                        });

                        commentElement.appendChild(repliesSection);
                  }

                  return commentElement;
            }

            createReplyElement(reply) {
                  const replyElement = document.createElement('article');
                  replyElement.className = 'comentario__reply';

                  // Reply header
                  const header = document.createElement('header');
                  header.className = 'comentario__reply-header';
                  header.innerHTML = `
                      <span class="comentario__reply-user-name">${reply.name}</span>
                      <span class="comentario__reply-date">${formatDate(reply.commentDate)}</span>
                  `;

                  // Reply body
                  const body = document.createElement('div');
                  body.className = 'comentario__reply-body';
                  body.innerHTML = `<p class="comentario__reply-text">${reply.comment}</p>`;

                  replyElement.appendChild(header);
                  replyElement.appendChild(body);

                  return replyElement;
            }

            // Method to format and update the publication date
            updatePublicationDate() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];
                  const formattedDate = this.formatDate(currentContent.fechaPublicacion);
                  this.publicationDateLabel.textContent = `Publicado el ${formattedDate}`;
            }

            // Helper function to convert date to "DD de [month name] de YYYY"
            formatDate(dateStr) {
                  const [day, month, year] = dateStr.split('/');
                  const monthNames = [
                        "enero", "febrero", "marzo", "abril", "mayo", "junio",
                        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
                  ];
                  const monthName = monthNames[parseInt(month, 10) - 1];
                  return `${day} de ${monthName} de ${year}`;
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
                        return 100;
                  } else {
                        const progress = ((this.currentSessionIndex + 1) / totalContents) * 100;
                        return progress.toFixed(2);
                  }
            }

            updateVideo() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];
                  const videoUrl = currentContent.contenido;

                  this.videoContainer.innerHTML = `
                <iframe src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            `;
            }

            updateResources() {
                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];
                  this.resourcesContainer.innerHTML = '';



                  currentContent.recursos.forEach(resource => {
                        const resourceElement = document.createElement('a');
                        resourceElement.href = resource.url;
                        resourceElement.className = 'session__recurso';
                        resourceElement.target = '_blank';

                        resourceElement.innerHTML = `
                    <span class="session__recurso_icon">
                        <svg width="1em" height="1em" fill="none" viewBox="0 0 23 22" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#87909D" fill-rule="evenodd"
                                d="M7.833 3.438a3.896 3.896 0 0 0-3.895 3.895v7.334a3.896 3.896 0 0 0 3.895 3.896h7.334a3.896 3.896 0 0 0 3.896-3.896V8.315a3.9 3.9 0 0 0-1.142-2.755l-.981-.981a3.9 3.9 0 0 0-2.755-1.142zm-5.27 3.895a5.27 5.27 0 0 1 5.27-5.27h6.352a5.27 5.27 0 0 1 3.727 1.543l.982.982a5.27 5.27 0 0 1 1.544 3.727v6.352a5.27 5.27 0 0 1-5.271 5.27H7.833a5.27 5.27 0 0 1-5.27-5.27z"
                                clip-rule="evenodd"></path>
                            <path fill="#87909D" fill-rule="evenodd"
                                d="M14.25 2.063c.38 0 .688.307.688.687V5.5c0 1.14.923 2.063 2.062 2.063h2.75a.687.687 0 1 1 0 1.375H17A3.437 3.437 0 0 1 13.563 5.5V2.75c0-.38.307-.687.687-.687M6.23 8.25c0-.38.307-.687.687-.687h3.666a.687.687 0 1 1 0 1.375H6.917a.687.687 0 0 1-.688-.688m9.853 3.896H6.917a.688.688 0 0 1 0-1.375h9.166a.687.687 0 1 1 0 1.375m-9.854 2.52c0-.379.308-.687.688-.687h9.166a.687.687 0 1 1 0 1.375H6.917a.687.687 0 0 1-.688-.687"
                                clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <p class="session__recurso_name">${resource.nombre}</p>
                `;

                        this.resourcesContainer.appendChild(resourceElement);
                  });
            }

            showResources() {
                  this.resourcesTab.classList.add("active");
                  this.summaryTab.classList.remove("active");

                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];

                  // Populate with resources
                  this.resourcesContainer.innerHTML = '';
                  currentContent.recursos.forEach(resource => {
                        const resourceElement = document.createElement('a');
                        resourceElement.href = resource.url;
                        resourceElement.className = 'session__recurso';
                        resourceElement.target = '_blank';
                        resourceElement.innerHTML = `
                          <span class="session__recurso_icon">
                              <svg width="1em" height="1em" fill="none" viewBox="0 0 23 22" xmlns="http://www.w3.org/2000/svg">
                                  <path fill="#87909D" fill-rule="evenodd" 
                                      d="M7.833 3.438a3.896 3.896 0 0 0-3.895 3.895v7.334a3.896 3.896 0 0 0 3.895 3.896h7.334a3.896 3.896 0 0 0 3.896-3.896V8.315a3.9 3.9 0 0 0-1.142-2.755l-.981-.981a3.9 3.9 0 0 0-2.755-1.142zm-5.27 3.895a5.27 5.27 0 0 1 5.27-5.27h6.352a5.27 5.27 0 0 1 3.727 1.543l.982.982a5.27 5.27 0 0 1 1.544 3.727v6.352a5.27 5.27 0 0 1-5.271 5.27H7.833a5.27 5.27 0 0 1-5.27-5.27z"
                                      clip-rule="evenodd"></path>
                                  <path fill="#87909D" fill-rule="evenodd" 
                                      d="M14.25 2.063c.38 0 .688.307.688.687V5.5c0 1.14.923 2.063 2.062 2.063h2.75a.687.687 0 1 1 0 1.375H17A3.437 3.437 0 0 1 13.563 5.5V2.75c0-.38.307-.687.687-.687M6.23 8.25c0-.38.307-.687.687-.687h3.666a.687.687 0 1 1 0 1.375H6.917a.687.687 0 0 1-.688-.688m9.853 3.896H6.917a.688.688 0 0 1 0-1.375h9.166a.687.687 0 1 1 0 1.375m-9.854 2.52c0-.379.308-.687.688-.687h9.166a.687.687 0 1 1 0 1.375H6.917a.687.687 0 0 1-.688-.687"
                                      clip-rule="evenodd"></path>
                              </svg>
                          </span>
                          <p class="session__recurso_name">${resource.nombre}</p>
                      `;
                        this.resourcesContainer.appendChild(resourceElement);
                  });
            }
            showSummary() {
                  this.summaryTab.classList.add("active");
                  this.resourcesTab.classList.remove("active");

                  const contents = this.getAllContents();
                  const currentContent = contents[this.currentSessionIndex];
                  console.log(currentContent);


                  // Populate with summary
                  this.resourcesContainer.innerHTML = currentContent.resumen;
            }
      }
      function formatDate(dateString) {
            const months = [
                  "enero", "febrero", "marzo", "abril", "mayo", "junio",
                  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ];

            // Parse the date string
            const [year, month, day] = dateString.split("-");

            // Get the month name
            const monthName = months[parseInt(month, 10) - 1];

            // Return formatted date
            return `${parseInt(day)} de ${monthName} de ${year}`;
      }

      // Example usage
      const formattedDate = formatDate("2023-11-07");

})();
