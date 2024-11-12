document.addEventListener("DOMContentLoaded", () => {

   const chatMessages = document.getElementById("chat-messages");
   chatMessages.innerHTML = `
  <div class="waiting-message">
    <img src="https://i.pinimg.com/originals/21/a1/aa/21a1aa2537400d0232efd93e108fd953.gif" alt="Esperando...">
    <p>Esperando...</p>
  </div>
`;

  // Simula conversaciones para cada usuario
  const conversations = {
    "Juan Pérez": [
      { sender: "received", text: "¡Hola! ¿Cómo estás?", time: getCurrentTime() },
      { sender: "sent", text: "Hola, estoy bien. ¿Y tú?", time: getCurrentTime() },
    ],
    "María Rodríguez": [
      { sender: "received", text: "¿Nos vemos mañana?", time: getCurrentTime() },
      { sender: "sent", text: "¡Claro! ¿A qué hora?", time: getCurrentTime() },
    ],
    "Carlos Sánchez": [
      { sender: "received", text: "¿Qué opinas del proyecto?", time: getCurrentTime() },
      { sender: "sent", text: "Creo que va bien, falta definir detalles.", time: getCurrentTime() },
    ],
  };

  let currentChat = ""; // Almacena el chat actual

  // Obtiene la hora actual en formato HH:MM
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Abre el chat de un usuario específico
  function openChat(name) {
    currentChat = name;
    document.getElementById("chat-header").innerText = name;
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = ""; // Limpia el área de mensajes

    conversations[name].forEach((msg) => {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-container");

      const messageElement = document.createElement("div");
      messageElement.classList.add("message", msg.sender);
      messageElement.innerText = msg.text;

      const timestamp = document.createElement("div");
      timestamp.classList.add("timestamp");
      timestamp.innerText = msg.time;

      messageContainer.appendChild(messageElement);
      messageContainer.appendChild(timestamp);
      chatMessages.appendChild(messageContainer);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Envía un mensaje y lo guarda temporalmente
  function sendMessage() {
    const chatInput = document.getElementById("chat-input");
    const messageText = chatInput.value.trim();
    if (messageText === "" || !currentChat) return;

    const chatMessages = document.getElementById("chat-messages");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "sent");
    messageElement.innerText = messageText;

    const timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.innerText = getCurrentTime();

    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timestamp);
    chatMessages.appendChild(messageContainer);
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    conversations[currentChat].push({
      sender: "sent",
      text: messageText,
      time: getCurrentTime(),
    });

    setTimeout(() => {
      const autoMessageContainer = document.createElement("div");
      autoMessageContainer.classList.add("message-container");

      const receivedMessage = document.createElement("div");
      receivedMessage.classList.add("message", "received");
      receivedMessage.innerText = "¡Gracias por tu mensaje!";

      const autoTimestamp = document.createElement("div");
      autoTimestamp.classList.add("timestamp");
      autoTimestamp.innerText = getCurrentTime();

      autoMessageContainer.appendChild(receivedMessage);
      autoMessageContainer.appendChild(autoTimestamp);
      chatMessages.appendChild(autoMessageContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      conversations[currentChat].push({
        sender: "received",
        text: "¡Gracias por tu mensaje!",
        time: getCurrentTime(),
      });
    }, 1000);
  }

  // Manejador del archivo seleccionado
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && currentChat) {
      const chatMessages = document.getElementById("chat-messages");
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-container");

      const messageElement = document.createElement("div");
      messageElement.classList.add("message", "sent");

      // Comprobar si el archivo es una imagen para mostrar la vista previa
      if (file.type.startsWith("image/")) {
        const imagePreview = document.createElement("img");
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.style.maxWidth = "150px";
        imagePreview.style.borderRadius = "10px";
        imagePreview.alt = file.name;

        messageElement.appendChild(imagePreview);
      } else {
        messageElement.innerText = `Archivo adjunto: ${file.name}`;
      }

      const timestamp = document.createElement("div");
      timestamp.classList.add("timestamp");
      timestamp.innerText = getCurrentTime();

      messageContainer.appendChild(messageElement);
      messageContainer.appendChild(timestamp);
      chatMessages.appendChild(messageContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      conversations[currentChat].push({
        sender: "sent",
        text: `Archivo adjunto: ${file.name}`,
        time: getCurrentTime(),
      });
    }
  }

  // Envía mensaje al presionar Enter
  function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
  }

function openChat(name) {
  currentChat = name;

  // Obtiene el elemento de `chat-item` correspondiente
  const selectedChatItem = document.querySelector(
    `.chat-item[onclick="openChat('${name}')"]`
  );

  // Obtiene la imagen de avatar del `chat-item` seleccionado
  const avatarSrc = selectedChatItem.querySelector("img").src;

  // Configurar la cabecera del chat con la imagen, el nombre y el indicador de estado
  const chatHeader = document.getElementById("chat-header");
  chatHeader.innerHTML = `
  <div class="chat-header-content">
    <img src="${avatarSrc}" alt="Avatar" class="chat-avatar">
    <span class="chat-name">${name}</span>
    <span class="status-indicator"></span>
  </div>
`;

  // Limpia y muestra los mensajes del chat seleccionado
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = "";

  conversations[name].forEach((msg) => {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", msg.sender);
    messageElement.innerText = msg.text;

    const timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.innerText = msg.time;

    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timestamp);
    chatMessages.appendChild(messageContainer);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

  // Asignación de funciones al objeto `window` para acceso global
  window.openChat = openChat;
  window.sendMessage = sendMessage;
  window.handleFileSelect = handleFileSelect;
  window.handleKeyPress = handleKeyPress;

  
});
