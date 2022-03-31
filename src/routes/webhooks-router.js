
import express from 'express'
import { WebhooksController } from '../controllers/webhooks-controller.js'

export const router = express.Router()

const controller = new WebhooksController()

router.post('/', controller.authenticate, controller.indexWebhooks)
