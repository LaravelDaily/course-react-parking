import { Outlet } from 'react-router-dom'
import NamedLink from '@/components/NamedLink'

function App() {
  return (
    <div className="App">
      <header className="py-6 bg-gray-100 shadow">
        <div className="container md:px-2 px-4 mx-auto">
          <nav className="flex gap-4 justify-between">
            <div className="flex gap-4 items-center">
              <h2 className="text-xl font-bold">
                <div
                  className="inline-flex items-center justify-center bg-blue-600 w-6 h-6 text-center text-white rounded mr-1"
                >
                  P
                </div>
                myParking
              </h2>
              <NamedLink name="home">
                Home
              </NamedLink>
              <NamedLink name="vehicles.index">
                Vehicles
              </NamedLink>
            </div>
            <div className="flex gap-4 items-center">
              <NamedLink name="register">
                Register
              </NamedLink>
            </div>
          </nav>
        </div>
      </header>
      <div className="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default App
