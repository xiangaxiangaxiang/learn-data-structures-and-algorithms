// 队列
export class Queue<T = any> {
    private count: number
    private lowestCount: number
    private items: any
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    isEmpty() {
        return this.count - this.lowestCount === 0
    }

    enqueue(element: T) {
        this.items[this.count] = element
        this.count++
    }

    dequeue() {
        if (this.isEmpty()) {
            return
        }
        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }

    size() {
        return this.count - this.lowestCount
    }

    peek() {
        return this.items[this.lowestCount]
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
        let objString = `${this.items[0]}`
        for (let i = 1; i < this.count; i++) {
            objString = `${objString} ${this.items[i]}`
        }
        return objString
    }
}

// test
const queue = new Queue()
console.log(queue.isEmpty())
queue.enqueue(6)
queue.enqueue(7)
queue.enqueue(8)
console.log(queue.peek())
console.log(queue.size())
console.log(queue.toString())
const item = queue.dequeue()
console.log(item)
queue.clear()
console.log(queue.isEmpty())

// example

function hotPotato(elementsList: any[], num: number) {
    const queue = new Queue()
    const eliminatedList = []

    elementsList.forEach(item => {
        queue.enqueue(item)
    })

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        eliminatedList.push(queue.dequeue())
    }

    return {
        eliminated: eliminatedList,
        winner: queue.dequeue(),
    }
}

const names = ['chen', 'song', 'liang', 'li', 'zhao', 'sun']
const result = hotPotato(names, 7)
result.eliminated.forEach(name => {
    console.log(name)
})

console.log(`winner is ${result.winner}`)
