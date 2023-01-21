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

    document.querySelector<HTMLDivElement>('.welcome')!.innerHTML = `Hey ${username}! Choose a game type to start.`
    sessionStorage.setItem('username', username)

    const Games = [
        { name: 'Trivia Quiz' },
        { name: 'Wow Poll' },
        { name: 'Fun Election' },
        { name: 'Say something' },
        { name: 'Petition' },
        { name: 'Anonymous' },
    ]
    let gamesWrapper = document.querySelector<HTMLDivElement>('.games')
    Games.map((user, idx) => {
        let node = document.createElement('div')
        node.innerHTML = `${idx + 1}. ${user.name}`
        gamesWrapper?.append(node)
    })

    let homeBtn = document.querySelector('#home-btn')
    homeBtn?.addEventListener('click', navigateTo('/index.html'))

})