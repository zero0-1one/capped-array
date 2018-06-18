# Capped Array
An efficient fixed-length array implementation, It has queue and stack operations and is efficient. This is much faster than using `shif` or `unshift` of `Array`.

# Installation
```sh
  npm install  zo-capped-array --save
```

# Usage
```js
    const CappedArray = require('zo-capped-array')  

    let ca = new CappedArray(3)
    ca.push(1)    // ca: [1]
    ca.push(2)    // ca: [1,2]
    ca.push(3)    // ca: [1,2,3]
    ca.push(4)    //return:1  ca: [2,3,4]
    ca.push(5)    //return:2  ca: [3,4,5]
    ca.pop()      //return:5  ca: [3,4]

    ca.unshift(6)    // ca: [6,3,4]
    ca.unshift(7)    //return:4   ca: [7,6,3]
    ca.shift(7)    //return:7   ca: [6,3]

    for (let i = 0; i < ca.length; i++) {
      let v = ca.get(i)
      //v is assigned to  6, 3  in order
    }

    ca.forEach((v, i) => {
      //i is assigned to  0, 1  in order
      //v is assigned to  6, 3  in order
    })

    for (let v of ca) {
      //v is assigned to  6, 3  in order
    }

    for (let [i, v] of ca.entries()) {
      //i is assigned to  0, 1  in order
      //v is assigned to  6, 3  in order
    }

    ca.head() //return:6
    ca.tail() //return:3   

    ca.empty() //return: false   
    ca.clear() 
    ca.empty() //return: true   


```