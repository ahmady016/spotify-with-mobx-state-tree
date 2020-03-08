import axios, { AxiosResponse } from 'axios'

export const INITIAL_RESPONSE = { loading: false, error: '', data: [] }
const ACCESS_TOKEN = 'BQCbYpj2I6mMCjfk5OeJfABHM_7ar-iFbLvtv4VJ1bMAY4xvp-KvKh9SGEDtziKFGc_DI1oxaUF8baGk5lVug0x5tgHgN_9Hy0ogz--dncQqkWZaE2fIO9bwx6NEpZ3ypsT1owW_j0St8A5vDKCZ1a8Vzs80PElp0VGtbGmlhHbOdRPgLxRalQhHp2qHZKUBSCXt2c24Pj5NwIoPPcDO7ZU'
// set the base API URL
axios.defaults.baseURL = 'https://api.spotify.com/v1'
// Add ACCESS_TOKEN Authorization header using Axios Interceptors
axios.interceptors.request.use(
	config => {
		config.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN
		return config
	},
	error => Promise.reject(error)
)

// build request and send it to the server and return the data OR error
export async function request<T>(_request: any[]) {
	let allPromises = [],
		requestPromise,
		data: T | T[]
	// build the ajax request promise
	if (Array.isArray(_request) && Array.isArray(_request[0])) {
		allPromises = _request.map(request => {
			const [method, url, body = null] = request
			if (method === 'get') return axios.get<T>(url)
			else if (method === 'post') return axios.post<T>(url, body)
			return axios.get<T>(url)
		})
		requestPromise = axios.all(allPromises)
	} else if (Array.isArray(_request) && typeof _request[0] === 'string') {
		const [method, url, body = null] = _request
		if (method === 'get') requestPromise = axios.get<T>(url)
		else if (method === 'post') requestPromise = axios.post<T>(url, body)
		requestPromise = axios.get<T>(url)
	}
	// send request and get the data OR error
	try {
		const res: AxiosResponse<T> = (await requestPromise) as AxiosResponse<T>
		// handle if sending multiple requests [response is Array] OR Not
		data = Array.isArray(res) ? res.map(item => item.data) : res.data
		return { status: 'success', response: data }
	} catch (err) {
		// The request was made and the server responded with a status code that falls out of the range of 2xx
		// error.response.data - error.response.status - error.response.headers
		if (err.response)
			return {
				status: 'error',
				response: err.response.data.error.message || err.response.status.toString()
			}
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
		else if (err.request && Object.keys(err.request).length)
			return { status: 'error', response: err.request }
		// Something happened in setting up the request that triggered an Error
		else {
			let error = JSON.parse(JSON.stringify(err))
			return {
				status: 'error',
				response: error.message || 'Something went wrong!'
			}
		}
	}
}
