
console.log('index.js hej')
const issueTemplate = document.querySelector('#issue-template')

if (issueTemplate) {
  await import('../socket.io/socket.io.js')
  console.log('issueTemplate')
  const base = document.querySelector('base')
  const path = base
    ? (new URL('socket.io', base.href)).pathname
    : '/socket.io'
  const socket = window.io.connect('/', { path })


  // Listen for "tasks/create" message from the server.
  socket.on('issues', (data) => updateIssue(data))

  /**
   * Update with issues.
   *
   * @param {*} data - the issue that is being add.
   */
  function updateIssue (data) {
    const openButton = document.querySelector('.open-issue-btn')
    const closedButton = document.querySelector('.closed-issue-btn')
    console.log(data.state)

    if (data.state === 'opened') {
      openButton.textContent = 'rövhatt'
    } else {
      console.log('closed')
      closedButton.textContent = 'gorilla'
    }
    console.log(closedButton)
    console.log(openButton)
   
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
}

 /*  <tr class="obj-class"></tr>
  <th class="title-in-table"></th><br>
  <td class="issue-description"></td>
 */