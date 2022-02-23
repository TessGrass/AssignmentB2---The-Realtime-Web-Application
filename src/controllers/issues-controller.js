
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
      const data = await fetchedData.json()
      const result = data.map(data => ({

        id: `${data.id}`,
        title: `${data.title}`,
        author: `${data.author.name}`,
        state: `${data.state}`
      }))

      console.log(result)
      console.log(data)
      res.render('../views/issues/issues', { data })
    } catch (error) {
      next(error)
    }
  }
}
