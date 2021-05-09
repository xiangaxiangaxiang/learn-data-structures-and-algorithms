export class Set<T> {
    private items: any

    constructor() {
        this.items = {}
    }

    add(element: T) {
        if (!this.has(element)) {
            this.items[element] = element
            return true
        }
        return false
    }

    delete(element: T) {
        if (this.has(element)) {
            delete this.items[element]
            return true
        }
        return false
    }

    union(otherSet: Set<T>) {
        const unionSet = new Set<T>()
        this.values().forEach(item => unionSet.add(item))
        otherSet.values().forEach(item => unionSet.add(item))
        return unionSet
    }

    intersection(otherSet: Set<T>) {
        const intersectionSet = new Set<T>()
        this.values().forEach(item => {
            if (otherSet.has(item)) {
                intersectionSet.add(item)
            }
        })
        return intersectionSet
    }

    difference(otherSet: Set<T>) {
        const differenceSet = new Set<T>()
        this.values().forEach(item => {
            if (!otherSet.has(item)) {
                differenceSet.add(item)
            }
        })
        return differenceSet
    }

    isSubsetOf(otherSet: Set<T>) {
        if (this.size() > otherSet.size()) {
            return false
        }

        let isSubset = true
        this.values().every(value => {
            if (!otherSet.has(value)) {
                isSubset = false
                return false
            }
            return true
        })

        return isSubset
    }

    has(element: T) {
        return Object.prototype.hasOwnProperty.call(this.items, element)
    }

    clear() {
        this.items = {}
    }

    size() {
        return Object.keys(this.items).length
    }

    values(): T[] {
        return Object.values(this.items)
    }
}

// test
console.log('============ 集合 ==============')

const set = new Set<string>()

set.add('ccc')
set.add('aaa')
set.add('bbb')

console.log(set.has('ccc'))
console.log(set.has('ddd'))

console.log(set.size())
console.log(set.values())

set.delete('aaa')
console.log(set.values())

set.clear()
console.log(set.values())

console.log('并集')
const setA = new Set<number>()
setA.add(1)
setA.add(2)
setA.add(3)

const setB = new Set<number>()
setB.add(4)
setB.add(2)
setB.add(6)

const union = setA.union(setB)
console.log(union.values())

console.log('交集')
const setC = new Set<number>()
setC.add(1)
setC.add(2)
setC.add(3)

const setD = new Set<number>()
setD.add(4)
setD.add(2)
setD.add(6)

const intersection = setC.intersection(setD)
console.log(intersection.values())

console.log('差集')
const setE = new Set<number>()
setE.add(1)
setE.add(2)
setE.add(3)

const setF = new Set<number>()
setF.add(4)
setF.add(2)
setF.add(6)

const difference = setE.difference(setF)
console.log(difference.values())

console.log('子集')
const setG = new Set<number>()
setG.add(1)
setG.add(2)

const setH = new Set<number>()
setH.add(1)
setH.add(2)
setH.add(3)

const setI = new Set<number>()
setI.add(4)
setI.add(2)
setI.add(6)

console.log(setG.isSubsetOf(setH))
console.log(setG.isSubsetOf(setI))
