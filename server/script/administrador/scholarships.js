import { UserService } from "../service/UserService.js";
export class ScholarshipsView {
        constructor() {
                this.scholarships = new UserService();
                this.postulanteSeleccionado = "";
                this.init();
        }
        init() {
                this.scholarships__aside_users = document.querySelector('.scholarships__aside_users');
                this.scholarships__name = document.querySelector('#scholarships__name')
                this.scholarships__age = document.querySelector('#scholarships__age')
                this.scholarships__email = document.querySelector('#scholarships__email')
                this.scholarships__avg_programming = document.querySelector('#scholarships__avg_programming')
                this.scholarships__avg_course2 = document.querySelector('#scholarships__avg_course2')
                this.scholarships__country = document.querySelector('#scholarships__country')
                this.btnDarBeca = document.querySelector('#btnDarBeca')
                this.btnDescartarBeca = document.querySelector('#btnDescartarBeca')
                this.mostrarPostulantes();
                this.btnDarBeca.addEventListener('click', () => {
                        alert("Se añadio beca al postulante"); 
                        this.limpiarDatos()
                });
                this.btnDescartarBeca.addEventListener('click', () => {
                        alert("Se descarto beca al postulante"); 
                        this.limpiarDatos()
                })
        }
        async mostrarPostulantes() {
                try {
                        const postulantes = await this.scholarships.findPostulantesBeca();
                        this.scholarships__aside_users.innerHTML = postulantes.map(becado => {
                                return `
                                        <ul class="scholarships__user" id="${becado.code}">
                                                <li class="scholarships__user_data">${becado.gmail}</li>
                                                <li class="scholarships__user_data">${becado.name}</li>
                                        </ul>
                                        `
                        }).join("");
                        const scholarships__user = document.querySelectorAll(".scholarships__user");
                        scholarships__user.forEach(element => {
                                element.addEventListener('click', () => {
                                        let postulante = postulantes.find(p => p.code == element.id)
                                        this.scholarships__name.innerHTML = postulante.name
                                        this.scholarships__age.innerHTML = postulante.age
                                        this.scholarships__email.innerHTML = postulante.gmail
                                        this.scholarships__country.innerHTML = postulante.country
                                        this.scholarships__avg_programming.innerHTML = postulante.avgProgramming
                                        this.scholarships__avg_course2.innerHTML = postulante.avgCourse2
                                        this.postulanteSeleccionado = postulante.code
                                });
                        });

                } catch (error) {
                        console.error("Error al mostrar postulantes:", error);
                }
        }

        limpiarDatos() {
                this.scholarships__name.innerHTML = ""
                this.scholarships__age.innerHTML = ""
                this.scholarships__email.innerHTML = ""
                this.scholarships__country.innerHTML = ""
                this.scholarships__avg_programming.innerHTML = ""
                this.scholarships__avg_course2.innerHTML = ""
                this.postulanteSeleccionado = ""
        }
}