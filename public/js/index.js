
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
   * Update the issue.
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
    console.log('newIssue')
    const template = document.querySelector('#issue-template').content.cloneNode(true)
    const bodywrapper = document.querySelector('.bodywrapper')
    template.querySelector('.issue-wrapper').setAttribute('id', `${data.iid}`)
    template.querySelector('form').setAttribute('id', `${data.iid}`)
    template.querySelector('.title-in-issue').textContent = `# ${data.iid}. ${data.title}`
    template.querySelector('.issue-description').textContent = data.description
    template.querySelector('img').src = data.avatar
    template.querySelector('.author').textContent = data.author
    template.querySelector('input').setAttribute('name', 'id')
    template.querySelector('input').setAttribute('value', `${data.iid}`)
    template.querySelector('button').setAttribute('class', 'open-issue-btn')
    template.querySelector('button').setAttribute('value', `${data.state}`)
    template.querySelector('button').textContent = 'opened'

    bodywrapper.insertBefore(template, bodywrapper.firstElementChild)
  }
}
