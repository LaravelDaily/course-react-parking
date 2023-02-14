import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { route } from '@/routes'

function ParkingDetails() {
  const { id } = useParams()
  const [parking, setParking] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    getParking(id, { signal: controller.signal })
    return () => controller.abort()
  }, [id])

  async function getParking(id, { signal } = {}) {
    return axios.get(`parkings/${id}`, { signal })
      .then(response => setParking(response.data.data))
      .catch(() => {})
  }

  return (parking &&
    <div className="flex flex-col mx-auto md:w-96 w-full">

      <h1 className="heading">Parking order details</h1>

      <div className="border p-2 font-mono">
        <div className="font-bold uppercase mb-4">
          parking order #{ parking.id }
        </div>

        <div className="font-bold uppercase">license plate</div>
        <div className="plate text-2xl">
          { parking.vehicle.plate_number }
        </div>

        <div className="font-bold uppercase">description</div>
        <div>{ parking.vehicle.description }</div>

        <div className="font-bold uppercase">zone</div>
        <div>{ parking.zone.name }</div>

        <div className="font-bold uppercase">price</div>
        <div>
          { (parking.zone.price_per_hour / 100).toFixed(2) }{' '}
          &euro; per hour
        </div>

        <div className="font-bold uppercase">from</div>
        <div>{ parking.start_time }</div>

        <div className="font-bold uppercase">to</div>
        <div>{ parking.stop_time }</div>

        <div className="font-bold uppercase">total</div>
        <div className="text-xl">
          { (parking.total_price / 100).toFixed(2) } &euro;
        </div>
      </div>

      <div className="border-t h-[1px] my-6"></div>

      <Link
        to={ route('parkings.history') }
        className="btn btn-secondary uppercase"
      >
        return
      </Link>
    </div>
  )
}

export default ParkingDetails
