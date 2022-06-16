const socket= io('http://localhost:3000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}
form.addEventListener('submit',(e)=>{
     e.preventDefault();
     const message=messageInp.value;
     append(`You: ${message}`,'left');
     socket.emit('send',message);

})
const name=prompt("Enter Your name to join")
socket.emit('new-user-joined',name);
socket.on('user-joined', name=>{
 append(`${name} just joined the chat`,'right');
})
socket.on('recieve',data=>{
    append(`${data.users}:${data.message}`,'right')
})