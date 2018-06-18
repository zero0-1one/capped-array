'use strict'

module.exports = class CappedArray {
  constructor(maxSize, initData) {
    this.maxSize = maxSize
    if (Array.isArray(initData)) {
      if (initData.length > maxSize) {
        this._data = initData.slice(0, maxSize)
        this.length = maxSize
      } else {
        this._data = initData.slice()
        this._data.length = maxSize
        this.length = initData.length
      }
    } else {
      this._data = Array(maxSize)
      this.length = 0
    }
    this._begin = 0
  }

  push(v) {
    if (this.length == this.maxSize) {
      let cover = this._data[this._begin]
      this._data[this._begin] = v
      this._begin++;
      if (this._begin == this.maxSize) {
        this._begin = 0
      }
      return cover
    } else {
      this._data[this._realIndex(this.length)] = v
      this.length++
    }
  }

  pop() {
    if (this.length == 0) {
      throw new RangeError('Capped Array is empty')
    }
    this.length--;
    let _realIndex = this._realIndex(this.length)
    let v = this._data[_realIndex]
    this._data[_realIndex] = undefined
    return v
  }

  unshift(v) {
    if (this._begin == 0) {
      this._begin = this.maxSize - 1
    } else {
      this._begin--
    }
    let cover
    if (this.length < this.maxSize) {
      this.length++
    } else {
      cover = this._data[this._begin]
    }
    this._data[this._begin] = v
    return cover
  }

  shift() {
    if (this.length == 0) {
      throw new RangeError('Capped Array is empty')
    }
    let v = this._data[this._begin]
    this._data[this._begin] = undefined
    this._begin++;
    if (this._begin == this.maxSize) {
      this._begin = 0
    }
    this.length--;
    return v
  }


  set(index, v) {
    if (index < 0 || index >= this.length) {
      throw new RangeError('index out of range! index:' + index + '  length:' + this.length)
    }
    this._data[this._realIndex(index)] = v
  }

  get(index) {
    return this._data[this._realIndex(index)]
  }

  head() {
    if (this.length == 0) {
      return
    }
    return this._data[this._begin]
  }

  tail() {
    if (this.length == 0) {
      return
    }
    return this._data[this._realIndex(this.length - 1)]
  }

  empty() {
    return this.length == 0
  }


  _realIndex(index) {
    index += this._begin
    if (index >= this.maxSize) {
      index -= this.maxSize
    }
    return index
  }

  clear() {
    delete this._data
    this._data = Array(this.maxSize)
    this._begin = 0
    this.length = 0
  }

  forEach(fun) {
    for (let i = 0, len = this.length; i < len; i++) {
      fun(this.get(i), i, this)
    }
  }

  *[Symbol.iterator]() {
    for (let i = 0, len = this.length; i < len; i++) {
      yield this.get(i)
    }
  }

  entries() {
    let self = this
    return {
      * [Symbol.iterator]() {
        for (let i = 0; i < self.length; i++) {
          yield [i, self.get(i)]
        }
      }
    }
  }
}