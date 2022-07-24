@classDecorator
class Animal {
	name: string = 'cat';

	get getName() {
		return this.name;
	}

	static eat(@paramDecorator status: string, @paramDecorator food: string) {
		console.log('eat');
		throw new Error()
	}
}

function classDecorator(ctor: typeof Animal) {
	console.log(ctor)
}

function paramDecorator(target: any, key: string, index: number) {
	console.log(target);
	console.log(key);
	console.log(index);
}

function propDecorator(target: any, key: string) {
	console.log(target)
	console.log(key)
	console.log(target[key])
}

function log(errMsg: string) {
	return function (target: any, key: string, desc: PropertyDescriptor) {
		const method = desc.value
		desc.value = function () {
			try {
				method()
			} catch (error) {
				console.log(errMsg)
			}
		}
	}
}

// console.log(Animal.eat('hungry', 'cat food'))
