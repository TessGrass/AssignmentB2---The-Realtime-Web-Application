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
    console.log('updateissue')
    const listOfIssues = document.querySelector('.list-of-issues')
    console.log(data.iid)
    if (listOfIssues.querySelector(`.obj-class[name="${data.iid}"]`)) {
      const issueNode = issueTemplate.content.cloneNode(true)

      const row = issueNode.querySelector('tr')
      const title = issueNode.querySelector('.title-in-table')
      const description = issueNode.querySelector('.issue-description')

      row.setAttribute('obj-id', data.iid)
      title.textContent = data.title
      description.textContent = data.description
    }
  }
}
