let sec = document.getElementById('sec');
let min = document.getElementById('min');
let hr  = document.getElementById('hr');

setInterval(()=>{
  let day = new Date();
  let hh  = day.getHours() * 30;
  let mn  = day.getMinutes() * 6;
  let ss  = day.getSeconds() * 6;

  //Rotate clockwise
  hr.style.transform  = `rotateZ(${hh+(mn/12)}deg)`;
  min.style.transform = `rotateZ(${mn}deg)`;
  sec.style.transform = `rotateZ(${ss}deg)`;


  /*Digital clock */
  let hour    = document.getElementById('hour');
  let minutes = document.getElementById('minutes');
  let seconds = document.getElementById('seconds');
  let ampm    = document.getElementById('ampm');

  //Get digits
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let am = (h > 12) ? "PM" : "AM";

  //Convert 24hr clock to 12hr clock
  h = (h > 12) ? h-12 : h;
  
  //Add zero before single digit number
  h = (h < 10) ? "0".concat(h) : h;
  m = (m < 10) ? "0".concat(m) : m;
  s = (s < 10) ? "0".concat(s) : s;

  //Add content to div
  hour.textContent    = h;
  minutes.textContent = m;
  seconds.textContent = s;
  ampm.textContent    = am;
})


