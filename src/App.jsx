import { Outlet, NavLink } from 'react-router-dom'

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
              <NavLink end to="/" className={ ({isActive}) => {
                return isActive ? 'text-blue-600 underline' : 'text-blue-600'
              } }>Home</NavLink>
            </div>
            <div className="flex gap-4 items-center">
              <NavLink end to="/register" className={ ({isActive}) => {
                return isActive ? 'text-blue-600 underline' : 'text-blue-600'
              } }>Register</NavLink>
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
