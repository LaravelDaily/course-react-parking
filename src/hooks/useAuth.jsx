import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'

export function useAuth() {
  const navigate = useNavigate()

  async function register(data) {
    return axios.post('auth/register', data)
      .then(() => {
        navigate(route('vehicles.index'))
      })
      .catch(() => {})
  }

  return { register }
}
