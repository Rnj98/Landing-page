const baseURL = 'http://localhost:4444'


const displaySessions = document.querySelector('#sessionDisplay')
const addNewSession = document.querySelector('#addSession')

const createSessionCard = (session) => {
    const newSessionCard = document.createElement('section')
    newSessionCard.classList.add('session-card')

    newSessionCard.innerHTML = `
        <p>${session.name}</p>
        <p>${session.phone}</p>
        <p>${session.date}</p>
        <p>${session.notes}</p>


        <button onclick="deleteSession(${session.id})">Cancel</button>
    `

    displaySessions.appendChild(newSessionCard)
}

const displayAllSessions = (arr) => {
    for(let i = 0; i < arr.length; i++){
        createSessionCard(arr[i])
    }
}


const getAllSessions = () => {
    axios.get(`${baseURL}/sessions`)
        .then((res) => {
            console.log(res.data)

            displayAllSessions(res.data)
        })
        .catch((err) =>{
            console.log(err)
        })
}

const addSession = () => {

    displaySessions.innerHTML = ''

    const name = document.querySelector('#userName')
    const date = document.querySelector('#sessionDate')
    const phone = document.querySelector('#sessionPhone')
    const notes = document.querySelector('#sessionNotes')


    let bodyObj = {
        name: name.value,
        date: date.value,
        phone: phone.value,
        notes: notes.value,
    }

    axios.post(`${baseURL}/sessions`, bodyObj)
    .then((res) => {
        console.log(res.data)
        displayAllSessions(res.data)

        name.value = ''
        date.value = ''
        phone.value = ''
        notes.value = ''
    })
    .catch((err) =>{
        console.log(err)
    })

}

const deleteSession = (id) => {

    axios.delete(`${baseURL}/sessions/${id}`)
    .then((res) => {
        console.log(res.data)
        displaySessions.innerHTML = ''
        displayAllSessions(res.data)
    })
    .catch((err) =>{
        console.log(err)
    })
}




addNewSession.addEventListener('click', addSession)
getAllSessions()