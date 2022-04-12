function login(element){
    let nametyped = document.querySelector(`.write-name`)
    if(verifyName((nametyped.value))){
        element.parentNode.classList.remove(`active`)
    }
}
function verifyName(nametyped){
    if(nametyped == 0){
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