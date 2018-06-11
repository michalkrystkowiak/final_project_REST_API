document.addEventListener('DOMContentLoaded', function(){
  let firstCodeAuthorization = document.URL.slice(-32);
  let button = document.getElementById('auth');
  console.log("kod autoryzacji przekazany do fetch to: " + firstCodeAuthorization);


  button.addEventListener("click", function(){
    console.log("Fetch")
    fetch("https://allegro.pl/auth/oauth/token?grant_type=authorization_code&code=" + firstCodeAuthorization + "&redirect_uri=https://familiare-store.com/ProjektRestApiAllegro/index.html", {
    headers: {
      Authorization: "13a9a1cb918c45d3a75c1b851e1c1000:QDb8nioxJfVa2Ok6dWcF8Fq9Q9j2VSc4Jxp4iubR2ugU1wsC4yRCGqz2P8uag5CX"
    },
      method: "POST"
    })  

  });
});

