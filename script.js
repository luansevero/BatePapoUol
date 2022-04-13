//Login + Barra do Menu
function login(element){
    let nametyped = document.querySelector(`.write-name`)
    if(verifyName((nametyped.value))){
        element.parentNode.classList.remove(`active`)
    }
    return nametyped
}
function verifyName(nametyped){
    if(nametyped == ""){
        return false
    } return true
}
function menu(){
    document.querySelector(`.mainsidebar`).classList.add(`active`)
}
function closeMenu(element){
    document.onclick = function(e){
        if(e.target.classList[0] == "mainsidebar"){
            element.classList.remove(`active`)
        }
    }



//Lista dos participantes
function participantsList(){
    let newParticipant = document.createElement(`div`)
    newParticipant.classList.add(`user`)
    newParticipant.setAttribute(`onclick`, `msgFor(this)`)
    newParticipant.setAttribute(`data-identifier`, `participant`)
    newParticipant.innerHTML = `
    <div class="users-container">
        <ion-icon class="iconPerson" name="person-circle"></ion-icon>
        <p>${participant}</p>
    </div>
    <ion-icon class="checkmark" name="checkmark-sharp"></ion-icon>
  `  
}
}
//Mudando a pessoa que quer 
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
//Função de Criação de mensagem
function sendMessage(){
    let user = document.querySelector(`.write-name`).value
    let localtime = localTime()
    let personselected = document.querySelector(`.sendTo`)
    personselected = personselected.querySelectorAll(`span`)[0].innerHTML
    if(personselected !== "Todos"){
        personselected = `<strong>${personselected}</strong>`
    }
    const type = document.querySelector(`.sendTo`)
    let msgTypeClass;
    let msgType;
    msgTypeClass = type.querySelectorAll(`span`)[1].innerHTML
    if(msgTypeClass == "(Reservadamente)"){
        msgTypeClass = "private"
        msgType = "reservadamente para"
    } else if(msgTypeClass == "(Público)"){
        msgTypeClass = "normal"
        msgType = "para"
    }
    let msgText = document.querySelector(`.write-msg`)
    //Criação da Mensagem
    let newchatMsg = document.createElement(`div`)
    newchatMsg.classList.add(`mensagens`)
    newchatMsg.classList.add(`${msgTypeClass}`)
    newchatMsg.innerHTML = `
    <div class="msg">
        <p><time>(${localtime})</time>  <strong>${user}</strong> ${msgType} ${personselected} :  ${msgText.value}</p>
    </div>
    `
    document.querySelector(`.chat`).appendChild(newchatMsg)
    msgText.value = ""
}