import { cities } from './navigation.json'
import { getTimezone } from './api'
import './style.sass'

const createDOMElement = (type, options = {}) => {
  const element = document.createElement(type)
  Object.assign(element, options)
  return element
}

const nav = createDOMElement('nav', { id: 'menu' })
const ul = createDOMElement('ul')
const hr = createDOMElement('hr')
const timeContainer = createDOMElement('div', { id: 'local-time' })

nav.id = 'menu'
nav.appendChild(ul)
nav.appendChild(hr)
timeContainer.id = 'local-time'

let timeZone = null

const setUnderlinePosition = (element) => {
  const { width, x } = element.getBoundingClientRect()
  hr.style.left = `${x - 50}px`
  hr.style.width = `${Math.floor(width)}px`
}

const getTime = () => {
  const options = {
    timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat([], options)
  return formatter.format(new Date())
}

const handleClick = async (event) => {
  event.preventDefault()

  timeContainer.style.display = 'none'

  document
    .querySelectorAll('a.active')
    .forEach((a) => a.classList.remove('active'))

  setUnderlinePosition(event.target)
  event.target.classList.add('active')

  timeZone = await getTimezone(event.target.innerText)

  setTimeout(() => {
    timeContainer.style.display = 'block'
  }, 1000)
}

const createNavItem = ({ section, label }) => {
  const li = document.createElement('li')
  ul.appendChild(li)

  const href = document.createElement('a')
  href.setAttribute('href', `/${section}`)
  href.textContent = label
  href.addEventListener('click', handleClick)

  li.appendChild(href)
}

cities.forEach(createNavItem)

document.querySelector('#app').append(nav, timeContainer)

const renderTime = () => {
  timeContainer.innerText = getTime()
  setTimeout(renderTime, 1000)
}

setTimeout(renderTime, 1000)

const resizeHandler = () => {
  const activeElement = document.querySelector('a.active')
  setUnderlinePosition(activeElement)
}

window.onresize = resizeHandler