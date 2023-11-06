import React from 'react'


const ScooterModal = ({
	currentScooterInfo,
	show = true,
	hideModal,
}) => {
	let distanceInfo = undefined,
		priceInfo = undefined
	if (show) {
		if (currentScooterInfo.distance) {
			distanceInfo = (
				<div className="flex justify-between pt-1">
					<p className="text-white">Distance</p>
					<b className="text-white">{currentScooterInfo.distance.toFixed(0) + 'm'}</b>
				</div>
			)
		}
		if (currentScooterInfo.displayPrice !== undefined) {
			priceInfo = (
				<div className="flex justify-between pt-1">
					<p className="text-white">Cost</p>
					<b className="text-white">{currentScooterInfo.displayPrice}</b>
				</div>
			)
		}
	}

	return (
		<div
			className={`${
				!show && 'translate-y-[100%]'
			} w-full fixed bg-gray-900 bottom-0 p-3 border rounded-t-2xl duration-200`}
		>
			<div className="flex justify-between">
				<h1 className="capitalize text-3xl text-white">
					{currentScooterInfo?.brand}
				</h1>
				<button
					className="bg-white text-gray-900 flex justify-center items-center w-[30px] h-[30px] rounded-full"
					onClick={hideModal}
				>
					X
				</button>
			</div>

			<div className="w-full h-[2px] bg-white" />
			<div className="flex justify-between pt-1">
				<p className="text-white">Battery: </p>
				<b className="text-white">{currentScooterInfo.batteryLevel}%</b>
			</div>

			<div className="flex justify-between pt-1">
				<p className="text-white">Starting cost: </p>
				<b className="text-white">{currentScooterInfo.startPrice} kr</b>
			</div>

			<div className="flex justify-between pt-1">
				<p className="text-white">Cost per minute: </p>
				<b className="text-white">{currentScooterInfo.pricePerMin} kr</b>
			</div>
			{distanceInfo}
			{priceInfo}

			<div className="w-full flex justify-center">
				<button className="text-gray-900 bg-white px-3 py-2 mt-2 rounded-md">
					Open {currentScooterInfo.brand} app
				</button>
			</div>
		</div>
	)
}

export default ScooterModal
