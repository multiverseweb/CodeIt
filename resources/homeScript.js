function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  function changeCss() {
    var top = document.getElementById("top");
    var scroll_icon = document.getElementById("scroll_icon");
    (this.scrollY > 30 && this.scrollY < 2450) ? top.style.opacity = 1 : top.style.opacity = 0;
    (this.scrollY > 0) ? scroll_icon.style.opacity = 0 : scroll_icon.style.opacity = 1;
  }
  
  window.addEventListener("scroll", changeCss, false);
  
  