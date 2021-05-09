import { LinkedList } from '..'
import { defaultEquals } from '../util'
import { Node } from './models/linked-list-models'

export class CircularLinkedList<T> extends LinkedList<T> {
    constructor(equalFn = defaultEquals) {
        super(equalFn)
    }

    push(element: T) {
        const node = new Node(element)
        let current

        if (this.head == null) {
            this.head = node
        } else {
            current = this.getElementAt(this.size() - 1)
            current.next = node
        }

        node.next = this.head
        console.log(666)

        this.count++
    }

    insert(element: T, index: number) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)
            let current = this.head
            if (index === 0) {
                if (this.head == null) {
                    this.head = node
                    node.next = this.head
                } else {
                    node.next = current
                    current = this.getElementAt(this.size())
                    this.head = node
                    current.next = this.head
                }
            } else {
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }

    removeAt(index: number) {
        if (index >= 0 && this.count > index) {
            let current = this.head
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = null
                } else {
                    const tail = this.getElementAt(this.size())
                    this.head = current.next
                    tail.next = this.head
                }
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
}

// 单向循环链表
console.log('========== 单向循环链表 =============')

const circularLinkedList = new CircularLinkedList<string>()
console.log(circularLinkedList.isEmpty())
circularLinkedList.push('hello')
circularLinkedList.push('world')
circularLinkedList.push('cpx')
console.log(circularLinkedList.toString())
console.log(circularLinkedList.size())
console.log(circularLinkedList.isEmpty())
const index = circularLinkedList.indexOf('hello')
console.log(index)
circularLinkedList.insert('im', 2)
circularLinkedList.insert('xxx', 4)

// console.log('== 遍历 ==')
// let current = circularLinkedList.getHead()
// for (let i = 0; i < circularLinkedList.size(); i++) {
//     console.log(current?.element, current?.next?.element)
//     current = current.next
// }

console.log(circularLinkedList)

console.log(circularLinkedList.toString())
console.log(circularLinkedList.size())
circularLinkedList.remove('xxx')
console.log(circularLinkedList.toString())
