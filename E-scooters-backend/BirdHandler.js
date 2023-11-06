const axios = require('axios')

const REFRESH_TOKEN_LOCAL =
	'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyZDI3Y2I1Ni00N2U1LTQxMTgtYThkZC0zYWNjMmI3OGExOGYiLCJuYmYiOjE2Mzg0NTM2MjEsImV4cCI6MTY1NDUyNDAyMSwiYXVkIjoiYmlyZC5zZXJ2aWNlcyIsImlzcyI6ImJpcmQuYXV0aCIsImlhdCI6MTYzODQ1MzYyMSwicm9sZXMiOlsiVVNFUiJdLCJhcHAiOiI3YjhlZDk1NS02ZTNhLTRlZWMtYmEyMC04OGFmOWQ3YWVhNzYiLCJ2ZXIiOiIwLjAuMiJ9.P_b6MulHVI4KTsoU-xdxWx2qqsqo1C3J177tDYs94SQ8mAj7NLO-fexvxP2fioNdDSINqta0xXJhmybOGOhJU9tCLVcOtCiDhfSl894AvXYafXRiY5AeJw1EHQk7UhMkl6VW5TdQlUtzXyxIWlu1fhsSqK2CH0D5ypk-zN0uzYcwMfRElf57OFZJw8kK5Bx2ikGDQZzjfkSktwSipN4_oNgWNLoxHmtgq5h-vN2E2XvW6rdzj-ci3HIm3u4JAJXe_QWSAIp0yzIghr9Se5NEVmdpAZdBnKDj3oY_2HNjcf4SM-3reSbTEbmmKyb6D8Udb6XzHCacCNI7zUtS6ApwvgrrB566MkCvOhtj6Zx9LqQL66Wm68NlqPRo-nHHPRB2yVPyM4Ipn_7V3vLF9OObDeGXSsMPovIUvqRuQXgmjKjfR-20H8w7MDve2SebT1ipYnJFWHDBbv4nkcoP1rIZnA5Q3AHGUGY-i8AYRWRmFzrcmXfhR2dWNNBwStADBVOTbmlPFItO39W_386Xw6l7KTXUdValpUeW9ESA-zgf-TQQQo7h65eBd4mFwiYuUzvFnEWCvnb-zrc6_cVUhym2GaNztw2ZEx2207n12MuPLVTT61_mvPW3VuPQOD03VBlHOp30kNoAtkhQVgEV76DSu33WJgUAPrTD01QYJJwIcWA'

const REFRESH_TOKEN_PRODUCTION = ''
  
// const IN_DEVELOPMENT = !(!process.env.NODE_ENV || process.env.NODE_ENV)
const IN_DEVELOPMENT = true

const PRODUCTION_UUID = 'eb53bf66-3e3e-4940-9a4a-c0a20d3a5ede'

const BirdHandler = {
	async getAuthToken() {
		try {
			const response = await axios({
        method: "post",
        url: 'https://api-auth.prod.birdapp.com/api/v1/auth/email',
        data: JSON.stringify({ email: IN_DEVELOPMENT ? 'rasmusrudling@gmail.com' : 'rrudling@kth.se' }),
        headers: {
          'User-Agent':
            'Bird/4.119.0(co.bird.Ride; build:3; iOS 14.3.0) Alamofire/5.2.2',
          'Device-Id': IN_DEVELOPMENT ? '9975c19e-9873-468f-aa86-cfd3831ff349' : PRODUCTION_UUID,
          Platform: 'ios',
          'App-Version': '4.119.0',
          'Content-Type': 'application/json',
        }
      })
      
			return response
		} catch (error) {
			return error
		}
	},
	async getAccessAndRefreshToken() {
		console.log('getAccessAndRefreshToken')
		const body = { token: IN_DEVELOPMENT ? 'Qnn1AId9CRmSZETwEvef4kw' : '' }

		const headers = {
			'User-Agent':
				'Bird/4.119.0(co.bird.Ride; build:3; iOS 14.3.0) Alamofire/5.2.2',
			'Device-Id': IN_DEVELOPMENT ? '9975c19e-9873-468f-aa86-cfd3831ff349' : PRODUCTION_UUID,
			Platform: 'ios',
			'App-Version': '4.119.0',
			'Content-Type': 'application/json',
		}

		try {
			const response = await axios.post(
				'https://api-auth.prod.birdapp.com/api/v1/auth/magic-link/use',
				body,
				{
					headers,
				}
			)

			const refreshToken = response.data.refresh
			return refreshToken
		} catch (error) {
			return error
		}
	},
	async refreshAccessToken() {
		const headers = {
			'User-Agent':
				'Bird/4.119.0(co.bird.Ride; build:3; iOS 14.3.0) Alamofire/5.2.2',
			'Device-Id': IN_DEVELOPMENT ? '9975c19e-9873-468f-aa86-cfd3831ff349' : PRODUCTION_UUID,
			Platform: 'ios',
			'App-Version': '4.119.0',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${REFRESH_TOKEN_LOCAL}`,
		}

		try {
			const response = await axios({
				method: 'post',
				url: 'https://api-auth.prod.birdapp.com/api/v1/auth/refresh/token',
				headers: headers,
			})

			const accessToken = response.data.access

			return accessToken
		} catch (error) {
			return error
		}
	},
	async getScootersInfo(accessToken, lat, long, radius) {
    const locationString = JSON.stringify({"latitude":lat, "longitude": long,"altitude": 28,"accuracy": 65, "speed": -1, "heading": -1})

		const headers = {
			Authorization: `Bearer ${accessToken}`,
			'User-Agent':
				'Bird/4.119.0(co.bird.Ride; build:3; iOS 14.3.0) Alamofire/5.2.2',
			legacyrequest: false,
			'Device-id': IN_DEVELOPMENT ? '9975c19e-9873-468f-aa86-cfd3831ff349' : PRODUCTION_UUID,
			'App-Version': '4.119.0',
			Location: locationString,
		}

		try {
			const response = await axios({
				method: 'get',
				url: 'https://api-bird.prod.birdapp.com/bird/nearby',
				headers: headers,
				params: {
					latitude: lat,
					longitude: long,
					radius,
				},
			})

			return response.data
		} catch (error) {
			return error
		}
	},
}

module.exports = BirdHandler
