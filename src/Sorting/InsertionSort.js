
// var len = arr.length;
// var preIndex, current;
// for (var i = 1; i < len; i++) {
//     preIndex = i - 1;
//     current = arr[i];
//     while(preIndex >= 0 && arr[preIndex] > current) {
//         arr[preIndex+1] = arr[preIndex];
//         preIndex--;
//     }
//     arr[preIndex+1] = current;
// }
// return arr;


function InsertionSort(array) {
    // this.index = {
    //     'left': left,
    //     'right': right
    // };
    this.array = array;
    this.i = 1;
    this.preIndex = this.i - 1;
    this.current = this.array[this.i];
}

let result = [];
let isEnd = false;


InsertionSort.prototype.next = function () {
    var len = this.array.length;
    result = [];

    if (this.i < len) {
        
        if (this.preIndex >= 0 && this.array[this.preIndex] > this.current) {
            this.array[this.preIndex + 1] = this.array[this.preIndex];
            this.preIndex--;
        }
        else {
            this.array[this.preIndex + 1] = this.current;
            this.i++;
            this.preIndex = this.i - 1;
            this.current = this.array[this.i];
        }

    }
    if (this.i === len - 1 && this.preIndex === -1)
        isEnd = true;

    result.push(this.array);
    result.push(this.preIndex + 1);
    result.push(isEnd);
    return result;
}


export default InsertionSort;