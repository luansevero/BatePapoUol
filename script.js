//Entrar na Sala API
function login(){
    const nametyped = document.querySelector(`.write-name`).value
    const username = { name: nametyped}
    const promess = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants `, username);
    promess.then(nomecadastrado)
    promess.catch(nomecomFalha)

}
function nomecadastrado(){
    const username2 = document.querySelector(`.write-name`).value
    document.querySelector(`.entrance`).classList.remove(`active`);
    const idInterval = setInterval(keepConection, 4000, username2)
    const id2Interval = setInterval(participantsList, 10000)
    searchMenssages()
}
function nomecomFalha(){
    alert(`Nome já foi cadastrado, tente um novo nome!`)
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
    const listPromess = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    listPromess.then(createList)
}
function createList(list){
    let userlogin = document.querySelector(`.write-name`).value
    for(let i = 0; i < list.length; i++){
        if(list.data.name[i] != userlogin){
        let newParticipant = document.createElement(`div`)
        newParticipant.classList.add(`user`)
        newParticipant.setAttribute(`onclick`, `msgFor(this)`)
        newParticipant.innerHTML = `
        <div class="users-container">
            <ion-icon class="iconPerson" name="person-circle"></ion-icon>
            <p class="otherUsers">${list.data.name[i]}</p>
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

function localTime(){ //Pega a data local
    let time = new Date()
    let hour = time.getHours()
    let min = time.getMinutes()
    let sec = time.getSeconds()
    let clock = `${("0" + hour).slice(-2)}:${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`
    return clock
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
        type: tipo
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
    alert(err.responde.status)
    window.location.reload()
}
//Função de Procura de Mensagens
function searchMenssages(){
    const searchmsgPromess = axios.get(`http://mock-api.driven.com.br/api/v6/uol/messages`)
    searchmsgPromess.then(backUpMsg)
}
function backUpMsg(allmsg){
    document.querySelector(`.chat`).innerHTML = ""
    for(let i = 0; i < allmsg.length; i++){
        let newchatMsg = document.createElement(`div`)
        newchatMsg.classList.add(`mensagens`)
        newchatMsg.classList.add(`${allmsg.data.type[i]}`)
        newchatMsg.innerHTML = `
        <div class="msg">
            <p><time>(${allmsg.data.time[i]})</time> <strong>${allmsg.data.from[i]}</strong> para ${allmsg.data.to[i]}: ${allmsg.data.text[i]}</p>
        </div>
        `
        document.querySelector(`.chat`).appendChild(newchatMsg)
    }
}