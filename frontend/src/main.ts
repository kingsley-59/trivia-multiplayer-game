import './css/style.css'
import './css/responsive.css'
import { navigateTo } from './helpers'
// import typescriptLogo from './typescript.svg'



class Tabs {
  tabs: {
    [key: string]: {
      element: Element,
      screen: Element
    }
  }
  active: string

  constructor() {
    this.tabs = {}
    this.active = Object.keys(this.tabs)[0]
  }

  addTab(name: string, element: Element, screen: Element) {
    this.tabs[name] = { element, screen }
  }

  getActiveTab() {
    return this.active
  }

  setActiveTab(tab: string) {
    this.active = tab
    this.tabs[tab]?.screen?.classList?.add('show')
    this.tabs[tab]?.element?.classList?.add('active')
  }

  makeTabActive(element: Element, tabs: typeof this.tabs, tabManager: Tabs) {

    return function () {
      for (let tab in tabs) {
        let currentNode = tabs[tab]
        currentNode.element?.classList?.remove('active')
        currentNode.screen?.classList?.remove('show')
        if (element.isSameNode(currentNode.element)) tabManager.setActiveTab(tab)
      }
      console.log(tabManager.getActiveTab())
    }
  }
}

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

  document.querySelector<HTMLDivElement>('.welcome')!.innerHTML = `Hello ${username}! Welcome to Trivia Multiplayer.`
  sessionStorage.setItem('username', username)

  // manage app tabs
  let tabManager = new Tabs()

  let tabs = document.querySelectorAll('.nav-tab')
  let screens = document.querySelectorAll('.screen')
  tabs[0]?.classList?.add('active')
  screens[0]?.classList?.add('show')
  tabs.forEach((element, key) => {
    tabManager.addTab(element.innerHTML, element, screens[key])
  })
  console.log(tabManager.tabs)

  for (let tab in tabManager.tabs) {
    let node = tabManager.tabs[tab]
    node.element.addEventListener('click', tabManager.makeTabActive(node.element, tabManager.tabs, tabManager))
  }

  // other event listeners
  let joinGameBtn = document.querySelector('.join-game')
  joinGameBtn?.addEventListener('click', navigateTo('/game-room.html'))
  let hostGameBtn = document.querySelector('.host-game')
  hostGameBtn?.addEventListener('click', navigateTo('/host-game.html'))
  
})


