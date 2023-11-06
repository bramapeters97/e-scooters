import axios from 'axios'

const BASE_URL = 'http://localhost:5000/'
// !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
// 	? 'http://localhost:5000/'
// 	: 'https://shrouded-dawn-19777.herokuapp.com/'

export const ScooterHandler = {
	async getTierBikes(lat, lng) {
		try {
			const response = await axios({
				method: 'get',
				url: BASE_URL + 'tier',
				params: {
					latitude: lat,
					longitude: lng,
					radius: 1000,
				},
			})

			return response.data
		} catch (error) {
			return error
		}
	},
	async getBirdBikes(lat, lng) {
		try {
			const response = await axios({
				method: 'get',
				url: BASE_URL + 'bird',
				params: {
					latitude: lat,
					longitude: lng,
					radius: 1000,
				},
			})

			return response.data
		} catch (error) {
			return error
		}
	},

	async getScooterInfo(brand, lat, lng) {
		const getScooterFrom = {
			tier: ScooterHandler.getTierBikes,
			bird: ScooterHandler.getBirdBikes,
		}

		return await getScooterFrom[brand](lat, lng)
	},
}
