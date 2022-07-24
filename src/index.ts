import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import express from 'express'

import './controllers/login'
import { router } from './router'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] }))
app.use(router)

app.listen(3001, () => {
	console.log('server is running at http://localhost:3001')
})