const axios = require('axios')

const headers = {
	'X-Api-Key': 'bpEUTJEBTf74oGRWxaIcW7aeZMzDDODe1yBoSxi2',
}

const TierHandler = {
	async getScootersInfo(lat, long, radius) {
		try {
			const response = await axios({
				method: 'get',
				url: `https://platform.tier-services.io/v1/vehicle?lat=${lat}&lng=${long}&radius=${radius}`,
				headers: headers,
			})

			return response.data
		} catch (error) {
			console.log(error)
		}
	},
}

module.exports = TierHandler
