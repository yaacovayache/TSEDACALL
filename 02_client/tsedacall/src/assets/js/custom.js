function openNav() {
  document.getElementById("mySidenav").style.width = "290px";
  document.getElementById('showOpen').style.display = "none";
  document.getElementById('closeNav').style.display = "block";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById('showOpen').style.display = "block";
  document.getElementById('closeNav').style.display = "none";
}

function set(name, path){
  document.getElementById('navbarDropdownMenuLink').innerHTML = `<img src="${path}" width="20px" height="20px" alt=""> ${name} `
  document.getElementById('navbarDropdownMenuLinkMobile').innerHTML = `<img src="${path}" width="20px" height="20px" alt=""> ${name} `
}


function mobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function showHide() {
  let divInfo = document.getElementById("showHideDiv");
  let icon = document.getElementById("clickbtn");

  if (divInfo.style.display == "none") {
    divInfo.style.display = "block";
    icon.classList.remove('fa-angle-down');
    icon.classList.add('fa-angle-up');
  } else {
    divInfo.style.display = "none";
    icon.classList.remove('fa-angle-up');
    icon.classList.add('fa-angle-down');
  }
}

const modify = () => {
  let inputs = document.querySelectorAll(".input");
  let normal_text = document.querySelectorAll(".normal-text");
  let saveDiv = document.getElementById("saveDiv");
  saveDiv.style.display = "block";

  document.getElementById("modify").style.display = "none";

  for (i = 0; i < inputs.length; i++) {
    inputs[i].style.display = "block";
  }

  for (i = 0; i < normal_text.length; i++) {
    normal_text[i].style.display = "none";
  }
};

const save = () => {
  let saveDiv = document.getElementById("saveDiv");
  saveDiv.style.display = "none";
  let inputs = document.querySelectorAll(".input");
  let normal_text = document.querySelectorAll(".normal-text");
  document.getElementById("modify").style.display = "block";

  for (i = 0; i < inputs.length; i++) {
    inputs[i].style.display = "none";
  }

  for (i = 0; i < normal_text.length; i++) {
    normal_text[i].style.display = "block";
  }
};

const hide = () => {
  document.getElementById("payDiv").style.display = "none";
  document.getElementById("done").style.display = "block";
};

const active = (id, id_1) => {
  document.getElementById(id).style.background = "linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%)";
  document.getElementById(id).style.backgroundSize = "200% auto";
  document.getElementById(id + "lable").style.color = "white";
  document.getElementById("input_" + id).checked = true;

  document.getElementById(id_1).style.background = "white";
  document.getElementById(id_1 + "lable").style.color = "#222";
};
