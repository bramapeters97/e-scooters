const express = require('express')
const app = express()
const cors = require('cors')

const TierHandler = require('./TierHandler')
const BirdHandler = require('./BirdHandler')

app.use(cors())

const PORT = 5000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.get('/tier', async (req, res) => {
	const scooterInfo = await TierHandler.getScootersInfo(
		req.query.latitude,
		req.query.longitude,
		req.query.radius
	)

	res.json(scooterInfo)
})

app.get('/bird', async (req, res) => {
	const accessToken = await BirdHandler.refreshAccessToken()

	const scooterInfo = await BirdHandler.getScootersInfo(
		accessToken,
		req.query.latitude,
		req.query.longitude,
		req.query.radius
	)

	res.json(scooterInfo)
})

app.get('/test', async (req, res) => {
	res.json('Working! :)')
})

// - Example requests -
// http://localhost:5000/bird?latitude=59.30310097548764&longitude=18.098237514495853&radius=100
// http://localhost:5000/tier?latitude=59.30310097548764&longitude=18.098237514495853&radius=100
// https://shrouded-dawn-19777.herokuapp.com/bird?latitude=59.30310097548764&longitude=18.098237514495853&radius=100
// https://shrouded-dawn-19777.herokuapp.com/tier?latitude=59.30310097548764&longitude=18.098237514495853&radius=100
