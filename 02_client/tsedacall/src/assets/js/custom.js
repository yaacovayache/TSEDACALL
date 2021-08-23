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