
import express from 'express'
import { HomeController } from '../controllers/home-controller.js'
export const router = express.Router()

const controller = new HomeController()
console.log('längre in')

router.get('/', (req, res, next) => controller.index(req, res, next))
