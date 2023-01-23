
document.getElementById("btn").addEventListener("click",async function(event){
    event.preventDefault()
    console.log("Hi")
    const d = new Date();
    const ts = d.getTime();
    var coll = document.getElementById("college").value
    var cour = document.getElementById("course").value
    var subj = document.getElementById("subject").value
    var sem = document.getElementById("semester").value
    var paper = document.getElementById("paper").files[0]
    var preview = document.getElementById("preview").files[0]
    const firebase = require('firebase/app')
    const Storage = require('firebase/storage')
    const firebaseConfig = {
        apiKey: "AIzaSyA2Zc1z9vVKrVv9PvXV4qGmAWHPQZSHPLs",
        authDomain: "pdf-storage-5dcb0.firebaseapp.com",
        projectId: "pdf-storage-5dcb0",
        storageBucket: "pdf-storage-5dcb0.appspot.com",
        messagingSenderId: "751111523008",
        appId: "1:751111523008:web:472f12c66bee2b86c27b25",
      };  
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const storage = Storage.getStorage(app);
    const storageRef = Storage.ref(storage, paper.name + ts);
    await Storage.uploadBytes(storageRef, paper).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      const storageRef2 = Storage.ref(storage, preview.name + ts);
      await Storage.uploadBytes(storageRef2, preview).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

    var url1, url2;

      await Storage.getDownloadURL(Storage.ref(storage, paper.name + ts))
      .then((url) => {
        url1 = url;
      })
      .catch((error) => {
        console.log(error)
      });
      await Storage.getDownloadURL(Storage.ref(storage, preview.name+ts))
      .then((url) => {
    url2 = url;
      })
      .catch((error) => {
        console.log(error)
      });
      console.log(url1)
      console.log(url2)

      var obj = JSON.stringify({
        'college' : coll,
        'course': cour,
        'subject': subj,
        'semester': sem,
        'url': url1,
        'paper_name' : paper.name,
        'preview_url' : url2,
      });
    const blob = new Blob([obj], {
        type: 'application/json'
    });


    var response = await fetch('http://localhost:4000/upload',{
        method:"POST",
        headers: new Headers({
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJpbmdpZmllZF9yZXMiOiJ7XCJpZFwiOjUsXCJuYW1lXCI6XCJTdXlhc2hcIixcImVtYWlsXCI6XCJtYXRhbmhlbGlhLjE1QGdtYWlsLmNvbVwiLFwicGFzc3dvcmRcIjpcIiQyYSQxMCRBVlMzT0VvZVdza1l1bkxJUjRSVHh1Ym1lYlcuOTBhc2Zva2x4MnVQbkJkREthRlJUVmVndVwiLFwiam9pbmVkX29uXCI6XCIxNjcxOTQ5MDMzNDk0XCJ9IiwiaWF0IjoxNjcxOTQ5MTM5LCJleHAiOjE2NzI1NTM5Mzl9.aYZIXK4Mi8039zJMwuSMBPAVQt0rIhNuzYcNY7ljUsU',
             'Content-Type': 'application/json', 
         }),
        body: obj
    })
    console.log(response)
  });
