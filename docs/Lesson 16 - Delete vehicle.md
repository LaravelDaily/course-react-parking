# Lesson 16 - Delete vehicle

The final step in completing the vehicles CRUD operation is to implement the delete button functionality in the index view. This should be a quick and straightforward process.

1. Extend the `src/hooks/useVehicle.jsx` hook.

Add new `destroyVehicle` function.

```jsx
async function destroyVehicle(vehicle) {
  return axios.delete(`vehicles/${vehicle.id}`)
}
```

And return it along with the other function in return statements.

```jsx
return {
  vehicle: { data, setData, errors, loading },
  createVehicle,
  updateVehicle,
  destroyVehicle,
}
```

Whole `src/hooks/useVehicle.jsx` file has the following content.

```jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'

export function useVehicle(id = null) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (id !== null) {
      const controller = new AbortController()
      getVehicle(id, { signal: controller.signal })
      return () => controller.abort()
    }
  }, [id])

  async function createVehicle(vehicle) {
    setLoading(true)
    setErrors({})

    return axios.post('vehicles', vehicle)
      .then(() => navigate(route('vehicles.index')))
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  async function getVehicle(id, { signal } = {}) {
    setLoading(true)

    return axios.get(`vehicles/${id}`, { signal })
      .then(response => setData(response.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  async function updateVehicle(vehicle) {
    setLoading(true)
    setErrors({})

    return axios.put(`vehicles/${vehicle.id}`, vehicle)
      .then(() => navigate(route('vehicles.index')))
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  async function destroyVehicle(vehicle) {
    return axios.delete(`vehicles/${vehicle.id}`)
  }

  return {
    vehicle: { data, setData, errors, loading },
    createVehicle,
    updateVehicle,
    destroyVehicle,
  }
}
```

2. Extend the `src/hooks/useVehicles.jsx` hook by exposing `getVehicles` function in the return statement, we need to call this function outside of the hook when we delete the vehicle record to re-fetch the list.

```jsx
return { vehicles, getVehicles }
```

Whole `src/hooks/useVehicles.jsx` file has the following content.

```jsx
import { useState, useEffect } from 'react'

export function useVehicles() {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    getVehicles({ signal: controller.signal })
    return () => { controller.abort() }
  }, [])

  async function getVehicles({ signal } = {}) {
    return axios.get('vehicles', { signal })
      .then(response => setVehicles(response.data.data))
      .catch(() => {})
  }

  return { vehicles, getVehicles }
}
```

3. Update the `src/views/vehicles/VehiclesList.jsx` component as follows.

Import `useVehicle` hook and destructure return contents to have `destroyVehicle` function in scope.

```jsx
import { useVehicle } from '@/hooks/useVehicle'

// ...

const { destroyVehicle } = useVehicle()
```

Do the same with `useVehicles` and `getVehicles` function.

```jsx
const { vehicles, getVehicles } = useVehicles()
```

Now we can update the button itself.

From

```jsx
<button type="button" className="btn text-white bg-red-600 hover:bg-red-500 text-sm">
```

To

```jsx
<button
  type="button"
  className="btn text-white bg-red-600 hover:bg-red-500 text-sm"
  onClick={ async () => {
    await destroyVehicle(vehicle)
    await getVehicles()
  } }
>
  X
</button>
```

Here we just added `onClick` handler to the button. First to send a request to server to delete a vehicle, and re-fetch the whole vehicles list.

Full `src/views/vehicles/VehiclesList.jsx` file now should have the following content.

```jsx
import { Link } from 'react-router-dom'
import { route } from '@/routes'
import { useVehicles } from '@/hooks/useVehicles'
import { useVehicle } from '@/hooks/useVehicle'

function VehiclesList() {
  const { vehicles, getVehicles } = useVehicles()
  const { destroyVehicle } = useVehicle()

  return (
    <div className="flex flex-col mx-auto md:w-96 w-full">

      <h1 className="heading">My Vehicles</h1>

      <Link to={ route('vehicles.create') } className="btn btn-primary">
        Add Vehicle
      </Link>

      <div className="border-t h-[1px] my-6"></div>

      <div className="flex flex-col gap-2">
        { vehicles.length > 0 && vehicles.map(vehicle => {
          return (
            <div
              key={ vehicle.id }
              className="flex bg-gray-100 w-full p-2 justify-between"
            >
              <div className="flex items-center overflow-hidden w-full">
                <div className="text-xl plate">
                  { vehicle.plate_number }
                </div>
                <div className="font-normal text-gray-600 pl-2 grow truncate">
                  { vehicle.description }
                </div>
              </div>
              <div className="flex gap-1">
                <Link
                  to={ route('vehicles.edit', { id: vehicle.id }) }
                  className="btn btn-secondary text-sm"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn text-white bg-red-600 hover:bg-red-500 text-sm"
                  onClick={ async () => {
                    await destroyVehicle(vehicle)
                    await getVehicles()
                  } }
                >
                  X
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VehiclesList
```

Well done! You have successfully completed the implementation of full functionality for the user's vehicles. Now, let's move on to the next lesson and implement parking.