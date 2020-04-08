function BubbleSort(array) {
    // this.index = {
    //     'left': left,
    //     'right': right
    // };
    this.array = array;
    this.i = 0;
    this.j = 0;
}

let result = [];
let isEnd = false;

BubbleSort.prototype.next = function () {
    var len = this.array.length;
    result = [];
    if (this.i < len - 1) {
        if (this.j < len - 1 - this.i) {
            if (this.array[this.j] > this.array[this.j + 1]) {        // 相邻元素两两对比
                var temp = this.array[this.j + 1];        // 元素交换
                this.array[this.j + 1] = this.array[this.j];
                this.array[this.j] = temp;
            }
            this.j++;
        }
        else if (this.j === len - 1 - this.i) {
            this.i++;
            this.j = 0;
        }
    }
    if (this.i === len - 1 && this.j === len - 1 - this.i)
        isEnd = true;

    result.push(this.array);
    result.push(this.j);
    result.push(isEnd);
    return result;
}


export default BubbleSort;