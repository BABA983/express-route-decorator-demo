import 'reflect-metadata'

function routeFactory(method: string) {
	return function (path: string) {
		return function (target: any, key: string, desc: PropertyDescriptor) {
			Reflect.defineMetadata('path', path, target, key)
			Reflect.defineMetadata('method', method, target, key)
		}
	}
}

export const Get = routeFactory('get')
export const Post = routeFactory('post')
export const Put = routeFactory('put')
export const Delete = routeFactory('delete')
export const Patch = routeFactory('patch')
export const Options = routeFactory('options')
export const Head = routeFactory('head')

