import { useState } from 'react'

export function usePassword() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  async function updatePassword(data) {
    setLoading(true)
    setErrors({})
    setStatus('')

    return axios.put('password', data)
      .then(() => setStatus('Password has been updated.'))
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  return { errors, loading, status, updatePassword }
}
