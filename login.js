function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log("cookie set")
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }
document.getElementById("btn").addEventListener("click",async function(event){
    event.preventDefault()
    
    var user = document.getElementById("username").value
    var pass = document.getElementById("password").value
    console.log("Hi")
    const d = new Date();
    const ts = d.getTime();
    await fetch(`http://localhost:4000/login?email=${user}&password=${pass}`,{
        method:"GET",
    }).then((response) => response.json())
    .then((data) => {
        setCookie("token", data.token, 1)
      console.log(data);
    }).catch((err) => {
        console.log(err);
    })
    console.log(checkCookie())
    //console.log(response.body())
  });
