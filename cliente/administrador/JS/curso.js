import { CursosService } from "./CursosService.js";
(() => {
    document.addEventListener('DOMContentLoaded', async () => {
        new CursoView()

    });
    class CursoView {
        cursoService = new CursosService();
        constructor(curso) {
            this.cursoService.findById({ code: "CUR001" }).then(dataCourse => {
                this.renderModules(dataCourse.modules);
            })
            this.curso = curso;
            this.elements();
            this.init();
        }
        elements() {
            this.courses = () => document.querySelector("#courses");
            this.coursesHeader = () => document.querySelector(".courses__header");
            this.coursesContent = () => document.querySelector(".courses__content");
            // courseEdit
            this.coursesEdit = () => document.querySelector("#coursesEdit");
            this.coursesEditTab = () => document.querySelector(".coursesEdit_tabs");
            this.coursesEditTabItem = () => document.querySelectorAll(".coursesEdit_tabs__item");
            this.coursesEditTabItemInactive = () => [...document.querySelectorAll(".coursesEdit_tabs__item")].find(tab => !tab.classList.contains('active'));
            this.coursesEditTabItemActive = () => document.querySelector(".coursesEdit_tabs__item.active");
            this.moduleContainer = () => document.querySelector(".module-items");
            // btnEditorOptionStyle
            this.btnEditorOptionStyleBold = () => document.querySelectorAll(".btn-bold");
            this.btnEditorOptionStyleList = () => document.querySelectorAll(".btn-list");
            this.btnEditorOptionStyleListOrdered = () => document.querySelectorAll(".btn-list-ordered");
            this.btncoursesEditCursos = () => document.querySelectorAll(".courses__item_option");
            // FormCourseContent
            this.formCourseContent = () => document.querySelector(".form-course-content");
            this.formCourseName = () => document.querySelector("#course-name");
            this.formCoursePrice = () => document.querySelector("#course-price");
            this.formCourseLanguage = () => document.querySelector("#course-language");
            this.formCourseDescription = () => document.querySelector("#course-description");
            this.formCourseSummary = () => document.querySelector("#course-summary");
            this.formCourseDetails = () => document.querySelector("#course-details");
            this.btnSaveContentCourse = () => document.querySelector(".form-options-content-menu button")
            // sections
            this.cousesEditSections = () => document.querySelectorAll(".coursesEdit__content");
            this.coursesEditContent = () => document.querySelector(".coursesEdit__content-contenido");
            this.coursesEditDatos = () => document.querySelector("coursesEdit__content-datos");
            // Sesiones
            this.coursesEditSesionName = () => document.querySelector("#session-name");
            this.coursesEditSesionDescription = () => document.querySelector("#session-description");
            this.coursesEditSesionContent = () => document.querySelector("#session-content");
            this.coursesEditSesionPortada = () => document.querySelector("#session-cover");
            this.coursesEditSesionSave = () => document.querySelector(".form-options-content-menu button");
        }

        init() {
            this.renderCourses().then(() => {
                this.btncoursesEditCursos().forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.courses().classList.remove('active');
                        this.coursesEdit().classList.add('active')
                    })
                })
            });
            // click en tab
            this.coursesEditTabItem().forEach(tab => {
                tab.addEventListener('click', (e) => {
                    // Remover la clase 'active' de la tab actualmente activa
                    this.coursesEditTabItemActive().classList.remove('active');
                    // Agregar la clase 'active' a la tab seleccionada
                    e.currentTarget.classList.add('active');

                    // Obtener la clase única de la tab seleccionada (por ejemplo: 'coursesEdit-1' o 'coursesEdit-2')
                    const selectedTabClass = Array.from(e.currentTarget.classList).find(cls => cls.startsWith('coursesEdit-'));

                    // Mostrar u ocultar las secciones correspondientes
                    this.cousesEditSections().forEach(sect => {
                        // Si la sección tiene la misma clase que la tab seleccionada, se muestra; de lo contrario, se oculta
                        if (sect.classList.contains(selectedTabClass)) {
                            sect.style.visibility = 'visible';
                            sect.style.display = 'block';
                        } else {
                            sect.style.visibility = 'hidden';
                            sect.style.display = 'none';
                        }
                    });
                });
            });

            this.contenCourses()
            const recursosContainer = document.querySelector('.session-edit-resources');
            recursosContainer.innerHTML = '<label>Recursos de la Sesión</label>';
            const addResourceButton = document.createElement('button');
            addResourceButton.classList.add('btn-add-resource');
            addResourceButton.textContent = 'Agregar Recurso';
            addResourceButton.addEventListener('click', () => this.addNewResource(recursosContainer));

            recursosContainer.appendChild(addResourceButton);
        }

        async renderCourses(cursos = null) {
            const cursosNovedades = cursos || await this.cursoService.findCoursesNovedades() || [];

            cursosNovedades.forEach(curso => {
                this.coursesContent().innerHTML += cursoTemplade(curso);
            });

        }
        
        contenCourses() {
            this.btnEditorOptionStyleBold().forEach(btn => {
                btn.addEventListener('click', e => {
                    document.execCommand('bold');
                });
            })
            var list = false;
            this.btnEditorOptionStyleList().forEach(btn => {
                btn.addEventListener('click', e => {

                    if (list) {
                        document.execCommand('formatBlock', false, 'p');
                    } else {
                        document.execCommand('insertUnorderedList', false, true);
                    }
                    list = !list;
                });
            })
            this.btnEditorOptionStyleListOrdered().forEach(btn => {
                btn.addEventListener('click', e => {
                    if (list) {
                        document.execCommand('formatBlock', false, 'p');
                    } else {
                        document.execCommand('insertOrderedList', false, true);
                    }
                    list = !list;
                });
            })
            this.btnSaveContentCourse().addEventListener('click', (e) => {
                e.preventDefault();
                const dataForm = {
                    "name": this.formCourseName().value,
                    "price": this.formCoursePrice().value,
                    "language": this.formCourseLanguage().value,
                    "description": this.formCourseDescription().innerHTML,
                    "summary": this.formCourseSummary().innerHTML,
                    "details": this.formCourseDetails().innerHTML,
                }
                console.table(dataForm);
                console.log("Datos del formulario JSON:", JSON.stringify(dataForm, null, 2));
            })
        }

        renderModules(modules) {
            console.log(modules);
            // Limpiar el contenedor de módulos
            this.moduleContainer().innerHTML = "";

            modules.forEach((module) => {
                // Crear elemento de módulo
                const moduleElement = document.createElement("li");
                moduleElement.classList.add("module-item");

                // Agregar título del módulo
                const moduleTitle = document.createElement("span");
                moduleTitle.textContent = module.name;
                moduleElement.appendChild(moduleTitle);

                // Botón de editar módulo
                const btnEditModule = document.createElement("button");
                btnEditModule.classList.add("btn-edit-module");
                btnEditModule.textContent = "Editar Módulo";
                btnEditModule.addEventListener("click", () => this.updateEditModule(module));
                moduleElement.appendChild(btnEditModule);

                // Botón de eliminar módulo
                const btnDeleteModule = document.createElement("button");
                btnDeleteModule.classList.add("btn-delete-module");
                btnDeleteModule.textContent = "Eliminar Módulo";
                btnDeleteModule.addEventListener("click", () => this.deleteModule(module));
                moduleElement.appendChild(btnDeleteModule);

                // Crear lista de sesiones
                const sessionList = document.createElement("ul");
                sessionList.classList.add("session-items");
                this.renderSessions(module.contenidos, sessionList);
                moduleElement.appendChild(sessionList);

                // Botón de agregar sesión
                const addSessionItem = document.createElement("li");
                addSessionItem.classList.add("add-session-item");
                const btnAddSession = document.createElement("button");
                btnAddSession.classList.add("btn-add-session");
                btnAddSession.textContent = "Agregar Nueva Sesión";
                btnAddSession.addEventListener("click", () => this.addSession(module));
                addSessionItem.appendChild(btnAddSession);
                sessionList.appendChild(addSessionItem);

                // Agregar el módulo al contenedor
                this.moduleContainer().appendChild(moduleElement);
            });

            // Añadir el botón para agregar nuevo módulo
            const addModuleButton = document.createElement("li");
            addModuleButton.classList.add("add-module-item");
            const btnAddModule = document.createElement("button");
            btnAddModule.classList.add("btn-add-module");
            btnAddModule.textContent = "Agregar Nuevo Módulo";
            btnAddModule.addEventListener("click", () => this.addModule());
            addModuleButton.appendChild(btnAddModule);
            this.moduleContainer().appendChild(addModuleButton);
        }

        renderSessions(sessions, sessionList) {
            sessions.forEach(session => {
                const sessionItem = document.createElement("li");
                sessionItem.classList.add("session-item");

                // Nombre de la sesión
                const sessionName = document.createElement("span");
                sessionName.textContent = session.nombre;
                sessionItem.appendChild(sessionName);

                // Botón de editar sesión
                const btnEditSession = document.createElement("button");
                btnEditSession.classList.add("btn-edit-session");
                btnEditSession.textContent = "Editar Sesión";
                btnEditSession.addEventListener("click", () => this.updateEditSesion(session));
                sessionItem.appendChild(btnEditSession);

                // Botón de eliminar sesión
                const btnDeleteSession = document.createElement("button");
                btnDeleteSession.classList.add("btn-delete-session");
                btnDeleteSession.textContent = "Eliminar Sesión";
                btnDeleteSession.addEventListener("click", () => this.deleteEditSesion(session));
                sessionItem.appendChild(btnDeleteSession);

                // Agregar cada sesión al contenedor de sesiones
                sessionList.appendChild(sessionItem);
            });
        }

        updateEditSesion({ code = '', nombre = '', descripcion = '', contenido = '', recursos = [] }) {
            // Asignar los valores de la sesión al formulario
            this.coursesEditSesionName().value = nombre;
            this.coursesEditSesionDescription().innerHTML = descripcion;
            this.coursesEditSesionContent().value = contenido;
            this.coursesEditSesionPortada().value = "";

            // Limpiar los recursos actuales
            const recursosContainer = document.querySelector('.session-edit-resources');
            recursosContainer.innerHTML = '<label>Recursos de la Sesión</label>';

            // Renderizar los recursos si existen, o dejar el botón "Agregar Recurso"
            if (recursos.length > 0) {
                recursos.forEach(recurso => {
                    this.renderResource(recursosContainer, recurso.nombre, recurso.descripcion, recurso.url);
                });
            }

            // Botón de agregar recurso para nuevas sesiones o añadir más recursos
            const addResourceButton = document.createElement('button');
            addResourceButton.classList.add('btn-add-resource');
            addResourceButton.textContent = 'Agregar Recurso';
            addResourceButton.addEventListener('click', () => this.addNewResource(recursosContainer));

            recursosContainer.appendChild(addResourceButton);
        }

        // Método para crear un recurso nuevo vacío
        addNewResource(recursosContainer) {
            this.renderResource(recursosContainer);
        }

        // Método para renderizar un recurso con input de archivo y opciones de descripción
        renderResource(container, nombre = '', descripcion = '', fileUrl = '') {
            const recursoDiv = document.createElement('div');
            recursoDiv.classList.add('module-data__field');

            // Campo de nombre del recurso
            const inputNombre = document.createElement('input');
            inputNombre.type = 'text';
            inputNombre.value = nombre;
            inputNombre.placeholder = 'Nombre del recurso';
            inputNombre.required = true;

            // Campo de descripción del recurso
            const descripcionDiv = document.createElement('div');
            descripcionDiv.classList.add('editable-field');
            descripcionDiv.contentEditable = true;
            descripcionDiv.innerHTML = descripcion || 'Descripción del recurso';

            // Input para el archivo
            const inputFile = document.createElement('input');
            inputFile.type = 'file';
            inputFile.accept = '*';
            inputFile.multiple = false;

            // Mostrar URL si el archivo ya existe (solo en edición)
            if (fileUrl) {
                const fileLink = document.createElement('a');
                fileLink.href = fileUrl;
                fileLink.target = '_blank';
                fileLink.textContent = 'nombre';
                recursoDiv.appendChild(fileLink);
            }

            // Botón de eliminar recurso
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn-delete-resource');
            deleteButton.textContent = 'Eliminar Recurso';
            deleteButton.addEventListener('click', () => recursoDiv.remove());

            // Añadir elementos al contenedor de recurso
            recursoDiv.append(inputNombre, descripcionDiv, inputFile, deleteButton);
            container.insertBefore(recursoDiv, container.querySelector('.btn-add-resource'));
        }

        deleteEditSesion({ code }) {
            alert(code)
        }
    }

    const cursoTemplade = ({ name, code, portada, author, price, language }) => `
    <article class="courses__item" id="course-${code}">
        <img src="${portada}" alt="${name}">
        <h3 class="courses__item_title">${name}</h3>
        <div class="courses__item_data">
            <p>Autor: ${author}</p>
            <p>Precio: S/.${price}</p>
            <p>Idioma: ${language}</p>
        </div>
        <div class="courses__item_options">
            <button class="courses__item_option" id="btn-curso-${code}">Editar Curso</button>
        </div>
    </article>
  `;

})();
