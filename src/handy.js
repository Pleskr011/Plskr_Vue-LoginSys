import axios from 'axios'

export const isLogged = async () => {
  try {
    const response = await axios.get('http://localhost:8000/sec/api/auth/check/', {
      withCredentials: true,
    })
    console.log(response.data)
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    //console.error(error)
  }
}
//For Docker: (this needs a better solution)
//export const BACKEND_URL = window.location.origin
//For local development:
export const BACKEND_URL = 'http://localhost:8000'
