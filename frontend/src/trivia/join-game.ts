import '../css/style.css'
import { navigateTo } from '../helpers'


window.addEventListener('load', () => {
    // handle user name and save in localstorage
    let username = sessionStorage.getItem('username')
    if (!username) {
        username = prompt("What is your name")
    }

    if (!username || username.length < 3) {
        alert("Invalid username! You have to choose a name to join.")
        let mainDisplay = document.querySelector<HTMLDivElement>('#main')
        let issueDisplay = document.querySelector<HTMLDivElement>('.issue')
        mainDisplay!.style.display = 'none'
        issueDisplay!.style.display = 'block'
        document.querySelector<HTMLDivElement>('.issue')!.innerHTML = "Name is required!"

        return
    }

    document.querySelector<HTMLDivElement>('.welcome')!.innerHTML = `Hello ${username}! The game is about to start...`
    sessionStorage.setItem('username', username)

    const Users = [
        { name: 'Jackson' },
        { name: 'White wizard' },
        { name: 'Kivel' },
        { name: 'Scorp' },
        { name: 'Ruthless' },
    ]
    let joinedUsers = document.querySelector<HTMLDivElement>('.joined-users')
    Users.map((user, idx) => {
        let node = document.createElement('div')
        node.innerHTML = `${idx + 1}. ${user.name}`
        joinedUsers?.append(node)
    })

    let homeBtn = document.querySelector('#home-btn')
    homeBtn?.addEventListener('click', navigateTo('/index.html'))

})