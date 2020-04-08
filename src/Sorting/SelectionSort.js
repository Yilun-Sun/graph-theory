function SelectionSort(array) {
    // this.index = {
    //     'left': left,
    //     'right': right
    // };
    this.array = array;
    this.i = 0;
    this.j = 1;
    this.minIndex = 0;
}

let result = [];
let isEnd = false;

SelectionSort.prototype.next = function () {
    var len = this.array.length;
    result = [];
    if (this.i < len - 1) {
        if (this.j < len) {
            if (this.array[this.j] < this.array[this.minIndex]) {     // 寻找最小的数
                this.minIndex = this.j;                 // 将最小数的索引保存
            }
            this.j++;
        }
        else {
            let temp = this.array[this.i];
            this.array[this.i] = this.array[this.minIndex];
            this.array[this.minIndex] = temp;
            this.i++;
            this.minIndex = this.i;
            this.j = this.i + 1;
        }
    }
    if (this.i === len - 2 && this.j === len - 1)
        isEnd = true;

    result.push(this.array);
    result.push(this.isEnd);
    result.push(this.minIndex);
    result.push(this.j);
    return result;
}

export default SelectionSort;