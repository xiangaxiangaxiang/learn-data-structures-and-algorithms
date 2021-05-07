import { defaultEquals } from '../util'
import { Node } from './models/linked-list-models'

export class LinkedList<T> {
    protected count = 0
    protected head: Node<T> | undefined
    constructor(protected equalsFn = defaultEquals) {
        this.count = 0
        this.head = undefined
        this.equalsFn = equalsFn
    }

    push(element: T) {
        const node = new Node(element)
        let current
        if (this.head == null) {
            this.head = node
        } else {
            current = this.head
            while (current.next != null) {
                current = current.next
            }
            current.next = node
        }
        this.count++
    }

    removeAt(index: number) {
        if (index >= 0 && this.count > index) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
            } else {
                let previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }

    insert(element: T, index: number) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)
            if (index === 0) {
                const current = this.head
                node.next = current
                this.head = node
            } else {
                const previous = this.getElementAt(index - 1)
                const current = previous.next
                node.next = current
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }

    indexOf(element: T) {
        let current = this.head
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }

    remove(element: T) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    size() {
        return this.count
    }

    isEmpty() {
        return this.count === 0
    }

    getHead() {
        return this.head
    }

    clear() {
        this.head = undefined
        this.count = 0
    }

    toString() {
        if (this.head == null) {
            return ''
        }
        let objString = `${this.head.element}`
        let current = this.head.next
        while (current.next) {
            objString = `${objString} ${current.element}`
            current = current.next
        }
        return `${objString} ${current.element}`
    }

    getElementAt(index: number) {
        if (index >= 0 && index < this.count) {
            let node = this.head
            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
        return undefined
    }
}

// test
console.log('========== 链表 =============')

const linkedList = new LinkedList<string>()
console.log(linkedList.isEmpty())
linkedList.push('hello')
linkedList.push('world')
linkedList.push('cpx')
console.log(linkedList.toString())
console.log(linkedList.size())
console.log(linkedList.isEmpty())
const index = linkedList.indexOf('hello')
console.log(index)
linkedList.insert('im', 2)
linkedList.insert('xxx', 4)
console.log(linkedList.toString())
console.log(linkedList.size())
linkedList.remove('xxx')
console.log(linkedList.toString())
