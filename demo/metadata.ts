import 'reflect-metadata'

const cat = {
	name: 'cat',
	age: 1,
}

Reflect.defineMetadata('master', 'BABA', cat, 'name')


const master = Reflect.getMetadata('master', cat, 'name')

@printMetadata
class Dog {
	name = 'dog'

	@setMetadata('master', 'BABA')
	run() {
		console.log('run')
	}
}

function setMetadata(metadataKey: string, val: string) {
	return (target: Dog, key: string) => {
		Reflect.defineMetadata(metadataKey, val, target, key)
	}
}

function printMetadata(ctor: typeof Dog) {
	console.log(ctor)
	console.log(ctor.prototype)

	for (let key in ctor.prototype) {
		const meta = Reflect.getMetadata('master', ctor.prototype, key)
		console.log(key, meta)
	}
}
for (let key in String.prototype) {
	console.log(key)
}

// console.log(Reflect.getMetadata('master', Dog.prototype, 'run'))