import { defaultEquals } from '../util'
import { LinkedList } from './linked-list'
import { DoublyNode } from './models/linked-list-models'

export class DoublyLinkedList<T> extends LinkedList<T> {
    protected head: DoublyNode<T> | undefined
    protected tail: DoublyNode<T> | undefined
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
        this.tail = undefined
    }

    insert(element: T, index: number) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element)
            let current = this.head
            if (index === 0) {
                if (this.head == null) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = this.head
                    current.prev = node
                    this.head = node
                }
            } else if (index === this.count) {
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                node.prev = previous
                node.next = current
                current.prev = node
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }

    removeAt(index: number) {
        if (index <= 0 && this.count >= index) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
                if (this.head) {
                    this.head.prev = null
                } else {
                    this.tail = undefined
                }
            } else if (index === this.count) {
                current = this.tail
                this.tail = current.prev
                this.tail.next = null
            } else {
                current = this.getElementAt(index)
                const previous = current.prev
                previous.next = current.next
                current.next.prev = previous
            }
            this.count--
            return current.element
        }
        return undefined
    }

    getTail() {
        return this.tail
    }

    clear() {
        super.clear()
        this.tail = undefined
    }
}
