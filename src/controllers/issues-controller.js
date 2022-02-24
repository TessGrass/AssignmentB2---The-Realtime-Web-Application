
import fetch from 'node-fetch'
/**
 * Exports the IssuesController class.
 *
 */
export class IssuesController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      console.log('index issues-controller')
      const fetchedData = await fetch(`https://gitlab.lnu.se/api/v4/projects/${process.env.PROJECT_ID}/issues?private_token=${process.env.TOKEN}`)
      const result = await fetchedData.json()
      const data = result.map(data => ({

        id: `${data.id}`,
        iid: `${data.iid}`,
        title: `${data.title}`,
        description: `${data.description}`,
        author: `${data.author.name}`,
        state: `${data.state}`
      }))

      res.render('../views/issues/issues', { data })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates the state of a specific issue.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateState (req, res, next) {
    const id = Object.keys(req.body)[0]
    const state = Object.values(req.body)[0]
    console.log(id, state)
    let currentState = ''

    currentState = state === 'opened' ? 'close' : 'reopen'
    const respons = await fetch(`https://gitlab.lnu.se/api/v4/projects/${process.env.PROJECT_ID}/issues/${id}?state_event=${currentState}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer + ${process.env.TOKEN}`
      }
    })
    console.log(respons)
  }
}

// "https://gitlab.example.com/api/v4/projects/4/issues/85?state_event=close"
      /*  'Content-type': 'application/json', */ // how to tell if it's needed? https://dmitripavlutin.com/fetch-with-json/
