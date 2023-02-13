import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner'
import { useVehicles } from '@/hooks/useVehicles'
import { useZones } from '@/hooks/useZones'
import { useParking } from '@/hooks/useParking'

function OrderParking() {
  const navigate = useNavigate()
  const { errors, loading, startParking } = useParking()
  const { zones } = useZones()
  const { vehicles } = useVehicles()
  const [vehicle_id, setVehicleId] = useState()
  const [zone_id, setZoneId] = useState()

  useEffect(() => setVehicleId(vehicles[0]?.id), [vehicles])
  useEffect(() => setZoneId(zones[0]?.id), [zones])

  async function handleSubmit(event) {
    event.preventDefault()

    await startParking({ vehicle_id, zone_id })
  }

  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">

        <h1 className="heading">Order Parking</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="vehicle_id" className="required">Vehicle</label>
          <select
            id="vehicle_id"
            className="form-input"
            value={ vehicle_id }
            onChange={ (event) => setVehicleId(event.target.value) }
            disabled={ loading }
          >
            { vehicles.length > 0 && vehicles.map((vehicle) => {
              return <option key={ vehicle.id } value={ vehicle.id }>
                { vehicle.plate_number.toUpperCase() }{' '}
                { vehicle.description && '('+vehicle.description+')' }
              </option>
            }) }
          </select>
          <ValidationError errors={ errors } field="vehicle_id" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="zone_id" className="required">Zone</label>
          <select
            name="zone_id"
            id="zone_id"
            value={ zone_id }
            className="form-input"
            onChange={ (event) => setZoneId(event.target.value) }
            disabled={ loading }
          >
            { zones.length > 0 && zones.map((zone) => {
              return <option key={ zone.id } value={ zone.id }>
                { zone.name }{' '}
                ({ (zone.price_per_hour / 100).toFixed(2) } &euro;/h)
              </option>
            }) }
          </select>
          <ValidationError errors={ errors } field="zone_id" />
          <ValidationError errors={ errors } field="general" />
        </div>

        <div className="border-t h-[1px] my-6"></div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={ loading }
          >
            { loading && <IconSpinner /> }
            Start Parking
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            disabled={ loading }
            onClick={ () => navigate(route('parkings.active')) }
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default OrderParking
