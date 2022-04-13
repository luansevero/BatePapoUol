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
//Função de Criação de mensagem(Feito)
function sendMessage(){
    const from = document.querySelector(`.write-name`).value //De quem
    const to = document.querySelector(`.sendTo`).querySelectorAll(`span`)[0].innerHTML
    const text = document.querySelector(`.write-msg`).value //Texto
    const type = document.querySelector(`.sendTo`).querySelectorAll(`span`)[1].innerHTML
    if(type == "(Público)"){
        type = "message"
    } else if(type == "(Reservadamente)"){
        type = "private_message"
    }
    mensage = {
        from: from,
        to: to,
        text: text,
        type: type,
    }
    const promessa = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, mensage);
    promessa.then(mensagemCadastrada)
    promessa.catch(mensagemComFalha)
}
function mensagemCadastrada(){
    alert(`Mensagem cadastrada com sucesso`)
}
function mensagemComFalha(err){
    alert(err.responde.status)
}