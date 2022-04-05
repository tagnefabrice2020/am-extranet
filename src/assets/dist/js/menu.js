var acc = document.getElementsByClassName("sub-menu");
console.log(acc)
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onClick = function() {
    console.log('clicked');
    this.classList.toggle("menu-is-opening");
    this.classList.toggle("menu-open"); 
  }
}