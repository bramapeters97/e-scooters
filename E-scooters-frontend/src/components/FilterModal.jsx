import { useEffect } from 'react'
import React from 'react'


import BirdMarker from '../resources/bird_pin.svg'
import TierMarker from '../resources/tier_pin.svg'
import Slider from '@mui/material/Slider'

const FilterModal = ({
	minBattery,
	setMinBattery,
	maxDistance,
	setMaxDistance,
	distanceRange,
	brandsToShow,
	toggleBrand,
}) => {
	const scooterBrands = [
		{
			brand: 'bird',
			icon: BirdMarker,
		},
		{
			brand: 'tier',
			icon: TierMarker,
		},
	]

	useEffect(() => { }, [])

	let distanceSlider = null
	if (distanceRange) {
		const stepCount = 20
		const step = parseInt((distanceRange.max - distanceRange.min) / stepCount)
		distanceSlider =
			<>
				<span className="text-gray-900 my-px">Max. distance ({maxDistance}m)</span>
				<Slider
					value={maxDistance}
					aria-label="Default"
					valueLabelDisplay="auto"
					step={step}
					marks
					min={distanceRange.max - step * stepCount}
					max={distanceRange.max}
					onChange={(e) => setMaxDistance(e.target.value)}
				/>
			</>
	}

	return (
		<div className="w-full bg-white p-3 flex flex-col">
			<span className="text-gray-900 my-px">Min. battery ({minBattery}%)</span>
			<Slider
				defaultValue={minBattery}
				aria-label="Default"
				valueLabelDisplay="auto"
				step={10}
				marks
				min={0}
				max={100}
				onChange={(e) => setMinBattery(e.target.value)}
			/>

			{distanceSlider}

			<span className="text-gray-900">Brands</span>
			<div className="h-10 flex">
				{scooterBrands.map((scooterBrand) => (
					<img
						src={scooterBrand.icon}
						alt={scooterBrand.brand}
						className={`h-full first:mr-2 ${!brandsToShow[scooterBrand.brand] && 'opacity-30'
							}`}
						onClick={() => toggleBrand(scooterBrand.brand)}
					/>
				))}
			</div>
		</div>
	)
}
export default FilterModal
