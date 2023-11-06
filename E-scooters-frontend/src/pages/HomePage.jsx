import MapView from '../components/MapView'
import UserLocationButton from '../components/UserLocationButton'

import React from 'react'

import { useEffect, useState } from 'react'
import ScooterModal from '../components/ScooterModal'

import FilterIcon from '../components/FilterIcon'
import FilterModal from '../components/FilterModal'
import { ScooterHandler } from '../utils/ScooterHandler'
import Loader from '../components/Loader'
import CoordinatesUtils from '../utils/CoordinatesUtils'

const HomePage = () => {
	const [map, setMap] = useState(null)
	const [userPosition, setUserPosition] = useState(undefined)
	const [currentScooterInfo, setCurrentScooterInfo] = useState({})

	const [defaultScootersInfo, setDefaultScootersInfo] = useState([])
	const [allScootersInfo, setAllScootersInfo] = useState([])
	const [scootersToShow, setScootersToShow] = useState([])

	const [minBattery, setMinBattery] = useState(50)
	const [maxDistance, setMaxDistance] = useState(null)
	const [distanceRange, setDistanceRange] = useState(null)

	const [toggleElem, setToggleElem] = useState(false)
	const [showScooterModal, setShowScooterModal] = useState(false)

	const [brandsToShow, setBrandsToShow] = useState({
		bird: true,
		tier: true,
	})

	const [isLoading, setIsLoading] = useState(false)

	const toggleBrandShow = (brand) => {
		const brandsToShowTemp = { ...brandsToShow }

		brandsToShowTemp[brand] = !brandsToShowTemp[brand]

		setBrandsToShow(brandsToShowTemp)
	}

	const scooterClickHandler = (scooterInfo) => {
		setCurrentScooterInfo(scooterInfo)
	}

	const hideModal = () => {
		setShowScooterModal(false)
	}

	const showModal = () => {
		setShowScooterModal(true)
	}

	const getScooterData = async () => {
		const currentPos = map.getCenter()

		setIsLoading(true)
		const birdScooterInfo = await ScooterHandler.getScooterInfo(
			'bird',
			currentPos.lat,
			currentPos.lng
		)
		const tierScooterInfo = await ScooterHandler.getScooterInfo(
			'tier',
			currentPos.lat,
			currentPos.lng
		)

		const limitedBirdScooters = birdScooterInfo.birds.slice(0, 100)
		const limitedTierScooters = tierScooterInfo.data.slice(0, 100)

		const cleanBirdScooters = limitedBirdScooters.map((scooterInfo) => ({
			brand: 'bird',
			id: scooterInfo.id,
			batteryLevel: scooterInfo.battery_level,
			position: {
				lat: scooterInfo.location.latitude,
				lng: scooterInfo.location.longitude,
			},
			startPrice: 10,
			pricePerMin: 2.35,
		}))

		const cleanTierScooters = limitedTierScooters.map((scooterInfo) => ({
			brand: 'tier',
			id: scooterInfo.id,
			batteryLevel: scooterInfo.attributes.batteryLevel,
			position: {
				lat: scooterInfo.attributes.lat,
				lng: scooterInfo.attributes.lng,
			},
			startPrice: 10,
			pricePerMin: 2.5,
		}))

		setDefaultScootersInfo([...cleanBirdScooters, ...cleanTierScooters])

		setIsLoading(false)
	}

	useEffect(() => {
		if (userPosition) {
			let distanceRangeTemp = { min: 9999999999, max: -1 }
			setAllScootersInfo(defaultScootersInfo.map((scooter) => {
				const distance = CoordinatesUtils.findDistance(userPosition, scooter.position)
				distanceRangeTemp.min = Math.min(distance, distanceRangeTemp.min)
				distanceRangeTemp.max = Math.max(distance, distanceRangeTemp.max)
				return {
					...scooter,
					distance: distance
				}
			}))
			setDistanceRange(distanceRangeTemp)
			setMaxDistance(distanceRangeTemp.max)
		} else {
			setAllScootersInfo(defaultScootersInfo)
		}
	}, [defaultScootersInfo, userPosition])

	useEffect(() => {
		let scootersToShowTemp = allScootersInfo.filter(
			(scooterInfo) =>
				brandsToShow[scooterInfo.brand] &&
				scooterInfo.batteryLevel >= minBattery
		)
		if (maxDistance) {
			scootersToShowTemp = scootersToShowTemp.filter(
				(scooter) => scooter.distance <= maxDistance
			)
		}

		setScootersToShow(scootersToShowTemp)
	}, [brandsToShow, allScootersInfo, minBattery, maxDistance])



	return (
		<div>
			<MapView
				setMap={setMap}
				scooterClickHandler={scooterClickHandler}
				showModal={showModal}
				allScootersInfo={scootersToShow}
				setUserPosition={setUserPosition}
			/>

			<UserLocationButton map={map} />

			<ScooterModal
				currentScooterInfo={currentScooterInfo}
				show={showScooterModal}
				hideModal={hideModal}
				userPosition={userPosition}
			/>

			<FilterIcon toggleElem={toggleElem} setToggleElem={setToggleElem} />

			{toggleElem && (
				<FilterModal
					brandsToShow={brandsToShow}
					toggleBrand={toggleBrandShow}
					minBattery={minBattery}
					setMinBattery={setMinBattery}
					maxDistance={maxDistance}
					setMaxDistance={setMaxDistance}
					distanceRange={distanceRange}
				/>
			)}

			{isLoading && (
				<div className="fixed w-full h-full bg-black bg-opacity-[50%] flex justify-center items-center top-0">
					<Loader />
				</div>
			)}

			<div
				className={`fixed bottom-6 left-[50%] translate-x-[-50%] ${showScooterModal && 'hidden'
					}`}
			>
				<button
					onClick={() => getScooterData('bird')}
					className="bg-gray-50 p-2 rounded-md"
				>
					Get scooter data
				</button>
			</div>
		</div>
	)
}

export default HomePage
