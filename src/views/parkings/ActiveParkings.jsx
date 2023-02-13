import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { route } from '@/routes'

function ActiveParkings() {
  const [parkings, setParkings] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    getActiveParkings({ signal: controller.signal })
    return () => controller.abort()
  }, [])

  async function getActiveParkings({ signal } = {}) {
    return axios.get('parkings', { signal })
      .then(response => setParkings(response.data.data))
      .catch(() => {})
  }

  async function stopParking(parking) {
    await axios.put(`parkings/${parking.id}`)
    await getActiveParkings()
  }

  return (
    <div className="flex flex-col mx-auto md:w-96 w-full">

      <h1 className="heading">Active Parkings</h1>

      <Link to={ route('parkings.create') } className="btn btn-primary">
        Order Parking
      </Link>

      <div className="border-t h-[1px] my-6"></div>

      <div className="flex flex-col gap-1">
        { parkings.length > 0 && parkings.map((parking) => {
          return <div
            key={ parking.id }
            className="flex flex-col p-2 border gap-1"
          >
            <div className="plate text-2xl">
              { parking.vehicle.plate_number }
            </div>
            <div className="text-sm text-gray-600">
              { parking.vehicle.description }
            </div>
            <div className="bg-gray-100 p-2">
              { parking.zone.name }{' '}
              ({ (parking.zone.price_per_hour / 100).toFixed(2) } &euro;/h)
            </div>
            <div>
              <div className="font-bold uppercase">from</div>
              <span className="font-mono">{ parking.start_time }</span>
            </div>
            <div className="flex items-top">
              <span className="text-2xl font-bold text-blue-600">
                { (parking.total_price / 100).toFixed(2) }
              </span>
              <span className="pt-0.5">&nbsp;&euro;</span>
            </div>
            <button
              type="button"
              className="btn btn-danger uppercase ml-auto"
              onClick={ () => stopParking(parking) }
            >
              stop
            </button>
          </div>
        })}
      </div>
    </div>
  )
}

export default ActiveParkings
