import React from 'react';
import { tuple } from 'antd/lib/_util/type';

function drawFilledRect(props) {
    const { ctx, x, y, width, height, color } = props;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.stroke();
}

function drawFilledCircle(props) {
    const { ctx, x, y, radius, color } = props;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;  //绘制样式，图形颜色
    ctx.fill();
    ctx.strokeStyle = color;    //绘制边框样式
    ctx.stroke();
}

function drawGraph(graph) {
    const ctx = document.getElementById("canvas").getContext('2d');

    drawBackground();

    let vertexNums = graph.length;

    drawFilledCircle({ ctx: ctx, x: 400 + rds * Math.cos(Math.PI / 2), y: 300 - rds * Math.sin(Math.PI / 2), radius: 20, color: "#2B5F75" });

    ctx.lineWidth = 3;  //设置线条宽度
    console.log(cliqueNode)
    // draw lines
    for (let i = 0; i < vertexNums; i++) {
        for (let j = 1; j < graph[i].length; j++) {

            const temp_x1 = 400 + rds * Math.cos(Math.PI / 2 - (graph[i][0] - 1) * (Math.PI * 2) / vertexNums);
            const temp_y1 = 300 - rds * Math.sin(Math.PI / 2 - (graph[i][0] - 1) * (Math.PI * 2) / vertexNums);
            const temp_x2 = 400 + rds * Math.cos(Math.PI / 2 - (graph[i][j] - 1) * (Math.PI * 2) / vertexNums);
            const temp_y2 = 300 - rds * Math.sin(Math.PI / 2 - (graph[i][j] - 1) * (Math.PI * 2) / vertexNums);

            ctx.moveTo(temp_x1, temp_y1);
            ctx.lineTo(temp_x2, temp_y2);

            // if (cliqueNode.includes(graph[i][0] - 1) && cliqueNode.includes(graph[i][j] - 1)) {
            //     ctx.lineWidth = 7;  //设置线条宽度
            //     ctx.strokeStyle = 'green';
            //     console.log((graph[i][0] - 1) + ' ' + (graph[i][j] - 1))
            // }
            // else {
            //     ctx.strokeStyle = 'black';
            // }

            ctx.strokeStyle = 'black';   //绘制边框样式
            ctx.stroke();

            ctx.lineWidth = 3;  //设置线条宽度
        }
    }

    // draw inner cycles
    for (let i = 0; i < vertexNums; i++) {
        const temp_x = 400 + rds * Math.cos(Math.PI / 2 - i * (Math.PI * 2) / vertexNums);
        const temp_y = 300 - rds * Math.sin(Math.PI / 2 - i * (Math.PI * 2) / vertexNums);
        if (cliqueNode.includes(i)) {
            drawFilledCircle({ ctx: ctx, x: temp_x, y: temp_y, radius: 20, color: "#7BA23F" });
        }
        else {
            drawFilledCircle({ ctx: ctx, x: temp_x, y: temp_y, radius: 20, color: "#2B5F75" });
        }

        ctx.font = "20px Georgia";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(i + 1, temp_x - 5, temp_y + 4);
    }

    // setCMDTextArea();

    // reset 
    cliqueNode = [];

}

function setCMDTextArea() {
    let text = '[';
    for (let i = 0; i < graph.length; i++) {
        text += '[';
        for (let j = 0; j < graph[i].length - 1; j++) {
            text += graph[i][j] + ' ';
        }
        text += graph[i][graph[i].length - 1] + ']';
    }
    text += ']';
    document.getElementById("cmdTextArea").value = text;


}


function getCMDTextArea() {
    let text = document.getElementById("cmdTextArea").value;
    text = text.substring(1, text.length - 1);
    let textArray = text.split(']');
    let temp_graph = [];

    for (let i = 0; i < textArray.length - 1; i++) {
        let temp_subtext = textArray[i].substring(1);
        // temp_graph.push([...temp_subtext.split(' ')]);
        const temp_arr = temp_subtext.split(' ');
        let temp_subarr = [];
        for (let index = 0; index < temp_arr.length; index++) {
            temp_subarr.push(parseInt(temp_subtext.split(' ')[index]));
        }
        temp_graph.push(temp_subarr);
    }
    // console.log(temp_graph);
    graph = temp_graph;
    graph = graph.sort((a, b) => { return a[0] - b[0] });

    drawGraph(graph);
}

function checktCMDTextArea() {
    for (let i = 0; i < graph.length; i++) {
        for (let j = 1; j < graph[i].length; j++) {
            for (let m = 0; m < graph.length; m++) {
                if (graph[m][0] === graph[i][j]) {
                    let hasNode = false;
                    for (let n = 0; n < graph[m].length; n++) {
                        if (graph[m][n] === graph[i][0]) {
                            hasNode = true;
                        }
                    }
                    if (!hasNode) {
                        graph[m].push(graph[i][0]);
                    }
                }

            }
        }
    }
    setCMDTextArea();

    // findMaximumClique(graph);
    // console.log(graph);
}

function drawBackground() {
    const ctx = document.getElementById("canvas").getContext('2d');
    ctx.clearRect(0, 0, 800, 600);
    // ctx.height = ctx.height;

    // filledRect({ ctx: ctx, x: 0, y: 0, width: width, height: height, color: "#DDDDDD" });
}

let canvasWidth = 800;
let canvasHeight = 600;

let prevX = 0;
let prevY = 0;

// let saveButton;
// let clearButton;
// let slider;
// let xoff = 0;

var canvasElementOffsetLeft;
var canvasElementOffsetTop;

var graph = [[1, 5, 2, 7, 8], [2, 4, 1, 3, 5, 6], [3, 2, 4, 5], [4, 2, 3, 5], [5, 2, 4, 1, 3], [6, 2], [7, 1], [8, 1]];
var graph_1 = [[1, 5, 2, 7, 8, 9], [2, 4, 1, 3, 5, 6], [3, 2, 4, 5, 9], [4, 2, 3, 5], [5, 2, 4, 1, 3], [6, 2], [7, 1], [8, 1], [9, 1, 3]];
var graph_2 = [[1, 5, 2], [2, 4, 1, 3, 5, 6], [3, 2, 4, 5], [4, 2, 3, 5], [5, 2, 4, 1, 3], [6, 2]];
var graph_3 = [[1, 5, 2, 7], [2, 1, 3, 5, 6], [3, 2, 4, 5], [4, 3, 5], [5, 2, 4, 1, 3], [6, 2], [7, 1]];
var graph_4 = [[1, 5, 2, 7, 8], [2, 1, 3, 5, 6], [3, 2, 4, 5], [4, 3, 5], [5, 2, 4, 1, 3], [6, 2], [7, 1, 8], [8, 1, 7]];

const rds = 200;

// const NODENUM = '4';
// const TESTINPUT = '0 1\n' + '';
var cliqueNode = [];

let startNodeIndex = 0;
let endNodeIndex = 0;

function findMaximumClique() {
    console.log(graph);

    let openList = [];
    openList.push("0");
    openList.push("1");

    let bound = 0;
    //
    let f;

    let result = [];

    let calculationTimes = 0;

    console.log(typeof graph[0][0]);

    while (openList.length > 0) {

        // current = already informed length
        let current = openList.pop();

        // calculate f
        f = (current.match(/1/g) || []).length + graph.length - current.length;
        if (f <= bound) {
            continue;
        }

        console.log(current);

        if (current.length !== graph.length) {
            let canIncludeCurrentNode = true;
            for (let index = 0; index < current.length; index++) {
                if (current.substring(index, index + 1) === '1') {
                    console.log(graph[index].includes(1 + current.length))
                    if (!graph[index].includes(1 + current.length)) {
                        canIncludeCurrentNode = false;
                        break;
                    }
                }
            }
            if (canIncludeCurrentNode) {
                openList.push(current + "0");
                openList.push(current + "1");
            }
            else {
                openList.push(current + "0");
            }
        }
        else {
            // calculate bound and update
            bound = Math.max((current.match(/1/g) || []).length, bound);
            console.log(bound);

            result.push(current);

            calculationTimes++;
        }


    }

    // output result
    let temp = [];
    let nodeResult = '';
    for (let index = 0; index < result.length; index++) {
        if ((result[index].match(/1/g) || []).length === bound) {
            temp.push(result[index]);
        }
    }


    result = temp;


    for (let index = 0; index < result[0].length; index++) {
        if (result[0].substring(index, index + 1) === '1') {
            cliqueNode.push(index);
        }
    }
    for (let index = 0; index < cliqueNode.length; index++) {
        nodeResult += (cliqueNode[index] + 1) + ' ';
    }

    document.getElementById("outputTextArea").value = ('result: ' + result + '\nvertices in clique: ' + nodeResult);

    console.log('calculation times: ' + calculationTimes);

    drawGraph(graph);
}

function updateNode() {
    getCMDTextArea();
    checktCMDTextArea();
    document.getElementById("outputTextArea").value = '';
}

function findMaxClique() {
    findMaximumClique();
}

function getNodeIndex(prevX, prevY) {
    // console.log(prevX + ' ' + prevY);
    let result = 0;
    for (let i = 0; i < graph.length; i++) {
        const temp_x = 400 + rds * Math.cos(Math.PI / 2 - i * (Math.PI * 2) / graph.length);
        const temp_y = 300 - rds * Math.sin(Math.PI / 2 - i * (Math.PI * 2) / graph.length);
        if ((temp_x - prevX) * (temp_x - prevX) + (temp_y - prevY) * (temp_y - prevY) < 400) {
            // console.log('node:' + (i + 1));
            result = i + 1;
        }
    }
    return result;
}

function addOrRemoveEdge(startNodeIndex, endNodeIndex) {
    let isAdd = true;

    for (let i = 0; i < graph.length; i++) {
        if (graph[i][0] === startNodeIndex) {
            // check if need to remove
            if (graph[i].includes(endNodeIndex)) {
                isAdd = false;
                break;
            }
        }
        if (graph[i][0] === endNodeIndex) {
            // check if need to remove
            if (graph[i].includes(startNodeIndex)) {
                isAdd = false;
                break;
            }
        }
    }

    // add or remove
    if (isAdd) {
        for (let i = 0; i < graph.length; i++) {
            if (graph[i][0] === startNodeIndex) {
                // add
                if (!graph[i].includes(endNodeIndex)) {
                    graph[i].push(endNodeIndex);
                }
            }

            if (graph[i][0] === endNodeIndex) {
                // add
                if (!graph[i].includes(startNodeIndex)) {
                    graph[i].push(startNodeIndex);
                }
            }
        }
    }
    else {
        for (let i = 0; i < graph.length; i++) {
            if (graph[i][0] === startNodeIndex) {
                // remove
                if (graph[i].includes(endNodeIndex)) {
                    console.log('removing ' + endNodeIndex + ' from ' + startNodeIndex);
                    graph[i].splice(graph[i].indexOf(endNodeIndex), 1);
                }
            }

            if (graph[i][0] === endNodeIndex) {
                // remove
                if (graph[i].includes(startNodeIndex)) {
                    console.log('removing ' + startNodeIndex + ' from ' + endNodeIndex);
                    graph[i].splice(graph[i].indexOf(startNodeIndex), 1);
                }
            }
        }
    }



    // for (let i = 0; i < graph.length; i++) {
    //     if (graph[i][0] === startNodeIndex) {
    //         // add
    //         if (!graph[i].includes(endNodeIndex)) {
    //             graph[i].push(endNodeIndex);
    //         }
    //         // remove
    //         else {
    //             console.log('removing ' + endNodeIndex + ' from ' + startNodeIndex);
    //             graph[i].splice(graph[i].indexOf(endNodeIndex), 1);
    //             for (let j = 0; j < graph.length; j++) {
    //                 if (graph[j][0] === endNodeIndex && graph[j].includes(startNodeIndex)) {
    //                     graph[j].splice(graph[j].indexOf(startNodeIndex), 1);

    //                     break;
    //                 }
    //             }
    //         }
    //     }

    //     if (graph[i][0] === endNodeIndex) {
    //         // add
    //         if (!graph[i].includes(startNodeIndex)) {
    //             graph[i].push(startNodeIndex);
    //         }
    //         // remove
    //         else {
    //             console.log('removing ' + startNodeIndex + ' from ' + endNodeIndex);
    //             graph[i].splice(graph[i].indexOf(startNodeIndex), 1);
    //             console.log(graph[i])
    //             for (let j = 0; j < graph.length; j++) {
    //                 if (graph[j][0] === startNodeIndex && graph[j].includes(endNodeIndex)) {
    //                     graph[j].splice(graph[j].indexOf(endNodeIndex), 1);
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }

    setCMDTextArea();
    updateNode();
}

function graphExample1() {
    graph = graph_1.slice();
    drawGraph(graph);
    setCMDTextArea();
}

function graphExample2() {
    graph = graph_2.slice();
    drawGraph(graph);
    setCMDTextArea();
}

function graphExample3() {
    graph = graph_3.slice();
    drawGraph(graph);
    setCMDTextArea();
}

function graphExample4() {
    graph = graph_4.slice();
    drawGraph(graph);
    setCMDTextArea();
}

class CanvasGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        let isMouseDown = false;
    }

    componentDidMount() {
        this.updateCanvas();

        drawGraph(graph);
        setCMDTextArea();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 800, 600);

        // filledRect({ ctx: ctx, x: 0, y: 0, width: width, height: height, color: "#DDDDDD" });
    }

    addNode() {
        graph.push([graph.length + 1, 1]);
        for (let index = 0; index < graph.length; index++) {
            if (graph[index][0] === 1)
                graph[index].push(graph.length);
        }

        drawGraph(graph);

    }

    updateNode() {
        getCMDTextArea();
        checktCMDTextArea();
        document.getElementById("outputTextArea").value = '';
    }

    findMaxClique() {
        findMaximumClique();
    }

    handleMouseDown = (event) => {
        console.log('mouse down');

        this.isMouseDown = true;

        // if window is resized
        var canvasElement = document.getElementById("canvas");
        canvasElementOffsetLeft = canvasElement.offsetLeft;
        canvasElementOffsetTop = canvasElement.offsetTop;

        // prevX = event.pageX - canvasElementOffsetLeft - canvasWidth / 2;
        // prevY = event.pageY - canvasElementOffsetTop - canvasHeight / 2;
        prevX = event.pageX - canvasElementOffsetLeft;
        prevY = event.pageY - canvasElementOffsetTop;

        startNodeIndex = getNodeIndex(prevX, prevY);
        console.log('start at node-' + startNodeIndex);
    }

    handleMouseUp = (event) => {
        console.log('mouse up');

        this.isMouseDown = false;

        endNodeIndex = getNodeIndex(prevX, prevY);
        console.log('end at node-' + endNodeIndex);

        if (startNodeIndex > 0 && startNodeIndex < graph.length + 1 && endNodeIndex > 0 && endNodeIndex < graph.length + 1) {
            console.log('add link ' + startNodeIndex + ' ' + endNodeIndex);
            addOrRemoveEdge(startNodeIndex, endNodeIndex);
        }

        startNodeIndex = 0;
        endNodeIndex = 0;
    }

    handleMouseMove = (event) => {
        var x = event.pageX - canvasElementOffsetLeft;
        var y = event.pageY - canvasElementOffsetTop;

        if (x > canvasWidth - 10 || x < 10 || y > canvasHeight - 10 || y < 10) {
            this.isMouseDown = false;
        }

        const ctx = this.refs.canvas.getContext('2d');
        if (this.isMouseDown) {

            prevX = x;
            prevY = y;
        }
    }

    render() {
        const clearButtonStyle = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            width: '200px',
            height: '50px',
            fontSize: '20px'
        };

        const textAreaStyle_1 = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            width: '400px',
            height: '120px',
            fontSize: '20px'
        };

        const textAreaStyle_2 = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            width: '400px',
            height: '70px',
            fontSize: '20px'
        };

        return (
            <React.Fragment>
                <canvas id='canvas' ref="canvas" width={canvasWidth} height={canvasHeight} onMouseUp={this.handleMouseUp} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} />
                {/* <textarea id='cmdTextArea' style={textAreaStyle_1}></textarea>
                <textarea id='outputTextArea' style={textAreaStyle_2}></textarea> */}
                {/* <button onClick={this.addNode} className="btn btn--stripe" style={clearButtonStyle}>Add New Node</button> */}
                {/* <button onClick={updateNode} className="btn btn--stripe" style={clearButtonStyle}>Update Node</button>
                <button onClick={this.findMaxClique} className="btn btn--stripe" style={clearButtonStyle}>Find Max Clique</button> */}
            </React.Fragment>
        );
    }
}

export default CanvasGraph;
export { updateNode, findMaxClique, graphExample1, graphExample2, graphExample3, graphExample4 };
