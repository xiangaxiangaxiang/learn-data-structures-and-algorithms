// 双端队列
export class Deque<T = any> {
    protected count: number
    protected lowestCount: number
    protected items: any
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    addFront(element: T) {
        if (this.isEmpty()) {
            this.addBack(element)
        } else if (this.lowestCount > 0) {
            this.lowestCount--
            this.items[this.lowestCount] = element
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1]
            }
            this.count++
            this.lowestCount = 0
            this.items[0] = element
        }
    }

    addBack(element: T) {
        this.items[this.count] = element
        this.count++
    }

    removeFront() {
        if (this.isEmpty()) {
            return
        }
        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }

    removeBack() {
        if (this.isEmpty()) {
            return
        }
        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }

    peekFront() {
        return this.items[this.lowestCount]
    }

    peekBack() {
        return this.items[this.count - 1]
    }

    isEmpty() {
        return this.count - this.lowestCount === 0
    }

    size() {
        return this.count - this.lowestCount
    }

    clear() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString} ${this.items[i]}`
        }
        return objString
    }
}

// test
console.log('==========')

const deque = new Deque<string>()
console.log(deque.isEmpty())
deque.addBack('john')
deque.addBack('jack')
console.log(deque.toString())
deque.addBack('camila')
console.log(deque.toString())
console.log(deque.size())
console.log(deque.isEmpty())
deque.removeFront()
console.log(deque.toString())
deque.removeBack()
console.log(deque.toString())
deque.addFront('john')
console.log(deque.toString())

// example

function palindromeChecker(str: string) {
    if (
        str === undefined ||
        str === null ||
        (str !== null && str.length === 0)
    ) {
        return false
    }
    const deque = new Deque()
    const lowerStr = str.toLocaleLowerCase().split(' ').join('')
    for (let i = 0; i < lowerStr.length; i++) {
        deque.addBack(lowerStr.charAt(i))
    }
    let isEqual = true
    let firstStr, lastStr
    while (deque.size() > 1 && isEqual) {
        firstStr = deque.removeFront()
        lastStr = deque.removeBack()
        if (lastStr !== firstStr) {
            isEqual = false
        }
    }
    return isEqual
}

console.log(palindromeChecker('madam'))
console.log(palindromeChecker('hello'))
