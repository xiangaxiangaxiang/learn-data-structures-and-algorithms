import { Compare, defaultCompare, ICompareFunction } from '../util'
import { Node } from './models/node'

export class BinarySearchTree<T> {
    protected root: Node<T>
    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {}

    insert(key: T) {
        if (this.root == null) {
            this.root = new Node<T>(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    protected insertNode(node: Node<T>, key: T) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node<T>(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node<T>(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    inOrderTraverse(callback: Function) {
        this.inOrderTraverseNode(this.root, callback)
    }

    private inOrderTraverseNode(node: Node<T>, callback: Function) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }

    preOrderTraverse(callback: Function) {
        this.preOrderTraverseNode(this.root, callback)
    }

    private preOrderTraverseNode(node: Node<T>, callback: Function) {
        if (node != null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }

    postOrderTraverse(callback: Function) {
        this.postOrderTraverseNode(this.root, callback)
    }

    private postOrderTraverseNode(node: Node<T>, callback: Function) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    min() {
        return this.minNode(this.root)
    }

    protected minNode(node: Node<T>) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }

    max() {
        return this.maxNode(this.root)
    }

    protected maxNode(node: Node<T>) {
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }

    getRoot() {
        return this.root
    }

    search(key: T) {
        return this.searchNode(this.root, key)
    }

    private searchNode(node: Node<T>, key: T): boolean {
        if (node == null) {
            return false
        }

        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key)
        }
        // key is equal to node.item
        return true
    }

    remove(key: T) {
        this.root = this.removeNode(this.root, key)
    }

    protected removeNode(node: Node<T>, key: T) {
        if (node == null) {
            return null
        }

        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            //  处理三种特殊情况
            // 1 - 叶子节点
            // 2 - 一个子节点
            // 3 - 两个子节点

            // case 1
            if (node.left == null && node.right == null) {
                node = null
                return node
            }

            // case 2
            if (node.left == null) {
                node = node.right
                return node
            } else if (node.right == null) {
                node = node.left
                return node
            }

            // case 3
            const aux = this.minNode(node.right)
            node.key = aux.key
            node.right = this.removeNode(node.right, aux.key)
            return node
        }
    }
}

console.log('============ 二叉搜索树 ==============')

const tree = new BinarySearchTree<number>()

tree.insert(11)
tree.insert(7)
tree.insert(5)
tree.insert(9)
tree.insert(3)
tree.insert(8)
tree.insert(10)
tree.insert(15)
tree.insert(13)
tree.insert(20)
tree.insert(12)
tree.insert(14)
tree.insert(18)
tree.insert(25)

console.log(tree)

console.log('== 中序遍历 ==')
let inOrder = ''
tree.inOrderTraverse((key: number) => (inOrder += `${key.toString()} -> `))
console.log(inOrder)

console.log('== 先序遍历 ==')
let preOrder = ''
tree.preOrderTraverse((key: number) => (preOrder += `${key.toString()} -> `))
console.log(preOrder)

console.log('== 后序遍历 ==')
let postOrder = ''
tree.postOrderTraverse((key: number) => (postOrder += `${key.toString()} -> `))
console.log(postOrder)
