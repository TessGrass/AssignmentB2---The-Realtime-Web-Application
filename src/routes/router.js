import express from 'express'

import { router as homeRouter } from './home-router.js'
import { router as issuesRouter } from './issues-router.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/issues', issuesRouter)
