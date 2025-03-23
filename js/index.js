const connected = document.getElementsByClassName("yes")[0];
const connect = document.getElementsByClassName("not")[0];
const gasAlert = document.getElementsByClassName("gas-alert")[0];
const gasAlertIcon = document.getElementsByClassName("gas-alert-icon")[0];
const nav = document.getElementsByClassName("nav")[0];
const navDetails = document.querySelectorAll(".nav span");
const navEle = document.getElementsByClassName(".nav-el");


connect.addEventListener('click', ()=>{
    connect.style.display = "none"
    connected.style.display = "block";
})


connected.addEventListener('click', ()=>{
    connect.style.display = "block"
    connected.style.display = "none";
})

gasAlert.addEventListener('click', ()=>{
    if(gasAlertIcon.style.display === "block"){
        gasAlertIcon.style.display = "none"
    }else{
        gasAlertIcon.style.display = "block"
    }
})

nav.addEventListener('mouseenter', ()=>{
    for(var i = 0; i<navDetails.length; i++){
        navDetails[i].style.display = "block";
    }
})

nav.addEventListener('mouseleave', ()=>{
    for(var i = 0; i<navDetails.length; i++){
        navDetails[i].style.display = "none";
    }
})

function activate(ele){
    for(var i = 0; i<navEle.length; i++){
        navEle[i].classList.remove("active");
    }

    ele.classList.add("active");
}

while(document.readyState === 'complete'){
    ir = document.querySelectorAll('.container2');
    for(let r = 0; r<5;r++){
        ir[r].style.display = 'inline'
    }
}