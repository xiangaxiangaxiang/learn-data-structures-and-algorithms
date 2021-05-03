export class ArrayStack<T> {
    private items: T[]
    constructor() {
        this.items = []
    }

    push(element: T) {
        this.items.push(element)
    }

    pop() {
        return this.items.pop()
    }

    peek() {
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        return this.items.length === 0
    }

    clear() {
        this.items = []
    }

    size() {
        return this.items.length
    }
}

export class ObjectStack<T> {
    private items: any
    private count: number = 0

    constructor() {
        this.items = {}
    }
    push(element: T) {
        this.items[this.count.toString()] = element
        this.count++
    }

    pop() {
        if (this.isEmpty()) {
            return
        }
        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }

    peek() {
        return this.items[this.count - 1]
    }

    isEmpty() {
        return this.count === 0
    }

    clear() {
        this.count = 0
        this.items = {}
    }

    size() {
        return this.count
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[0]}`
        for (let i = 1; i < this.count; i++) {
            objString = `${objString} ${this.items[i]}`
        }
        return objString
    }
}

// example
function decimalToBinary(decNumber: number) {
    const remStack = new ObjectStack()
    let number = decNumber
    let rem: number
    let binaryString = ''

    while (number > 0) {
        rem = Math.floor(number % 2)
        remStack.push(rem)
        number = Math.floor(number / 2)
    }
    while (!remStack.isEmpty()) {
        binaryString += remStack.pop()
    }
    return binaryString
}

const binary = decimalToBinary(10)

console.log(binary)
