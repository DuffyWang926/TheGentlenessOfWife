function $id(id){
	return document.getElementById(id);
}

function rand(min,max){
	return Math.round(Math.random()*(max -min) +min);
}
 function getStyle(obj,attr){
	return window.getComputedStyle?window.getComputedStyle(obj,false)[attr] : obj.currentStyle[attr];
}
function bufferMove(obj,json,time,callback){
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		//获取实际内容样式值
		var flag=true;
		var current;
		for(var attr in json){
			console.log(json[attr]);
			if( attr == "opacity" ){
				current =parseFloat( getStyle(obj,attr) )*100 ;
			}else{
				current =parseInt( getStyle(obj,attr) ) ;
				console.log(getStyle(obj,attr));
			}
			var speed = (json[attr]-current)/10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if( current != json[attr] ){
				flag = !flag;
				console.log(flag);
			}
			if( attr == "opacity" ){
				obj.style.opacity = (current + speed)/100;
			}else{
				obj.style[attr] = current + speed + "px";
				console.log(obj.style[attr]);
			}
				
			
		}
		if(flag){
			clearInterval(obj.timer);
				if(callback){
					callback();
				}
		}
	},time)
	
}

function uniformMove(obj,json,time,callback){
	clearInterval(obj.timer);
	var start;
	for(var attr in json){
		start=parseInt(getStyle(obj,attr));
	}
	
	obj.timer = setInterval(function(){
		//获取实际内容样式值
		
		var flag=true;
		var current;
		for(var attr in json){
			
//			console.log(json[attr]);
			if( attr == "opacity" ){
				current =parseFloat( getStyle(obj,attr) )*100 ;
			}else{
				current =parseInt( getStyle(obj,attr) ) ;
//				console.log(getStyle(obj,attr));
				
//				console.log(start);
			}
			var speed = (json[attr]-start)/time;
//			if((json[attr] - current) <= obj.offsetWidth){
//				speed = (json[attr]-current)/5;
//			}
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//			console.log(speed);
//			console.log( json[attr]);
			if( json[attr] > start ){
//				console.log("qianjin");
				if(current <= json[attr]){
					
					flag = false;
				}
			}else if(json[attr] < start){
//				console.log("daotui")
				if(current >= json[attr]){
//					console.log("daotui")
					
					flag = false;
				}
			}
			if( attr == "opacity" ){
				obj.style.opacity = (current + speed)/100;
			}else{
				obj.style[attr] = current + speed + "px";
//				console.log(speed);
//				console.log(obj.style[attr]);
			}
				
			
		}
//		console.log(flag);
		if(flag){
			
			clearInterval(obj.timer);
				if(callback){
					callback();
				}
		}
	},time)
}
function collide(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop + obj1.offsetHeight;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj2.offsetWidth;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop + obj2.offsetHeight;
	
	if( R1<L2||L1>R2||B1<T2||T1>B2 ){ //碰不上的条件
		return false;
	}else{
		return true;
	}
}

//获得属性值

function getStyle(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}

//来回运动
function alternateMove(obj,json,timeA,flag,callback,timeB,count){
	console.log(obj + "来回运动开始");
	console.log(obj);
	obj.style.position="absolute";
	var start = 306;
	var end = 0;
	var arrName = "";
	var arrValue = 0;
	for(var arr in json){
		arrName = arr;
		arrValue = json[arr];
	}
//	start = parseInt(getStyle(obj,arrName));
//	console.log(start);
	function alternate(){
			json[arrName] = arrValue;
			console.log(json + "alter kaishi");
		uniformMove(obj,json,timeA,function(){
			console.log(json);
			if(flag){
				json[arrName] = start;
			}
			console.log(json);
			uniformMove(obj,json,timeA,function(){
				if(callback){
					callback();
				}
			});
			if(count){
//				console.log(count);
				if(count > 0 && count--){
					clearInterval(timer);
				}
			}
			
		});
	}
	alternate();
	
	if(flag){
		var timer = setInterval(alternate,timeB*1000);
	}
	console.log(obj + "来回运动结束");
	
}

function circleMove(obj,circleX,circleY,r,deg1,deg2,time,flag,callback){
	var deg = deg1;
	function circleMove(){
		var degr=deg*Math.PI/180;
		var x,
		y;
		
		x = circleX + r*Math.cos(degr);
		y = circleY + r*Math.sin(degr);
		obj.style.position="absolute";
		obj.style["left"]=x + "px";
		obj.style["top"]=y + "px";
		deg = deg1 < deg2 ? deg +=1 : deg -=1;
//		console.log(deg);
		if(deg == deg2){
			
			if(!flag){
				clearInterval(timer);
				if(callback){
					callback();
				}
			}
			
			deg = deg1;
		}
		
	}
	var timer = setInterval(circleMove,time);
	if(deg == deg2 && !flag){
		clearInterval(timer);
	}

}
