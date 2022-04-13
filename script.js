//Entrar na Sala API
function login(element){
    const nametyped = document.querySelector(`.write-name`).value
    const username = { name: nametyped}
    element.parentNode.classList.toggle(`active`)
    document.querySelector(`.loading`).classList.toggle(`active`)
    const promess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants `, username);
    promess.then(nomecadastrado)
    promess.catch(nomecomFalha)
}
participantsList()
function nomecadastrado(){
    const username2 = document.querySelector(`.write-name`).value
    document.querySelector(`.entrance`).classList.remove(`active`);
    setInterval(keepConection, 4000, username2)
    setInterval(participantsList, 10000,)
    setInterval(searchMenssages, 3000)
    searchMenssages()
}
function nomecomFalha(){
    alert(`Nome já foi cadastrado, tente um novo nome!`)
    window.location.reload()
}
//Manter Conexão API
function keepConection(userN){
    const dados = {
        name: userN
    }
    const conectionpromess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, dados)
}


//Lista de Participantes API
function participantsList(){
    const listPromess = axios("https://mock-api.driven.com.br/api/v6/uol/participants");
    listPromess.then(createList)
}
function createList(list){
    document.querySelector(`.participantslist`).innerHTML = ""
    let usernametyped = document.querySelector(`.write-name`).value
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
//SideBar(Bônus)
function menu(){
    document.querySelector(`.mainsidebar`).classList.add(`active`)
}
function closeMenu(element){
    document.onclick = function(e){
        if(e.target.classList[0] == "mainsidebar"){
            element.classList.remove(`active`)
        }
    }
}
function msgFor(element){
    let users;
    let visibility;
    const msgto = document.querySelector(`.sendTo`)
    const clickArea = element.classList[0]
    const allAreas = document.querySelectorAll(`.${clickArea}`)
    for(let i = 0; i < allAreas.length; i++){
        if(allAreas[i].classList.contains(`selected`)){
            allAreas[i].classList.remove(`selected`)
            allAreas[i].querySelector(`.checkmark`).classList.remove(`selected`)
        }
    }
    element.classList.add(`selected`)
    element.querySelector(`ion-icon.checkmark`).classList.add(`selected`)
    if(clickArea == "users"){
        users =  element.querySelector(`p`).innerHTML
        msgto.querySelectorAll(`span`)[0].innerHTML = users
    } else if(clickArea == "visibilityType"){
        visibility = element.querySelector(`p`).innerHTML
        msgto.querySelectorAll(`span`)[1].innerHTML = `(${visibility})`
    }

}
//Função de Criação de mensagem(Feito)
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
    searchMenssages()
}
function mensagemComFalha(err){
    window.location.reload()
}
//Função de Procura de Mensagens
function searchMenssages(){
    const searchmsgPromess = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`)
    searchmsgPromess.then(backUpMsg)
}
function backUpMsg(allmsg){
    const elementoQueQueroQueApareca = document.querySelector('.chatmargins');
    document.querySelector(`main.chat`).innerHTML = ""
    for(let i = 0; i < allmsg.data.length; i++){
        let newchatMsg = document.createElement(`div`)
        newchatMsg.classList.add(`mensagens`)
        newchatMsg.classList.add(`${allmsg.data[i].type}`)
        if(allmsg.data[i].type == "private_message"){
        newchatMsg.innerHTML = `
        <div class="msg">
            <p><time>(${allmsg.data[i].time})</time> <strong>${(allmsg.data[i].from)}</strong> reservadamente para <strong>${allmsg.data[i].to}</strong>: ${allmsg.data[i].text}</p>
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
    }
    elementoQueQueroQueApareca.scrollIntoView(false);
}