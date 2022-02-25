console.log('index.js hej')
const issueTemplate = document.querySelector('#issue-template')

if (issueTemplate) {
  console.log('issueTemplate')
  await import('../socket.io/socket.io.js')
  const socket = window.io()

  // Listen for "tasks/create" message from the server.
  socket.on('issues', (data) => updateIssue(data))

  /**
   * Update with issues.
   *
   * @param {*} data - the issue that is being add.
   */
  function updateIssue (data) {
    const template = document.querySelector('#issue-template').content.cloneNode(true)
    // const listOfIssues = document.querySelector('.list-of-issues')
    // listOfIssues.querySelector(`.obj-class[name="${data.iid}"]`)
    /* const issueNode = issueTemplate.content.cloneNode(true) */

    const title = template.querySelector('.title-in-table')
    const description = template.querySelector('.issue-description')

    title.textContent = data.title
    description.textContent = data.description
  }
}

 /*  <tr class="obj-class"></tr>
  <th class="title-in-table"></th><br>
  <td class="issue-description"></td>
 */