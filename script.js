function localTime(){
    let time = new Date()
    let hour = time.getHours()
    let min = time.getMinutes()
    let sec = time.getSeconds()
    let clock = `${("0" + hour).slice(-2)}:${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`
    return clock
}
//
let users;
let visibility;
function msgFor(element){
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




function login(element){
    let nametyped = document.querySelector(`.write-name`)
    if(verifyName((nametyped.value))){
        element.parentNode.classList.remove(`active`)
    }
}
function verifyName(nametyped){
    if(nametyped == ""){
        return false
    } else {
        return true
    }
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
}

function sendMessage(){
    let localtime = localTime()
    let msgText = document.querySelector(`.write-msg`)
    let newchatMsg = document.createElement(`div`)
    newchatMsg.classList.add(`mensagens`)
    newchatMsg.classList.add(`${msgTypeClass}`)
    newchatMsg.innerHTML = `
    <div class="msg">
        <p><time>${localtime}</time>  <strong>${user}</strong> ${msgType}:  ${msgText.value}</p>
    </div>
    `
}