// CHAMP DU NOM
const name = document.querySelector('#name')
// CHAMP DU MESSAGE
const message = document.querySelector('#message')
// BOUTON ENVOYER
const btn = document.querySelector('#btn')
// LISTE DES MESSAGES
const box = document.querySelector('#box')
// BOUTON EFFACER CHAT
const clear = document.querySelector('#clear')
//FORMULAIRE
const form = document.querySelector('form')

// OBJET CONTENANT LES MESSAGES
let object = {}

// FONCTION REMPLISSANT L'OBJET A PARTIR DES DONNEES DE L'API
function updateObject() {
    fetch("https://jsonblob.com/api/jsonBlob/62fd98ea-25e4-11eb-bacf-05003012f9ec")
    .then(response => response.json())
    .then((data) => { 
        object = data
        console.log(object)
    })
}

// FONCTION AFFICHANT LES MESSAGES DE L'API DANS LA BOX
function display() {
    console.log("fonction display")
    updateObject()
    // let size = Object.keys(object).length
    console.log("affichage des messages")
    box.innerHTML = ""
    for (key in object) {
        box.insertAdjacentHTML("beforeend",`<p><span class="nameStyle">${object[key].name}</span> : ${object[key].message}</p>`)
    }
}

    // FONCTION AJOUTANT UNE ENTREE A L'OBJET + MAJ SUR L'API
function addToObject(newEntry) {
    // on remplit l'objet de ce qui a sur l'api
    updateObject()
    // ajout sur l'objet
    object[`message${Object.keys(object).length+1}`] = newEntry;
}

// FONCTION MISE A JOUR DE L'API AVEC LA VALEUR DE L'OBJET
function updateAPI() {
    fetch("https://jsonblob.com/api/jsonBlob/62fd98ea-25e4-11eb-bacf-05003012f9ec", {
    method: 'PUT',
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(object)})
    .then(response => response.json())
    .then((data) => { 
        console.log('new object :')
        console.log(object)
        console.log(data)
    })
}  

// AJOUT D'UN MESSAGE PAR L'UTILISATEUR + AFFICHAGE
form.addEventListener(("submit"),(event) => {
    event.preventDefault()
    addToObject({"name": name.value, "message": message.value})
    updateAPI()
    display()
    message.value = ""
    box.scrollTop = box.scrollHeight
})


// SUPPRESSION DU CHAT + API VIDE
clear.addEventListener(("click"),(event) => {
    box.innerHTML = ""
    object={}
    updateAPI()
})

function refresh() {
    fetch("https://jsonblob.com/api/jsonBlob/62fd98ea-25e4-11eb-bacf-05003012f9ec")
    .then(response => response.json())
    .then((data) => { 
        console.log(Object.keys(data).length)
        console.log(Object.keys(object).length)

        if (Object.keys(data).length !== Object.keys(object).length) {
            object = data
            console.log("MISE A JOUR")
            display()
        }
    })
}

setInterval(refresh,2000);
