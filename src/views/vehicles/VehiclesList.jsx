import { Link } from 'react-router-dom'
import { route } from '@/routes'

function VehiclesList() {
  return (
    <div className="flex flex-col mx-auto md:w-96 w-full">

      <h1 className="heading">My Vehicles</h1>

      <Link to={ route('vehicles.create') } className="btn btn-primary">
        Add Vehicle
      </Link>

      <div className="border-t h-[1px] my-6"></div>

      <div>There will be vehicles list</div>
    </div>
  )
}

export default VehiclesList
