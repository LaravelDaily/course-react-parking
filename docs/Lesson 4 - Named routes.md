# Lesson 4 - Named routes

As you already noticed, React Router doesn't have a centralized route config, so there's nothing to name. React Router provides the correct primitives and lets the community create higher level APIs around them if needed.

This is exactly what we are going to do in this lesson.

1. Create new file `src/routes/index.jsx`.

```jsx
const routeNames = {
  'home': '/',
  'register': '/register',
}

function route(name, params = {}) {
  let url = routeNames[name]

  for (let prop in params) {
    if (Object.prototype.hasOwnProperty.call(params, prop)) {
      url = url.replace(`:${prop}`, params[prop])
    }
  }

  return url
}

export { route }
```

The constant `routeNames` is going to hold our route name as key, and route url as value.

Helper function `route()` will act in the same way as Laravel's `route()` function. First argument is going to accept the route name. Second argument will accept route parameters and then return the url.

2. Now update the `src/main.jsx` file with following content.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '@/App'
import Home from '@/views/Home'
import Register from '@/views/auth/Register'
import '@/assets/main.css'
import { route } from '@/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ route('home') } element={<App />}>
          <Route index element={<Home />} />
          <Route path={ route('register') } element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
```

We imported our helper function `route()` and are able to use it like this.

```jsx
<Route path={ route('register') } element={<Register />} />
```

> Note that JavaScript is case-sensitive language. `Route` and `route` have two completely different identities.

3. We also would like to use `<NavLink>` in same way. To have properties in our component first we need to install `prop-types` package.

```shell
npm install prop-types --save
```

> `React.PropTypes` has moved into a different package since React v15.5.

Now it is time to create new component `src/components/NamedLink.jsx` to wrap that functionality inside.

```jsx
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { route } from '@/routes'

function NamedLink(props) {
  return (
    <NavLink
      end
      to={ route(props.name) }
      className={({ isActive }) => isActive ?
        'text-blue-600 underline' :
        'text-blue-600'
      }
    >
      { props.children }
    </NavLink>
  )
}

NamedLink.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default NamedLink
```

Our new `<NamedLink>` component has all the features of `<NavLink>` and has two properties.

`name` will be our route name, and `children` are the content inside this component which will be passed further to `<NavLink>`.

Now we can consume it like in the example below.

```jsx
import NamedLink from '@/components/NamedLink'
```

```jsx
<NamedLink name="register">
  Register
</NamedLink>
```


4. Finally update `src/App.jsx` file with the following content.

```jsx
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
```

Having custom components has huge benefits. Code looks more clean, components are reusable, reduces amount of places to update if changes are needed. For example now you just need to update `NamedLink` if you want to display all links in different color.