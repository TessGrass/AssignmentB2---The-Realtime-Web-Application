
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
   * Get the data from webhook.
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
      console.log(req.body)
      if (req.body.event_type === 'issue') {
        data = {
          iid: req.body.object_attributes.iid,
          title: req.body.object_attributes.title,
          description: req.body.object_attributes.description,
          state: req.body.object_attributes.state,
          author: req.body.user.name,
          avatar: req.body.user.avatar_url
        }
      }
      // It is important to respond quickly!
      res.status(200).end()

      // Put this last because socket communication can take long time.
      if (data) {
        console.log('emit')
        if (req.body.changes.updated_at.previous === null) {
          res.io.emit('newIssue', data)
        } else {
          res.io.emit('issues', data)
        }
      }
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.status = 500
      next(err)
    }
  }
}
