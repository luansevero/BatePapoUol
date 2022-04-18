const username = () => document.querySelector(`.username`).value;
function register(element){//Função para entrar no Bate-Papo
    registerLoading(element)
    const registerPromess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants `, { name : username()});
    registerPromess.then(registrationSucess);
    registerPromess.catch(reloadPage);
}
function registerLoading(el){//Layout Loading
    el.parentNode.classList.remove(`active`);
    document.querySelector(`.loading`).classList.add(`active`);
}
function registrationSucess(){//Then - register API
    document.querySelector(`.body`).classList.remove(`active`);
    participantsList()
    chatMgs()
    allIntervals()
}
function allIntervals(){ //Começar todos intervalos do Bate-Papo
    setInterval(keepConection, 4000);
    setInterval(participantsList, 10000);
    setInterval(chatMgs, 3000);
}
function keepConection(){ //ManterConexão com Api
    const connectionpromess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, { name : username()});
    connectionpromess.catch(reloadPage);
}
function participantsList(){ //Função para carregar os participantes online
    const listPromess = axios("https://mock-api.driven.com.br/api/v6/uol/participants");
    listPromess.then(createList);
}
function createList(list){ //Then - registar usuários online
    const contact = list.data;
    let ul = document.querySelector(`.participants-list`);
    ul.innerHTML = "";
    for(let i = 0; i < contact.length; i++){
        if(username() != contact[i].name){
            const contactOn = contact[i];
            ul.innerHTML += contactOnlineLi(contactOn);
        }
    }
}
function contactOnlineLi(contactOn){ //Cria as li dos usuários online
    return `
    <li class="contact" onclick="msgFor(this)">
        <div class="contact-container">
            <ion-icon class="iconPerson" name="person-circle"></ion-icon>
            <p class="contact-name">${contactOn.name}</p>
        </div>
        <ion-icon class="checkmark" name="checkmark-sharp"></ion-icon>
    </li>
    `;
}
function openSideBar(){//SideBar - Abrir
    document.querySelector(`.side-bar`).classList.add(`active`);
    document.querySelector(`body`).style.overflowY = "hidden";
}
function closeSideBar(element){//Fechar SideBar
    document.onclick = function(e){
        if(e.target.classList[0] == "side-bar"){
            element.classList.remove(`active`);
            document.querySelector(`body`).style.overflowY = "scroll";
        }
    }
}
function msgFor(element){ //Selecionar para quem quer mandar mensagem, pela side-bar
    const msgto = document.querySelectorAll(`.sendTo span`)
    const clickArea = element.classList[0];
    const allAreas = document.querySelectorAll(`.${clickArea}`);
    for(let i = 0; i < allAreas.length; i++){
        if(allAreas[i].classList.contains(`selected`)){
            allAreas[i].classList.remove(`selected`);
            allAreas[i].querySelector(`.checkmark`).classList.remove(`selected`);
        }
    }
    element.classList.add(`selected`);
    element.querySelector(`ion-icon.checkmark`).classList.add(`selected`);
    switch(clickArea){
        case "contact":
            let users =  element.querySelector(`p`).innerHTML;
            msgto[0].innerHTML = users;
            break;
        case "type-of-visibility":
            let visibility = element.querySelector(`p`).innerHTML;
            msgto[1].innerHTML = `(${visibility.toLowerCase()})`;
            break;
    }
}
//Função de Procura de Mensagens
function chatMgs(){
    const searchmsgPromess = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`);
    searchmsgPromess.then(loadChatMsg);
}
function loadChatMsg(allmsg){
    do{
        msgcreator(allmsg);
    }while(username() == "");
    if(verifyNewMsg(allmsg)){
        msgcreator(allmsg);
    }
}
function msgcreator(allmsg){
    const mensage = allmsg.data;
    const chatLi = document.querySelector(`.chat`);
    chatLi.innerHTML = "";
    const scrollLastMsg = document.querySelector(`.chat-body`);
    for(let i = 0; i < mensage.length; i++){
        const mensageCreate = mensage[i];
        if(chatMsgLi(mensageCreate)){
            chatLi.innerHTML += chatMsgLi(mensageCreate);
        }
    }
    scrollLastMsg.scrollIntoView(false)
}
function chatMsgLi(mensageCreate){
    let mensageToText;
    let mensageTo;
    if(mensageCreate.to != "Todos"){
        mensageTo = `<strong>${mensageCreate.to}</strong>`;
    } else{
        mensageTo = mensageCreate.to;
    }
    if(mensageCreate.type == "private_message"){
        if(mensageCreate.to === username() || mensageCreate.from === username()){
            mensageToText = `reservadamente para ${mensageTo}`;
        } else {
            return false;
        }
    } else {
        mensageToText = `para ${mensageTo}`;
    }
    return `
    <li class="mensagens ${mensageCreate.type}">
        <div class="msg-text">
            <p><time>(${mensageCreate.time})</time> <strong>${(mensageCreate.from)}</strong> ${mensageToText}: ${mensageCreate.text}</p>
        </div>
    </li>
    `;
}
function verifyNewMsg(allmsg){
    let chat = document.querySelector(`.chat`)
    if(chat.lastElementChild.querySelector(`time`) === `(${allmsg.data[99].time})`){
        return false
    } return true
}
//Função de Criação de mensagem
const input = document.querySelector(`.text`);
input.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        if(input.value !== ""){
            sendMessage();
        }
    }
})
function sendMessage(){
    const from = username()
    const to = document.querySelector(`.sendTo`).querySelectorAll(`span`)[0].innerHTML
    const text = document.querySelector(`.text`).value ;
    let type = document.querySelector(`.sendTo`).querySelectorAll(`span`)[1].innerHTML
    switch(type){
        case "(público)":
            type = "message"
            break;
        case "(reservadamente)":
            type = "private_message"
            break;
    }
    const sendMsgPromess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, {
        from: from,
        to: to,
        text: text,
        type: type,
    });
    document.querySelector(`.text`).value = ""
    sendMsgPromess.then(mensagemCadastrada = () => chatMgs())
    sendMsgPromess.catch(reloadPage)
}

const reloadPage = () => window.location.reload()