
const issueTemplate = document.querySelector('#issue-template')

if (issueTemplate) {
  await import('../socket.io/socket.io.js')
  console.log('issueTemplate')
  const base = document.querySelector('base')
  const path = base
    ? (new URL('socket.io', base.href)).pathname
    : '/socket.io'
  const socket = window.io.connect('/', { path })

  // Listen for message from the server.
  socket.on('issues', (data) => updateIssue(data))
  socket.on('newIssue', (data) => newIssue(data))

  /**
   * Update with issues.
   *
   * @param {*} data - the issue that is being add.
   */
  function updateIssue (data) {
    console.log('updateIssue')
    const issue = document.querySelector(`[id="${data.iid}"]`)
    const button = issue.querySelector('button')

    console.log(data.state)
    if (data.state === 'opened') {
      button.removeAttribute('class', 'closed-issue-btn')
      button.classList.add('open-issue-btn')
      button.textContent = 'opened'
    } else {
      button.removeAttribute('class', 'open-issue-btn')
      button.classList.add('closed-issue-btn')
      button.textContent = 'closed'
    }
  }
  /**
   * Creates a new issue.
   *
   * @param {object} data  - the data in the new issue.
   */
  function newIssue (data) {
    console.log(data)
    console.log('newIssue')
    const template = document.querySelector('#issue-template').content.cloneNode(true)
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'issue-wrapper')
    /* wrapper.setAttribute([`[id="${data.iid}"]`) */
    wrapper.setAttribute('id', `${data.iid}`)
    const title = template.querySelector('.title-in-issue')
    const desc = template.querySelector('.issue-description')
    const bodywrapper = document.querySelector('.bodywrapper')
    const form = template.querySelector('form')
    const button = template.querySelector('button')
    form.setAttribute('id', `${data.iid}`)
    // const img = template.querySelector('#img-right')
    /* const issue = document.querySelector(`[id="${data.iid}"]`) */

    if (data.state === 'opened') {
      button.className('class', 'open-issue-btn')
    } else {
      button.setAttribute('class', 'closed-issue-btn')
    }
    button.setAttribute('value', `${data.state}`)
    title.textContent = data.title
    desc.textContent = data.description
    wrapper.append(form, button, title, desc)
    bodywrapper.appendChild(wrapper)
  }

    /*  button.removeAttribute('class', 'closed-issue-btn')
    button.value = data.state
    button.classList.add('open-issue-btn')
    button.textContent = 'opened'
    console.log(button)
    console.log('............') */

    /*  if (data.state === 'opened') {
      console.log('öppen')
      button.setAttribute = ('class', '.open-issue-btn')
      button.textContent = 'öppen'

      console.log(button)
    } else {
      button.setAttribute = ('class', '.closed-issue-btn')
      button.textContent = 'stängd'
      console.log(button)
    } */

   /*  const template = document.querySelector('#issue-template').content.cloneNode(true) */
    // const listOfIssues = document.querySelector('.list-of-issues')
    // listOfIssues.querySelector(`.obj-class[name="${data.iid}"]`)
    /* const issueNode = issueTemplate.content.cloneNode(true) */

   /*  const title = template.querySelector('.title-in-table')
    const description = template.querySelector('.issue-description')
    const test = template.querySelector('.test')

    title.textContent = data.title
    description.Textcontent = data.description
    test.textContent = data.title */
  }

 /*  <tr class="obj-class"></tr>
  <th class="title-in-table"></th><br>
  <td class="issue-description"></td>
 */