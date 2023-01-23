  document.getElementById("btn").addEventListener("click",async function(event){
      event.preventDefault()
      
      var user = document.getElementById("name").value
      var email = document.getElementById("email").value
      var pass = document.getElementById("password").value
      console.log(pass)
      console.log("Hi")
      const d = new Date();
      const ts = d.getTime();
      
      var obj = JSON.stringify({
        'name' : user,
        'email' : email,
        'password' : pass
    });

      await fetch('http://localhost:4000/register',{
        method:"POST",
        headers: new Headers({
            'Content-Type': 'application/json', 
        }),
        body: obj,
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
      }).catch((err) => {
          console.log(err);
      })
    });
  