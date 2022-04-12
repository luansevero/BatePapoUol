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
function localTime(){
    let time = new Date()
    let hour = time.getHours()
    let min = time.getMinutes()
    let sec = time.getSeconds()
    let clock = `${("0" + hour).slice(-2)}:${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`
    return clock
}
