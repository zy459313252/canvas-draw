/*
* @Author: Administrator
* @Date:   2017-06-17 17:59:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-17 18:03:06
*/

'use strict';
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//定义图形类型
var shapeType = "";
//是否绘制
var isDraw = false;
var startPoint = {};

//切换类型
function changeShapeType(type) {
	shapeType = type;
	console.log("type = " + type);
}

//清除画布
function dealResetCanvas() {
	ctx.save();
	//清除画布
	ctx.clearRect(0,0,880,410);
	ctx.restore();
}

//修改线宽
function dealChangeWidth(num){

	ctx.lineWidth = num;
	
}

//修改颜色
function dealChangeColor(tag){
	var color = tag.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

var dealMouse = function(event) {
	var currentPoint = {};
	currentPoint.x = event.x - canvas.offsetLeft;
	currentPoint.y = event.y - canvas.offsetTop;
	
	//添加画笔的代码
	if(shapeType == "pen") {
		if(event.type == "mousedown"){
			//开始绘制了
			isDraw = true;
			//存储绘制状态
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(currentPoint.x,currentPoint.y);
		}
		
		if(event.type == "mousemove"){
			if(isDraw){
				ctx.lineTo(currentPoint.x,currentPoint.y);
				ctx.stroke();
			}
		}
		
		if(event.type == "mouseup"){
			isDraw = false;
			ctx.closePath();
			ctx.restore();
		}
	}
	
	//添加橡皮擦
	if(shapeType == "clean"){
		if(event.type == "mousedown"){
			//设置状态
			isDraw = true;
			ctx.save();
			ctx.fillStyle = "#fff";
			ctx.fillRect(currentPoint.x-10,currentPoint.y-10,20,20);
			
		}
		if(event.type == "mousemove"){
			//清除指定的30×30某个区域
			if(isDraw){
				ctx.fillStyle = "#fff";
				ctx.fillRect(currentPoint.x-10,currentPoint.y-10,20,20);
			}
				
		}
		if(event.type == "mouseup"){
			//结束清除
			ctx.restore();
			isDraw = false;
		}
	}
	
	//添加文字
	if(shapeType == "text"){
		if(event.type == "mousedown"){
			isDraw = true;
			ctx.save();
			ctx.beginPath();
			
		}
		if(event.type == "mousemove"){
			
		}
		if(event.type == "mouseup"){
			
			ctx.font = "20px Arail";
			ctx.closePath();
			ctx.fillText();
			ctx.restore();
			isDraw = false;
		}
	}
	
	//添加刷子
	if(shapeType == "paint"){
		if(event.type == "mousedown"){
			//设置状态
			isDraw = true;
			ctx.save();
			ctx.fillRect(currentPoint.x-10,currentPoint.y-10,20,20);
			
		}
		if(event.type == "mousemove"){
			//清除指定的30×30某个区域
			if(isDraw){
				ctx.fillRect(currentPoint.x-10,currentPoint.y-10,20,20);
			}
				
		}
		if(event.type == "mouseup"){
			//结束清除
			ctx.restore();
			isDraw = false;
		}
	}
	
	//添加文字
	if(shapeType == "text"){
		if(event.type == "mousedown"){
			isDraw = true;
			ctx.save();
			ctx.beginPath();
			
		}
		if(event.type == "mousemove"){
			
		}
		if(event.type == "mouseup"){
			
			ctx.font = "20px Arail";
			ctx.closePath();
			ctx.fillText();
			ctx.restore();
			isDraw = false;
		}
	}
	
	//添加画直线的代码
	if(shapeType == "line"){
		if(event.type == "mousedown"){
			isDraw = true;
			ctx.save();
			ctx.beginPath();
			
			ctx.moveTo(currentPoint.x,currentPoint.y);
		}
		if(event.type == "mousemove"){
			
		}
		if(event.type == "mouseup"){
			
			ctx.lineTo(currentPoint.x,currentPoint.y);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
			isDraw = false;
		}
	}
	
	//圆形代码
	if(shapeType == "circle") {
		if(event.type == "mousedown"){
			isDraw = true;
			ctx.save();
			ctx.beginPath();
			
			startPoint = currentPoint;
		}
		if(event.type == "mousemove"){
			
		}
		if(event.type == "mouseup"){
			//圆心
			var centerX = (startPoint.x+currentPoint.x)/2;
			var centerY = (startPoint.y+currentPoint.y)/2;
			//直径
			var d = Math.sqrt(Math.pow(startPoint.x-currentPoint.x,2) + Math.pow(startPoint.y-currentPoint.y,2));
			var r = d/2;
			
			ctx.arc(centerX,centerY,r,0,Math.PI*2);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
			isDraw = false;
		}
	}
	
	//矩形代码
	if(shapeType == "rect"){
		if(event.type == "mousedown"){
			isDraw = true;
			ctx.save();
			ctx.beginPath();
			
			//保存了矩形左上角位置
			startPoint = currentPoint;
		}
		if(event.type == "mousemove"){
			
		}	
		if(event.type == "mouseup"){
			// 矩形左下角位置 currentPoint
			var w = Math.abs(startPoint.x - currentPoint.x);
			var h = Math.abs(startPoint.y-currentPoint.y);
			var x = Math.min(startPoint.x,currentPoint.x);
			var y = Math.min(startPoint.y,currentPoint.y);
			
			ctx.strokeRect(x,y,w,h)
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
			isDraw = false;
		}
	}
	
	//三角形
	if(shapeType == "poly"){
		if(event.type == "mousedown"){
			isDraw = true;
			ctx.save();
			ctx.beginPath();
			startPoint = currentPoint;
			ctx.moveTo(startPoint.x,startPoint.y);
		}
		if(event.type == "mousemove"){
			
		}	
		if(event.type == "mouseup"){
			
			ctx.lineTo(currentPoint.x,currentPoint.y);
			ctx.lineTo(currentPoint.x-(currentPoint.x-startPoint.x),currentPoint.y);
			ctx.lineTo(startPoint.x,startPoint.y);
			
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
			isDraw = false;
		}
	}
	
	//填充圆形代码
	if(shapeType == "arcfill") {
		if(event.type == "mousedown"){
			isDraw = true;
			ctx.save();
			ctx.beginPath();
			
			startPoint = currentPoint;
		}
		if(event.type == "mousemove"){
			
		}
		if(event.type == "mouseup"){
			//圆心
			var centerX = (startPoint.x+currentPoint.x)/2;
			var centerY = (startPoint.y+currentPoint.y)/2;
			//直径
			var d = Math.sqrt(Math.pow(startPoint.x-currentPoint.x,2) + Math.pow(startPoint.y-currentPoint.y,2));
			var r = d/2;
			
			
			ctx.arc(centerX,centerY,r,0,Math.PI*2);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
			isDraw = false;
		}
	}
	
	//填充矩形代码
	if(shapeType == "rectfill"){
		if(event.type == "mousedown"){
			isDraw = true;
			ctx.save();
			ctx.beginPath();
			
			//保存了矩形左上角位置
			startPoint = currentPoint;
		}
		if(event.type == "mousemove"){
			
		}	
		if(event.type == "mouseup"){
			// 矩形左下角位置 currentPoint
			var w = Math.abs(startPoint.x - currentPoint.x);
			var h = Math.abs(startPoint.y-currentPoint.y);
			var x = Math.min(startPoint.x,currentPoint.x);
			var y = Math.min(startPoint.y,currentPoint.y);
			
			
			ctx.fillRect(x,y,w,h)
			ctx.closePath();
			ctx.fill();
			ctx.restore();
			isDraw = false;
		}
	}
}

// 处理鼠标的事件
canvas.addEventListener("mousedown",dealMouse);
canvas.addEventListener("mousemove",dealMouse);
canvas.addEventListener("mouseup",dealMouse);