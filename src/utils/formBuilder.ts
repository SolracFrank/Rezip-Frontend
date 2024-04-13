export function formBuilder<T extends object>(data: T): FormData {
	const formData = new FormData()
	for (const key in data) {
		const value = data[key]
		//FileList
		if (value instanceof FileList) {
			formData.append(key, value[0])
		}
		//File
		else if (value instanceof File) {
			formData.append(key, value)
		}
		//Array<any> as string
		else if (Array.isArray(value)) {
			formData.append(key, value.join(','))
		}
		//boolean
		else if (typeof value == 'boolean') {
			formData.append(key, String(value))
		}
		//object {}
		else if (
			typeof value === 'object' &&
			!Array.isArray(value) &&
			value !== null
		) {
			formData.append(key, JSON.stringify(value))
		}
		//primitive
		else if (value !== null && value !== undefined) {
			formData.append(key, value as 'string' | 'number')
		}
	}

	return formData
}
