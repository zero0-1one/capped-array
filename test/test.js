'use strict'

let CappedArray = require('../lib/capped-array')
let assert = require('chai').assert

function checkOrder(ca, order) {
  assert.equal(ca.length, order.length)
  for (let i = 0; i < ca.length; i++) {
    assert.equal(ca.get(i), order[i])
  }
}

describe('array', function () {
  describe('constructor', function () {
    it('number', function () {
      let ca = new CappedArray(3)
      assert.equal(ca.maxSize, 3)
      assert.equal(ca.length, 0)
    })

    it('array', function () {
      let ca = new CappedArray(3, [1, 2])
      assert.equal(ca.maxSize, 3)
      checkOrder(ca, [1, 2])
    })

    it('large  array', function () {
      let ca = new CappedArray(3, [1, 2, 3, 4, 5, 6])
      assert.equal(ca.maxSize, 3)
      checkOrder(ca, [1, 2, 3])
    })
  })

  it('push', function () {
    let ca = new CappedArray(3)
    let cover = ca.push(1)
    checkOrder(ca, [1])
    assert.isUndefined(cover)

    ca.push(2)
    ca.push(3)
    cover = ca.push(4)
    checkOrder(ca, [2, 3, 4])
    assert.equal(cover, 1)
  })

  it('pop', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    assert.equal(ca.pop(), 3)
    assert.equal(ca.pop(), 2)
    assert.equal(ca.pop(), 1)
  })

  it('unshift', function () {
    let ca = new CappedArray(3)
    let cover = ca.unshift(1)
    checkOrder(ca, [1])
    assert.isUndefined(cover)

    ca.unshift(2)
    ca.unshift(3)
    cover = ca.unshift(4)

    checkOrder(ca, [4, 3, 2])
    assert.equal(cover, 1)
  })

  it('shift', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    assert.equal(ca.shift(), 1)
    assert.equal(ca.shift(), 2)
    assert.equal(ca.shift(), 3)
  })

  it('set', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    ca.set(1, 8)
    checkOrder(ca, [1, 8, 3])
  })

  it('get', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    assert.equal(ca.get(1), 2)
  })

  it('head', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    assert.equal(ca.head(), 1)
  })

  it('tail', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    assert.equal(ca.tail(), 3)
  })

  it('empty', function () {
    let ca = new CappedArray()
    assert.isTrue(ca.empty())
    ca.push(1)
    assert.isFalse(ca.empty())
  })


  it('clear', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    assert.isFalse(ca.empty())
    ca.clear()
    assert.isTrue(ca.empty())
  })

  it('forEach', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    let index = 0;
    ca.forEach((v, i, o) => {
      assert.equal(index++, i)
      assert.equal(v, i + 1)
      assert.equal(o, ca)
    })
  })

  it('iterator', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    let index = 1;
    for (let v of ca) {
      assert.equal(v, index++)
    }
  })

  it('entries', function () {
    let ca = new CappedArray(3, [1, 2, 3])
    let index = 0;
    for (let [i, v] of ca.entries()) {
      assert.equal(index++, i)
      assert.equal(v, i + 1)
    }
  })

  it('all', function () {
    let ca = new CappedArray(3)
    ca.push(1) // ca: [1]
    ca.push(2) // ca: [1,2]
    ca.push(3) // ca: [1,2,3]
    ca.push(4) //return:1  ca: [2,3,4]
    ca.push(5) //return:2  ca: [3,4,5]
    ca.pop() //return:5  ca: [3,4]

    checkOrder(ca, [3, 4])

    ca.unshift(6) // ca: [6,3,4]
    ca.unshift(7) //return:4   ca: [7,6,3]
    ca.shift(7) //return:7   ca: [6,3]

    checkOrder(ca, [6, 3])

    ca.head() //return:6
    ca.tail() //return:3   

    assert.equal(ca.head(), 6)
    assert.equal(ca.tail(), 3)

    for (let v of ca) {
      //v is assigned to  6, 3  in order
    }

    for (let v of ca.entries()) {
      //v is assigned to  [0, 6],  [1,3]  in order
    }
  })
})