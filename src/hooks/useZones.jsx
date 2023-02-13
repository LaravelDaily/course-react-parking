import { useState, useEffect } from 'react'

export function useZones() {
  const [zones, setZones] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    getZones({ signal: controller.signal })
    return () => { controller.abort() }
  }, [])

  async function getZones({ signal } = {}) {
    return axios.get('zones', { signal })
      .then(response => setZones(response.data.data))
      .catch(() => {})
  }

  return { zones }
}
