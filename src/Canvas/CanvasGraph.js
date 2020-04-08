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
    const rds = 200;

    drawFilledCircle({ ctx: ctx, x: 400 + rds * Math.cos(Math.PI / 2), y: 300 - rds * Math.sin(Math.PI / 2), radius: 20, color: "#2B5F75" });

    ctx.lineWidth = 3;  //设置线条宽度
    // draw lines
    for (let i = 0; i < vertexNums; i++) {
        for (let j = 1; j < graph[i].length; j++) {


            const temp_x1 = 400 + rds * Math.cos(Math.PI / 2 - (graph[i][0] - 1) * (Math.PI * 2) / vertexNums);
            const temp_y1 = 300 - rds * Math.sin(Math.PI / 2 - (graph[i][0] - 1) * (Math.PI * 2) / vertexNums);
            const temp_x2 = 400 + rds * Math.cos(Math.PI / 2 - (graph[i][j] - 1) * (Math.PI * 2) / vertexNums);
            const temp_y2 = 300 - rds * Math.sin(Math.PI / 2 - (graph[i][j] - 1) * (Math.PI * 2) / vertexNums);

            ctx.moveTo(temp_x1, temp_y1);
            ctx.lineTo(temp_x2, temp_y2);
            ctx.strokeStyle = 'black';   //绘制边框样式
            ctx.stroke();
        }
    }

    // draw inner cycles
    for (let i = 0; i < vertexNums; i++) {
        const temp_x = 400 + rds * Math.cos(Math.PI / 2 - i * (Math.PI * 2) / vertexNums);
        const temp_y = 300 - rds * Math.sin(Math.PI / 2 - i * (Math.PI * 2) / vertexNums);
        drawFilledCircle({ ctx: ctx, x: temp_x, y: temp_y, radius: 20, color: "#2B5F75" });

        ctx.font = "20px Georgia";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(i + 1, temp_x - 5, temp_y + 4);
    }

    // setCMDTextArea();

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

var graph = [[1, 5, 2, 7, 8], [2, 4, 1, 3, 5, 6], [3, 2, 4, 5], [4, 2, 3, 5], [5, 2, 4, 1, 3], [6, 2], [7, 1], [8, 1]];

// const NODENUM = '4';
// const TESTINPUT = '0 1\n' + '';

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
    for (let index = 0; index < result.length; index++) {
        if ((result[index].match(/1/g) || []).length === bound) {
            temp.push(result[index]);
        }
    }
    result = temp;
    document.getElementById("outputTextArea").value = ('result: ' + result);

    console.log('calculation times: ' + calculationTimes);
}



class CanvasGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        
    }

    findMaxClique() {
        findMaximumClique();
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
            height: '150px',
            fontSize: '20px'
        };

        const textAreaStyle_2 = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            width: '400px',
            height: '50px',
            fontSize: '20px'
        };

        return (
            <React.Fragment>
                <canvas id='canvas' ref="canvas" width={canvasWidth} height={canvasHeight} />
                <textarea id='cmdTextArea' style={textAreaStyle_1}></textarea>
                <textarea id='outputTextArea' style={textAreaStyle_2}></textarea>
                <button onClick={this.addNode} className="btn btn--stripe" style={clearButtonStyle}>Add New Node</button>
                <button onClick={this.updateNode} className="btn btn--stripe" style={clearButtonStyle}>Update Node</button>
                <button onClick={this.findMaxClique} className="btn btn--stripe" style={clearButtonStyle}>Find Max Clique</button>
            </React.Fragment>
        );
    }
}

export default CanvasGraph;
