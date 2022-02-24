import '../socket.io/socket.io.js'

const taskTemplate = document.querySelector('#task-template')
console.log('index.js')

if (taskTemplate) {
  // Create a socket connection using Socket.IO.
  const socket = window.io()

  // Listen for "tasks/create" message from the server.
  socket.on('issues/', (issue) => insertIssue(issue))

  /**
   * Update with issues.
   *
   * @param {*} issue  - the issue that is being add.
   */
  function insertIssue (issue) {
    const listOfIssues = document.querySelector('.list-of-issue')

    if (!listOfIssues.querySelector(`[obj-id="${issue.id}"]`)) {
      const issueNode = taskTemplate.content.cloneNode(true)

      const row = issueNode.querySelector('tr')
      const title = issueNode.querySelector('.title-in-table')
      const description = issueNode.querySelector('.issue-description')

      row.setAttribute('obj-id', issue.id)
      title.textContent = issue.title
      description.textContent = issue.description
    }
  }
}
