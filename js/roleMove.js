
function roleUp(obj){
	
	alternateMove(obj,{"top":100},20,true,function(){},2,1);
}

function roleDown(obj){
	alternateMove(obj,{"top":200},50,true,function(){},2,1);
	
}

function roleLeft(obj){
	
	var end = obj.offsetLeft - 50;
	alternateMove(obj,{"left":end},30,false);
}

function roleRight(obj){
	
	var end = obj.offsetLeft + 50;
	alternateMove(obj,{"left":end},30,false);
}
//控制上下左右
function roleMove(obj,objA,objB,objC,objD){
	console.log(obj + "控制其上下左右");
	var flag = true; 
	objA.onclick = function(){
		
		roleLeft(obj);
		
	}
	objB.onclick = function(){
		if(flag){
			
			roleUp(obj);
		}
	}
	
	objC.onclick = function(){
		roleRight(obj);
	}
	objD.onclick = function(){
		roleDown(obj);
	}
	
}
