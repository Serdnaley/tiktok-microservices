import { defineStore } from 'pinia'
import { ref } from 'vue'

const {
  VITE_APP_API_URL: baseUrl,
} = import.meta.env

const request = async (method, url, payload) => {
  const endpoint = new URL(url, baseUrl)
  let body = undefined

  if (method === 'GET') {
    for (const key in payload) {
      endpoint.searchParams.append(key, payload[key])
    }
  } else {
    body = JSON.stringify(payload)
  }

  const res = await fetch(endpoint.toString(), { method, body })
  if (!res) return null

  const data = res.status === 200 ? await res.json() : {}

  return {
    data,
  }
}

request.get = (url, payload) => request('GET', url, payload)
request.post = (url, payload) => request('POST', url, payload)
request.put = (url, payload) => request('PUT', url, payload)
request.delete = (url, payload) => request('DELETE', url, payload)

export const useCounterStore = defineStore('data', () => {
  const data = ref({})

  const fetchData = async () => request.get()

  return {

  }
})
