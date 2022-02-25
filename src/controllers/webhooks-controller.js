
/**
 * Represents a WebhooksController
 */
export class WebhooksController {
/**
 * Authenticate the webhook.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
  authenticate (req, res, next) {
    console.log('athenticate webhook')
    if (req.headers['x-gitlab-token'] !== process.env.WEBHOOK_SECRET) {
      const error = new Error('Invalid token')
      error.status = 401
      next(error)
      return
    }

    next()
  }

  /**
   * 
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async indexWebhooks (req, res, next) {
    try {
      // Only interested in issues events. (But still, respond with a 200
      // for events not supported.)
      let data = null
      if (req.body.event_type === 'issue') {
        data = {
          id: req.body.object_attributes.id,
          iid: req.body.object_attributes.iid,
          title: req.body.object_attributes.title,
          description: req.body.object_attributes.description,
          state: req.body.object_attributes.state
        }
        console.log('index webhooks')
      }

      // It is important to respond quickly!
      res.status(200).end()

      // Put this last because socket communication can take long time.
      if (data) {
        console.log('emit')
        res.io.emit('issues', data)
      }
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.status = 500
      next(err)
    }
  }
}
