import { isNil, isPromise } from "./primitive.js"
import type { ErrorHandler } from "./types.js"

export type GuardErrorHandler = (err:Error) => void

let globalErrorHandler:GuardErrorHandler | null

export function setGuardErrorHandler(errorHandler:GuardErrorHandler | null = null) {
	globalErrorHandler = errorHandler
}

export type ReturnTypeOrAny<Fn extends () => any> = (ReturnType<Fn> extends never ? unknown : ReturnType<Fn>)


/**
 * Get a value in a guarded fashion
 * ensuring no exception
 *
 * @param fn
 * @param defaultValue
 * @returns {any}
 * @param errorHandler
 */
export function getValue<Fn extends () => any, T extends ReturnType<Fn> >(
	fn:Fn,
	defaultValue: T = undefined,
	errorHandler: ErrorHandler = globalErrorHandler
):T extends Promise<infer T2> ? Promise<T2> : T {
	
	let result = null

	try {
		result = fn()
		if (isPromise(result))
			return result
				.catch(err => {
					if (errorHandler)
						errorHandler(err)

					return defaultValue
				})
				.then(value => isNil(value) ? defaultValue : value) as any
	} catch (err) {
		if (errorHandler)
			errorHandler(err)
	}

	return isNil(result) ?
		(defaultValue as any) : result
}


export type GuardFn = <Fn extends () => any, T extends ReturnType<Fn> >(fn:Fn, localErrorHandler?: GuardErrorHandler | null) => (void | Promise<void>)
export type GuardTool = GuardFn & {
	lift: <T>(fn:() => T, localErrorHandler?: GuardErrorHandler | null) => ((fn:() => T, localErrorHandler?: GuardErrorHandler | null) => (void | Promise<void>))
}



/**
 * Execute a function guarded from exception
 *
 * @param fn
 * @param localErrorHandler
 * @returns {(fn:()=>any)=>(fn:()=>any)=>any}
 */
const guardFn:GuardFn = <Fn extends () => any, T extends ReturnType<Fn> >(fn:Fn, localErrorHandler: ((err: Error) => void) | null = null):void | Promise<void> => {
	const value = getValue<Fn,T>(fn, undefined, localErrorHandler)
	if (isPromise(value))
		return value.then(() => undefined as void)
	
}

export const guard: GuardTool = Object.assign(guardFn, {
	lift: <Fn extends () => any, T extends ReturnType<Fn> >(fn:Fn, localErrorHandler?: GuardErrorHandler | null) =>
		(fn:Fn, localErrorHandler?: GuardErrorHandler | null): (void | Promise<void>) =>
			guardFn<Fn,T>(fn,localErrorHandler)
})
