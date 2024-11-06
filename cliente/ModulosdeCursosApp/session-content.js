export class CursoContent {
        constructor(main__left) {
                this.main__left = main__left;
                this.init();
        }

        init() {
                this.videoContainer = this.main__left.querySelector('.curso__content-video');
                this.sessionName = this.main__left.querySelector('.session__name');
                this.publicationDateLabel = this.main__left.querySelector('.session__fecha');
                this.resourcesTab = this.main__left.querySelector("#sessionRecursos");
                this.summaryTab = this.main__left.querySelector("#sessionResumen");
                this.resourcesContainer = this.main__left.querySelector('.session__recursos_content');
        }

        updateDataSession({ name, date, video, recursos, resumen }) {
                const [day, month, year] = date.split('/')
                const monthSelect = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][month - 1];

                this.sessionName.innerHTML = name;
                this.publicationDateLabel.innerHTML = `Publicado el ${day} de ${monthSelect} de ${year}`, date;
                this.videoContainer.innerHTML = this.video({ videoUrl: video });
                this.updateResources(recursos)
                this.actionsTabs({ recursos: recursos, resumen: resumen })
        }

        actionsTabs({ recursos, resumen }) {
                this.resourcesTab.addEventListener("click", () => {
                        this.resourcesTab.classList.add("active");
                        this.summaryTab.classList.remove("active");
                        this.updateResources(recursos)
                });
                this.summaryTab.addEventListener("click", () => {
                        this.summaryTab.classList.add("active");
                        this.resourcesTab.classList.remove("active");
                        this.resourcesContainer.innerHTML = resumen;
                });
        }

        updateResources(recursos) {
                this.resourcesContainer.innerHTML = '';
                recursos.forEach(resource => {
                        const resourceElement = document.createElement('a');
                        resourceElement.href = resource.url;
                        resourceElement.className = 'session__recurso';
                        resourceElement.target = '_blank';
                        resourceElement.innerHTML = this.recurso({ nombre: resource.nombre })
                        this.resourcesContainer.appendChild(resourceElement);
                });
        }

        video = ({ videoUrl }) => {
                return `
                <iframe src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                `;
        }

        recurso = ({ nombre }) => {
                return `
                        <span class="session__recurso_icon">
                                <svg width="1em" height="1em" fill="none" viewBox="0 0 23 22" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#87909D" fill-rule="evenodd" d="M7.833 3.438a3.896 3.896 0 0 0-3.895 3.895v7.334a3.896 3.896 0 0 0 3.895 3.896h7.334a3.896 3.896 0 0 0 3.896-3.896V8.315a3.9 3.9 0 0 0-1.142-2.755l-.981-.981a3.9 3.9 0 0 0-2.755-1.142zm-5.27 3.895a5.27 5.27 0 0 1 5.27-5.27h6.352a5.27 5.27 0 0 1 3.727 1.543l.982.982a5.27 5.27 0 0 1 1.544 3.727v6.352a5.27 5.27 0 0 1-5.271 5.27H7.833a5.27 5.27 0 0 1-5.27-5.27z"clip-rule="evenodd"></path>
                                        <path fill="#87909D" fill-rule="evenodd" d="M14.25 2.063c.38 0 .688.307.688.687V5.5c0 1.14.923 2.063 2.062 2.063h2.75a.687.687 0 1 1 0 1.375H17A3.437 3.437 0 0 1 13.563 5.5V2.75c0-.38.307-.687.687-.687M6.23 8.25c0-.38.307-.687.687-.687h3.666a.687.687 0 1 1 0 1.375H6.917a.687.687 0 0 1-.688-.688m9.853 3.896H6.917a.688.688 0 0 1 0-1.375h9.166a.687.687 0 1 1 0 1.375m-9.854 2.52c0-.379.308-.687.688-.687h9.166a.687.687 0 1 1 0 1.375H6.917a.687.687 0 0 1-.688-.687"clip-rule="evenodd"></path>
                                </svg>
                        </span>
                        <p class="session__recurso_name">${nombre}</p>
                `
        }
}