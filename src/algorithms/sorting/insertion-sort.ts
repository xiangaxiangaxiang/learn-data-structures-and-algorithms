import { Compare, defaultCompare } from '../../util'

export const insertionSort = (array: any[], compareFn = defaultCompare) => {
    const { length } = array
    let temp
    for (let i = 1; i < length; i++) {
        let j = i
        temp = array[i]
        while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
            array[j] = array[j - 1]
            j--
        }
        array[j] = temp
    }

    return array
}

console.log('======== 插入排序 ========')

const res = insertionSort([5, 1, 6, 4, 5, 3, 56, 84, 234, 546])
console.log(res)
