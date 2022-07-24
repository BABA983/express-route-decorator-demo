import { Request, Response, NextFunction, RequestHandler } from 'express'
import 'reflect-metadata'
import { router } from '../../router'

function requestBodyValidator(keys: string[]) {
	return function (req: Request, res: Response, next: NextFunction) {
		if (req.method === 'POST') {
			if (!req.body) {
				res.status(422).send('Invalid request');
				return
			}
			for (const key of keys) {
				if (!req.body[key]) {
					res.status(422).send(`Missing property ${key}`);
					return
				}
			}
		}
		next();
	}
}

// function responseBodyValidator(keys: string[]) {
// 	return function (req: Request, res: Response, next: NextFunction) {
// 		if (res.statusCode === 200) {
// 			console.log(res)
// 			for (const key of keys) {
// 				if (!res[key]) {
// 					res.status(422).send(`Missing property ${key}`);
// 					return
// 				}
// 			}
// 		}
// 		next();
// 	}
// }

export function ValidateRequestBody(...args: string[]) {
	return function (target: any, key: string, desc: PropertyDescriptor) {
		Reflect.defineMetadata('validateReqBody', args, target, key)
	}
}

export function Use(middleware: RequestHandler) {
	return function (target: any, key: string, desc: PropertyDescriptor) {
		const middlewares = Reflect.getMetadata('middleware', target, key) || []
		middlewares.push(middleware)
		Reflect.defineMetadata('middleware', middlewares, target, key)
	}
}

export function Controller(routePrefix: string) {
	return function (target: Function) {

		for (const key in target.prototype) {
			const method = target.prototype[key]
			const path = Reflect.getMetadata('path', target.prototype, key)
			const methodType = Reflect.getMetadata('method', target.prototype, key)
			const middlewares = Reflect.getMetadata('middleware', target.prototype, key) || []
			const validateReq = Reflect.getMetadata('validateReqBody', target.prototype, key) || []
			// const validateRes = Reflect.getMetadata('validateRes', target.prototype, key) || []

			const reqValidator = requestBodyValidator(validateReq)
			// const resValidator = responseBodyValidator(validateRes)

			if (path) {
				router[methodType](`${routePrefix}${path}`, ...middlewares, reqValidator, method)
			}
		}
	}
}