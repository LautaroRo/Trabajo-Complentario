const button = document.getElementById("button")

button.addEventListener("click", (e) => {
    e.preventDefault()

    fetch("/api/login/delete", {
        method: "GET",
        credentials: "same-origin"
    }).then(json => {
        if(json.ok){
            window.location.href = "/api/login"
        }else{
            console.log("error")
        }
    }).catch(error =>{
        console.log(error)
    })
})