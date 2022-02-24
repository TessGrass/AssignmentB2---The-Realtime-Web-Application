import '../socket.io/socket.io.js'

const taskTemplate = document.querySelector('#task-template')

if (taskTemplate) {
  // Create a socket connection using Socket.IO.
  const socket = window.io()

  // Listen for "tasks/create" message from the server.
  socket.on('issues/', (issue) => insertIssue(issue))

  /**
   * 
   * @param {*} issue 
   */
  function insertIssue (issue) {
    if (!taskList.querySelector(`[obj-id="${obj.id}"]`)) {
      const taskNode = taskTemplate.content.cloneNode(true)
    }
  }
}
