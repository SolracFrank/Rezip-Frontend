export const MAX_IMAGE_SIZE = 5000000
export const ACCEPTED_IMAGE_TYPES = [
	'image/webp',
	'image/avif',
	'image/jpeg',
	'image/jpg',
	'image/png',
]
export const ACCEPTED_MIMETYPES = ACCEPTED_IMAGE_TYPES.map(type => {
	const format = type.split('/')
	return '.' + format[1]
}).join(', ')
