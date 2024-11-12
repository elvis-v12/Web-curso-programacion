export class CursoComentarios {
        constructor(commentsContainer) {
                this.commentsContainer = commentsContainer;
                this.init();
        }

        init() {
                this.commentInput = document.querySelector('.comentarios__form input');
                this.commentInput.addEventListener('keydown', (event) => this.comentar(event));
        }
        comentar(event) {
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
                const commentElement = document.createElement('li');
                commentElement.className = 'comentario';

                const currentDate = new Date();
                const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

                commentElement.innerHTML = this.comment({
                        photoUser: 'https://duckduckgo.com/i/0c9e953979e827f7.jpg',
                        nameUser: 'Sin nombre',
                        likes: 0,
                        fechaComentario: formattedDate,
                        comeentario: commentText
                });
                const likeButton = commentElement.querySelector('#comentario__option');
                const likeLabel = likeButton.querySelector('label');
                this.eventClickLike(likeButton, likeLabel);
                // Append the new comment to the comments container
                this.commentsContainer.appendChild(commentElement);
        }

        formatMonth(monthNumber) {
                const months = [
                        "enero", "febrero", "marzo", "abril", "mayo", "junio",
                        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
                ];
                return months[monthNumber - 1];
        }

        renderComments(comments = []) {
                this.commentsContainer.innerHTML = '';
                comments.forEach(comment => {
                        const commentElement = this.createCommentElement(comment);
                        this.commentsContainer.appendChild(commentElement);
                });
        }

        createCommentElement(comment) {
                const commentElement = document.createElement('li');
                commentElement.className = 'comentario';
                commentElement.innerHTML = this.comment({
                        photoUser: comment.user.photo,
                        nameUser: comment.user.name,
                        likes: comment.like,
                        fechaComentario: comment.commentDate,
                        comeentario: comment.comment
                });

                // Set up the like button functionality
                const likeButton = commentElement.querySelector('#comentario__option');
                const likeLabel = likeButton.querySelector('label');
                this.eventClickLike(likeButton, likeLabel);

                // Render replies if available
                if (comment.replies && comment.replies.length > 0) {
                        const repliesContainer = document.createElement('ul');
                        repliesContainer.className = 'comentarios__content comentario__reply';
                        comment.replies.forEach(reply => {
                                repliesContainer.appendChild(this.createReplyElement(reply));
                        });
                        commentElement.querySelector('.comentario__right').appendChild(repliesContainer);
                }

                return commentElement;
        }

        createReplyElement(reply) {
                const replyElement = document.createElement('li');
                replyElement.className = 'comentario';
                replyElement.innerHTML = this.comment({
                        photoUser: reply.photo,
                        nameUser: reply.name,
                        likes: reply.like,
                        fechaComentario: reply.commentDate,
                        comeentario: reply.comment
                });

                // Like functionality for replies if needed
                const likeButton = replyElement.querySelector('#comentario__option');
                const likeLabel = likeButton.querySelector('label');
                this.eventClickLike(likeButton, likeLabel);

                return replyElement;
        }

        eventClickLike(likeButton, likeLabel) {
                likeButton.addEventListener('click', () => {
                        if (likeButton.classList.contains('liked')) {
                                likeButton.classList.remove('liked');
                                likeLabel.textContent = parseInt(likeLabel.textContent) - 1;
                        } else {
                                likeButton.classList.add('liked');
                                likeLabel.textContent = parseInt(likeLabel.textContent) + 1;
                        }
                });
        }

        comment = ({ photoUser, nameUser, likes, fechaComentario, comeentario }) => {
                console.log(fechaComentario);

                // Parse the date from the input format (assuming 'yyyy/mm/dd')
                const [year, month, day] = fechaComentario.split('-').map(Number);
                const targetDate = new Date(year, month - 1, day);
                const currentDate = new Date();

                // Calculate time differences
                const yearsDiff = currentDate.getFullYear() - targetDate.getFullYear();
                const monthsDiff = (currentDate.getMonth() - targetDate.getMonth()) + (yearsDiff * 12);
                const daysDiff = Math.floor((currentDate - targetDate) / (1000 * 60 * 60 * 24));

                // Determine the friendly time message
                let comentario__fecha;
                if (yearsDiff >= 1) {
                        comentario__fecha = `hace ${yearsDiff} ${yearsDiff === 1 ? "año" : "años"}`;
                } else if (monthsDiff >= 1) {
                        comentario__fecha = `hace ${monthsDiff} ${monthsDiff === 1 ? "mes" : "meses"}`;
                } else {
                        comentario__fecha = `hace ${daysDiff} ${daysDiff === 1 ? "día" : "días"}`;
                }

                return `
                    <div class="comentario__left">
                        <div class="comentario__avatar"><img src="${photoUser || 'default-avatar.png'}" alt="${nameUser}"></div>
                        <button id="comentario__option">
                            <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#fff" fill-rule="evenodd" d="M12.007 5.688a5.88 5.88 0 0 1 8.019.294 5.923 5.923 0 0 1-.316 8.65l-6.565 5.69c-.657.57-1.633.57-2.29 0l-6.566-5.69a5.923 5.923 0 0 1-.315-8.65 5.88 5.88 0 0 1 8.02-.294l.006.006z" clip-rule="evenodd"></path>
                            </svg>
                            <label for="comentario__like">${likes || 0}</label>
                        </button>
                    </div>
                    <div class="comentario__right">
                        <div class="comentario__content">
                            <header class="comentario__header">
                                <label class="comentario__name">${nameUser}</label>
                                <label class="comentario__fecha">Estudiante • ${comentario__fecha}</label>
                            </header>
                            <div class="comentario__body">${comeentario}</div>
                        </div>
                        <div class="comentario__option">
                            <button>Responder</button>
                            <button>Reportar</button>
                        </div>
                    </div>
                `;
        }

}
