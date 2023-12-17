import axios from 'axios'
import { Response } from './types'

class AuthApi {
	endpoint = '/auth';
	api;
	constructor() {
		this.api = axios.create({
			baseURL: 'http://localhost:3142'
		})

		this.api.interceptors.request.use(
			(config) => {
				const accessToken = localStorage.getItem('accessToken')
				if (accessToken) {
					config.headers.Authorization = `Bearer ${accessToken}`
				}
				return config
			},
			(error) => {
				return Promise.reject(error)
			}
		)
		
		this.api.interceptors.response.use(
			(response) => {
				return response
			},
			async (error) => {
        const originalRequest = error.config
				if (error.response.status === 403 && !originalRequest._retry) {
					originalRequest._retry = true
					const refresh = localStorage.getItem('refreshToken')
					if (!refresh) return Promise.reject('Error >>> ')
          const response = (await this.api.post<Response<{ accessToken: string, refreshToken: string }>>(`${this.endpoint}/refresh`, { refresh })).data
          if (response.success) {
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
            return this.api(originalRequest)
          }
				}
				return Promise.reject(error)
			}
		)
	}
	async login(login: string, password: string) {
		return (
			await this.api.post<Response<{ accessToken: string; refreshToken: string }>>(
				`${this.endpoint}/login`,
				{ login, password }
			)
		).data
	}
	async check() {
		return await this.api
			.get<{ success: boolean }>(`${this.endpoint}/check`)
			.then((res) => res.data)
  }
	async logout() {
		return await this.api
			.post<Response<{ accessToken: string; refreshToken: string }>>(`${this.endpoint}/logout`)
	}
}

export default new AuthApi()