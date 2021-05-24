import { Compare, defaultCompare, swap } from '../../util'

export const selectionSort = (array: any[], compareFn = defaultCompare) => {
    const { length } = array
    let indexMin

    for (let i = 0; i < length - 1; i++) {
        indexMin = i
        for (let j = i; j < length; j++) {
            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j
            }
        }
        if (i !== indexMin) {
            swap(array, i, indexMin)
        }
    }

    return array
}

console.log('======== 选择排序 ========')

const res = selectionSort([5, 1, 6, 4, 5, 3, 56, 84, 234, 546])
console.log(res)
