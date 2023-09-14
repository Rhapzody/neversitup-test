const arr1 = [1,2,3,4]
const arr2 = [3,4,5,6]

const intersectArr = arr1.filter(num => {
    return arr2.includes(num)
})

console.log('First Array : ', arr1);
console.log('Second Array : ', arr2);
console.log('Intersect Array : ', intersectArr);