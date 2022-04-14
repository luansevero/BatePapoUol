//Funçoes para poder entrar no Bate-Papo
function login(element){
    const nametyped = document.querySelector(`.write-name`).value;
    const username = { name: nametyped};
    loadingLogin(element);
    const loginpromess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants `, username);
    loginpromess.then(registrationSucess);
    loginpromess.catch(registrationFailed);
}
function loadingLogin(el){
    el.parentNode.classList.toggle(`active`);
    document.querySelector(`.loading`).classList.toggle(`active`);
}
function registrationSucess(){
    document.querySelector(`.entrance`).classList.remove(`active`);
    msgAlreadyWrite()
    participantsList();
    allIntervals();
}
function registrationFailed(){
    alert(`Nome já foi cadastrado, tente um novo nome!`);
    window.location.reload();
}
function allIntervals(){
    setInterval(keepConection, 4000);
    setInterval(participantsList, 10000);
    setInterval(apimsg, 3000);
}
function keepConection(){ //ManterConexão com Api
    const userloged = document.querySelector(`.write-name`).value;
    const userLoged = {
        name: userloged
    };
    const connectionpromess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, userLoged);
    connectionpromess.catch(unLoged);
}
function unLoged(){
    window.location.reload();
}

//SideBar(Bônus)
function openSideBar(){
    document.querySelector(`.mainsidebar`).classList.add(`active`);
    let chatee = document.querySelector(".chat")
    chatee.style.overflow = "none";
}
function closeSideBar(element){
    document.onclick = function(e){
        if(e.target.classList[0] == "mainsidebar"){
            element.classList.remove(`active`);
        }
    }
}
function msgFor(element){
    let users;
    let visibility;
    const msgto = document.querySelector(`.sendTo`);
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
    if(clickArea == "users"){
        users =  element.querySelector(`p`).innerHTML;
        msgto.querySelectorAll(`span`)[0].innerHTML = users;
    } else if(clickArea == "visibilityType"){
        visibility = element.querySelector(`p`).innerHTML;
        msgto.querySelectorAll(`span`)[1].innerHTML = `(${visibility})`;
    }

}
//Lista de Participantes da SideBar - API
function participantsList(){
    const listPromess = axios("https://mock-api.driven.com.br/api/v6/uol/participants");
    listPromess.then(createList);
}
function createList(list){
    document.querySelector(`.participantslist`).innerHTML = ""
    let usernametyped = document.querySelector(`.write-name`).value;
    for(let i = 0; i < list.data.length; i++){
        if(usernametyped != list.data[i].name){
        let newParticipant = document.createElement(`div`)
        newParticipant.classList.add(`users`)
        newParticipant.setAttribute(`onclick`, `msgFor(this)`)
        newParticipant.innerHTML = `
        <div class="users-container">
            <ion-icon class="iconPerson" name="person-circle"></ion-icon>
            <p class="otherUsers">${list.data[i].name}</p>
        </div>
        <ion-icon class="checkmark" name="checkmark-sharp"></ion-icon>
        `  
        document.querySelector(`.participantslist`).appendChild(newParticipant)
        }
    }
}
//Função de Criação de mensagem
function sendMessage(){
    const from = document.querySelector(`.write-name`).value //De quem
    const to = document.querySelector(`.sendTo`).querySelectorAll(`span`)[0].innerHTML
    const text = document.querySelector(`.write-msg`).value //Texto
    let tipo = document.querySelector(`.sendTo`).querySelectorAll(`span`)[1].innerHTML
    if(tipo == "(Público)"){
        tipo = "message"
    } else if(tipo == "(Reservadamente)"){
        tipo = "private_message"
    }
    const mensage = {
        from: from,
        to: to,
        text: text,
        type: tipo,
    }
    const sendmsgPromess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, mensage);
    sendmsgPromess.then(mensagemCadastrada)
    sendmsgPromess.catch(mensagemComFalha)
}
function mensagemCadastrada(){
    document.querySelector(`.write-msg`).value = ""
    apimsg()
}
function mensagemComFalha(err){
    window.location.reload()
}
//Função de Procura de Mensagens
function apimsg(){
    const searchmsgPromess = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`)
    searchmsgPromess.then(newMessages)
}
function msgAlreadyWrite(){
    const searchmsgPromess = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`)
    searchmsgPromess.then(msgcreator)
}
function newMessages(database){
    if(verifynewmsg(database)){
        document.querySelector(`main.chat`).innerHTML = ""
        msgcreator(database)
    }
}
function msgcreator(allmsg){
    for(let i = 0; i < allmsg.data.length; i++){
        if(allmsg.data[i].to != "Todos"){
            console.log(allmsg.data[i].to)
            allmsg.data[i].to = `<strong>${allmsg.data[i].to}</strong>`
        }
        let newchatMsg = document.createElement(`div`)
        newchatMsg.classList.add(`mensagens`)
        newchatMsg.classList.add(`${allmsg.data[i].type}`)
        if(allmsg.data[i].type == "private_message"){
        newchatMsg.innerHTML = `
        <div class="msg">
            <p><time>(${allmsg.data[i].time})</time> <strong>${(allmsg.data[i].from)}</strong> reservadamente para ${allmsg.data[i].to}: ${allmsg.data[i].text}</p>
        </div>
        `
        document.querySelector(`.chat`).appendChild(newchatMsg)
        } else {
            newchatMsg.innerHTML = `
            <div class="msg">
                <p><time>(${allmsg.data[i].time})</time> <strong>${(allmsg.data[i].from)}</strong> para ${allmsg.data[i].to}: ${allmsg.data[i].text}</p>
            </div>
            `
            document.querySelector(`.chat`).appendChild(newchatMsg)
        }
        scrolltobottom()
    }
}
function verifynewmsg(allmsg){ // 0 = primeira mensagem 99 = ultima mensagem (Motivo: Flood)!
    const allmsgloaded = document.querySelectorAll(`.msg time`);
    if(allmsgloaded[0].innerHTML === `(${allmsg.data[0].time})`){
        if(allmsgloaded[99].innerHTML === `(${allmsg.data[99].time})`){
            return false
        }
    } else if(allmsgloaded[0].innerHTML === `(${allmsg.data[0].time})`){
        if(allmsgloaded[99].innerHTML === `(${allmsg.data[99].time})`){
            return false
        }
    } else {
        return true
    } 
}
function scrolltobottom(){
    const elementoQueQueroQueApareca = document.querySelector('.chatmargins');
    elementoQueQueroQueApareca.scrollIntoView(false)
}

