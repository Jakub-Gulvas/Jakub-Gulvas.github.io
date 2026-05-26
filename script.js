const button=document.getElementById("loveButton");
const message=document.getElementById("message");

button.addEventListener("click",()=>{

message.innerHTML=
"❤️ To ma potešilo ❤️";

let subject="Julca klikla na tlačidlo";
let body="Ahoj Jakub, Julca klikla na tlačidlo: Chcem ťa vidieť ešte niekedy ❤️";

window.location.href=
`mailto:jakub.gulvas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

});