const routeNames = {
  'home': '/',
  'register': '/register',
  'login': '/login',
  'profile.edit': '/profile',
  'vehicles.index': '/vehicles',
  'parkings.active': '/parkings/active',
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
