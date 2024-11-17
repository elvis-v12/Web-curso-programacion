(() => {
        const cursosRecomendadosHTML = () => document.querySelector('#cursos-recomendados');
        const cursosMejoresHTML = () => document.querySelector('#cursos-mejores');
        const cursosRecientesHTML = () => document.querySelector('#cursos-recientes');
        const cursosCompletarHTML = () => document.querySelector('#cursos-completar');
        const cursosCompletadosHTML = () => document.querySelector('#cursos-completados-cont');
        //metodos de peticiones
        const addCursos = async (content, url, formato) => {
                const response = await fetch(url);
                if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status}`);
                }
                const cursos = await response.json();
                cursos.map(c => {
                        content.innerHTML += formato(c)

                })
        }

        const curso = ({ titulo, portada, rating, nombre_completo, }) => `
        <div class="Carousel_Carousel__6ZR3n">
                <div class="CarouselScroll_CarouselScroll__FU24g CarouselSlider_CarouselSlider__E4UdA SchoolCourses_SchoolCourses__Carousel__xetTv" data-status="start">
                        <section class="CarouselScroll_CarouselScroll__container__ILxwV" data-id="CarouselScroll__container">
                                <div class="CarouselScroll_CarouselScroll__Item__2e_zd CarouselScroll_CarouselScroll__" data-id="CarouselScroll__Item">
                                        <div class="Card_Card__02zp3 CourseCard_CourseCard__YJbyz">
                                                <div class="Card_Card__Media__yCwF8">
                                                        <div class="CourseCard_CourseCard__Media__bwj__">
                                                                <div class="CardWatcher_CardWatcher__Ry9Ac"></div>
                                                                        <div class="CardImage_CourseImage__avHfJ">
                                                                                <img alt="${titulo}" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" class="CardImage_CourseImage__Image__V8JXq" src="${portada}" style="color: transparent;">
                                                                        </div>
                                                                        <div class="Ranking_Ranking__tg2fc">
                                                                                <span>
                                                                                        <svg width="1em" height="1em" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path fill="#E9C958" fill-rule="evenodd" d="M8 1.5c-.434 0-.833.242-1.034.627L5.382 5.162l-2.908.49a1.167 1.167 0 0 0-.64 1.967l2.173 2.215-.494 3.327a1.167 1.167 0 0 0 1.674 1.216L8 12.977l2.814 1.4a1.167 1.167 0 0 0 1.673-1.216l-.494-3.327 2.173-2.215a1.167 1.167 0 0 0-.64-1.967l-2.908-.49-1.583-3.035A1.17 1.17 0 0 0 8 1.5" clip-rule="evenodd"></path>
                                                                                        </svg>
                                                                                </span>
                                                                                <span class="Ranking_Ranking__Stars__DFN2x">${rating}</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div class="Card_Card__Info__Q2g_1">
                                                                <div>
                                                                        <div class="CourseCard_CourseCard__Shield__s54_C">
                                                                                <img alt="Curso Gratis de Estrategias para Aprender Inglés en Línea" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" srcset="https://static.platzi.com/media/achievements/aprender-ingles-online_badge-8a97002a-7427-4e19-862b-b155e9a57c25.png 1x, https://static.platzi.com/media/achievements/aprender-ingles-online_badge-8a97002a-7427-4e19-862b-b155e9a57c25.png 2x" src="https://static.platzi.com/media/achievements/aprender-ingles-online_badge-8a97002a-7427-4e19-862b-b155e9a57c25.png" style="color: transparent;">
                                                                        </div>
                                                                </div>
                                                                <div class="Card_Card__Detail__mJGEc">
                                                                <div class="CourseCard_CourseCard__Detail__elSrc">
                                                                        <h4 class="CourseCard_CourseCard__Title__LXNxo">${titulo}</h4>
                                                                        <span class="CourseCard_CourseCard__Teachers__mNpqd">Desarrollado por: ${nombre_completo}</span>
                                                                </div>
                                                        </div>
                                                </div>
                                                <!-- Botones Movidos Aquí -->
                                                <div class="Card_Card__Buttons__Container">
                                                        <button class="Button Button--primary Button--md ButtonAddCourse_ButtonAddCourse__sR_Xi"> Ir al curso 
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" width="1em" height="1em">
                                                                        <path fill="currentColor" fill-rule="evenodd" d="M3.896 11c0-.38.308-.687.687-.687h12.834a.687.687 0 1 1 0 1.374H4.583A.69.69 0 0 1 3.896 11" clip-rule="evenodd"></path>
                                                                        <path fill="currentColor" fill-rule="evenodd" d="M17.903 10.514a.69.69 0 0 1 0 .972l-4.584 4.583a.688.688 0 0 1-.972-.972l4.583-4.583a.69.69 0 0 1 .973 0" clip-rule="evenodd"></path>
                                                                        <path fill="currentColor" fill-rule="evenodd" d="M12.347 5.93a.69.69 0 0 1 .972 0l4.584 4.584a.688.688 0 1 1-.973.972l-4.583-4.583a.687.687 0 0 1 0-.973" clip-rule="evenodd"></path>
                                                                </svg>
                                                        </button>
                                                        <button class="Button Button--unstyle Button--md ButtonAddCourse_ButtonAddCourse__sR_Xi">Agregar
                                                                <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill="#13161C" fill-rule="evenodd" d="M12 7.25a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75" clip-rule="evenodd"></path>
                                                                        <path fill="#13161C" fill-rule="evenodd" d="M7.25 12a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75" clip-rule="evenodd"></path>
                                                                        <path fill="#13161C" fill-rule="evenodd" d="M12 3.75A8.25 8.25 0 0 0 3.75 12 8.25 8.25 0 0 0 12 20.25 8.25 8.25 0 0 0 20.25 12 8.25 8.25 0 0 0 12 3.75m0-1.5A9.75 9.75 0 0 0 2.25 12 9.75 9.75 0 0 0 12 21.75 9.75 9.75 0 0 0 21.75 12 9.75 9.75 0 0 0 12 2.25" clip-rule="evenodd"></path>
                                                                </svg>
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </div>
        </div>
        `;

        const cursoCompletar = ({ titulo, portada, descripcion, progreso }) => `
                        <div class="curso-card">
                            <img src="${portada}"alt="${titulo}" class="curso-imagen">
                            <h4>${titulo}</h4>
                            <p class="curso-descripcion">${descripcion}</p>
                            <div class="curso-avance">
                                <span>Avance:</span>
                                <div class="barra-avance">
                                    <div class="porcentaje" style="width: ${progreso}%;"></div>
                                </div>
                                <span>${progreso}%</span>
                            </div>
                        </div>
        `;

        const cursoCompleto = ({ titulo, portada, descripcion, nota, porcentaje }) => `
                <div class="curso-completado-card">
                    <img src="${portada}"alt="${titulo}" class="curso-imagen">
                    <h4>${titulo}</h4>
                    <p class="curso-descripcion">${descripcion}</p>
                    <div class="curso-calificacion">Calificación: <span>${nota}</span></div>
                    <div class="barra-avance">
                        <div class="porcentaje" style="width: ${porcentaje}%;"></div>
                    </div>
                </div>
        `;

        addCursos(cursosRecomendadosHTML(), 'http://localhost:3000/api/cursos-recomendados', curso);
        addCursos(cursosMejoresHTML(), 'http://localhost:3000/api/cursos-mejores', curso);
        addCursos(cursosRecientesHTML(), 'http://localhost:3000/api/cursos-recientes', curso);
        addCursos(cursosCompletarHTML(), 'http://localhost:3000/api/cursos-incompletos?user=1', cursoCompletar);
        addCursos(cursosCompletadosHTML(), 'http://localhost:3000/api/cursos-completos?user=1', cursoCompleto);
        

})();