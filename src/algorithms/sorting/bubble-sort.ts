import { Compare, defaultCompare, swap } from '../../util'

export function bubbleSort<T>(array: T[], compareFn = defaultCompare) {
    const { length } = array

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1)
            }
        }
    }

    return array
}

// 已经排序过的就不需要再次排序，略微优化了一下，但是时间复杂度依然是O(N^2)
export function modifiedBubbleSort<T>(array: T[], compareFn = defaultCompare) {
    const { length } = array

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1)
            }
        }
    }

    return array
}

console.log('======== 冒泡排序 ========')

const res = bubbleSort([5, 1, 6, 4, 5, 3, 56, 84, 234, 546])
console.log(res)
