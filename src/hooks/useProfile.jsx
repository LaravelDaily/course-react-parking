import { useState, useEffect } from 'react'

export function useProfile() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [data, setData] = useState({})

  useEffect(() => {
    const controller = new AbortController()
    getProfile({ signal: controller.signal })
    return () => controller.abort()
  }, [])

  async function getProfile({ signal } = {}) {
    setLoading(true)

    return axios.get('profile', { signal })
      .then(response => setData(response.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  async function updateProfile(data) {
    setLoading(true)
    setErrors({})
    setStatus('')

    return axios.put('profile', data)
      .then(() => {
        setStatus('Profile has been updated.')
      })
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  return [{ data, setData, errors, loading, status }, updateProfile]
}
