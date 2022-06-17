const socket= io('http://localhost:3000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');
// var count=0;
// document.getElementById('count').innerHTML=count;
const counter= document.getElementById("count");
let count=0;
const audio=new Audio('Ting.mp3');
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
  if(position=='left')
  {
    audio.play();
  }
}
form.addEventListener('submit',(e)=>{
     e.preventDefault();
     const message=messageInp.value;
     append(`You: ${message}`,'right');
     socket.emit('send',message);
    messageInp.value='';
})
const name=prompt("Enter Your name to join")
socket.emit('new-user-joined',name);
count++;
 counter.innerHTML=count;
socket.on('user-joined', name=>{
 append(`${name} just joined the chat`,'left');
 count++;
 counter.innerHTML=count;
})
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left')
})
socket.on('user-left',name=>{  
    append(`${name} left the chat`,'left');
    count--;
    counter.innerHTML=count;
})