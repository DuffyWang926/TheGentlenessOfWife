

window.onload=function(){
	var kitty = $id("kitty"),
	 playView = $id("playView"),
	 person=$id("person"),
	 presentBox = $id("presentBox"),
	 enemyBox=$id("enemyBox"),
	 persona=$id("person"),
	 gameOver=false,
	 score=$id("score"),
	 scoreImgs=score.children,
	 marquee=$id("saying"),
	 presentSet= new Set(),
	 sayLove=$id("sayLove"),
	 groundBg=$id("groundBg");
	var person =  new Person();
	
	
	var cookie = document.cookie;
	var cookies = cookie.split("; ")[0];
	var name = cookies.split("=")[1];
	console.log(name);
	var reg = /^\w{3,4}$/;
	if(!reg.test(name)){
		name="老婆";
	}
	marquee.innerHTML=name + "我爱你！自从遇见你，我打磨幽默，炼就情怀，铸成铁骨，只为成为你非他不嫁的那个男人。" + name +
	"：放屁！老娘瞎了眼，才会看上你。跪下！";
	gamePadClick(person.div);
	
	initial();
	
	
//	得分
	countTime(function(time){
		var presentArr = [];
		
		
		if(time% 5 == 0){
			var boxa = producePreasent();
			
			var timer = setInterval(function(){
				judge(person,boxa,function(score){
					updateScore(scoreImgs,score);
					presentSet.add(boxa.str);
				});
				for(var x of presentSet){
					switch (x){
						case "你":
							presentArr[0]="你";
							break;
						case "虐":
							presentArr[1]="虐";
							break;
						case "我":
							presentArr[2]="我";
							break;
						case "千":
							presentArr[3]="千";
							break;
						case "万":
							presentArr[4]="万";
							break;
						case "遍":
							presentArr[5]="遍，";
							break;
						case "待":
							presentArr[7]="待";
							break;
						case "如":
							presentArr[9]="如";
							break;
						case "初":
							presentArr[10]="初";
							break;
						case "见":
							presentArr[11]="见";
							break;
							
					}	
				}
				
				if(presentSet.size == 8){
					presentArr[6]="我";
				}else if(presentSet.size == 9){
					presentArr[8]="你";
				}
				var str = presentArr.join("");
				sayLove.innerHTML = str;
				
			},300);
		}
	});
	
	
//	判断是否跳过
	
	countTime(function(time){
		if(time% 7 == 0){
			var obstacle = new Obstacle();
			
			var time = setInterval(function(){
				judge(person,obstacle,function(score){
					updateScore(scoreImgs,score);
				});
			},300);	
			obstacle.move();
			
		}
	});
}

function initial(){
	var end=playView.offsetWidth - kitty.offsetWidth;
	console.log(end);
	console.log(kitty);
	kitty.className="alterMove";
	groundBg.className="bgMove";
	
}
function updateScore(scoreImgs,score){
	console.log("gengxin " + score);
	
	if(score < 0){
			if(confirm("离开")){
						location.href="indexThunder.html"
					}else{
						open("firstLevel.html","_self");
					}
	}else if(score> 90){
		open("secondLevel.html","_self");
	}
	
	var unit = score%10,
	ten = parseInt(score/10)%10;
	
	console.log(unit + " "+ ten);
	console.log(scoreImgs);
	scoreImgs[0].src="img/yellow/f_"+ten+".png";
	scoreImgs[1].src="img/yellow/f_"+unit+".png";
	
}
function gamePadClick(boxa){
	console.log(boxa);
	var left = $id("gameLeft"),
	up = $id("gameUp"),
	right = $id("gameRight"),
	down = $id("gameDown");

	roleMove(boxa,left,up,right,down);


//function backgroundMove(obj){
//	console.log(groundBg);
//	var obj = obj;
//	function singleMove(){
//		alternateMove(obj,{"left":-500},50,false,function(){
//		console.log("call");
//		console.log(parseInt(obj.style.left) <= -1000);
//		
//		if(parseInt(obj.style.left) <= -500){
//		obj.style.left="0px";
//			}
//		});
//	}
//	singleMove();
//	setInterval(singleMove,1000);
//} 出现卡顿改用css
}
function countTime(callback){
	var time = 0;
	setInterval(function(){
		
		time += 0.5;
		
		callback(time);
		
	},500);
	
}

function Person(){
	if(!Person.instance){
		Person.instance={
			div:$id("person"),
			score:0,
			timer:0
		}
		
	}
	return Person.instance;
}

function Present(obj){

	this.div = document.createElement("div");
	this.div.className="presentBox";
	obj.appendChild(this.div);
	this.circleX=100;
	this.circleY=150;
	this.r=125;
	this.deg1=180;
	this.deg2=0;
	this.time=10;
	this.str="";
	this.timer=0;
	
	this.singleMove=function(callback){
		var that =this;
		circleMove(this.div,this.circleX,this.circleY,this.r,this.deg1,this.deg2,this.time,
		false,function(){
			that.deg3 = that.deg1 ;
			that.deg4 = that.deg2 + 360;
			that.circleX2 = that.circleX + 2*that.r;
		circleMove(that.div,that.circleX2,that.circleY,that.r,that.deg3,that.deg4,that.time,
		false,callback);
		});
	}
	this.move = function(callback){
		var that = this;
		this.singleMove(function(){
			if(parseInt(getStyle(that.div,"left")) >= 4*that.r -26){
				that.circleX +=4*that.r;
				that.singleMove(function(){
					that.div.remove();
				});
			}
		});
		if(callback){
			calllback();
		}
	}
}

function producePreasent(){
	
	var arrData = "你虐我千万遍我待你如初见",
	num=-1,
	str = "",
	len = arrData.length,
	boxa = new Present(present);
	
	num = rand(0,len-1);
	str= arrData.charAt(num);
	boxa.div.innerHTML= str;
	boxa.str= str;
	boxa.move();
	return boxa;
	
}

function Obstacle(){
//	this.target=$id("person.div");
	this.div = $id("enemyBox").cloneNode(true);
	playView.appendChild(this.div);
	this.timer=0;
	this.move = function(){
		alternateMove(this.div,{"left":-300},50,false,function(){
			console.log("xiaoshi");
			this.destroy();
		}.bind(this));	
	}
	this.destroy=function(){
		this.div.remove();
	}
	
}


function judge(person,obj,callback){
	console.log("panduan collide");
	function judger(){
//		console.log(person.div);
//		console.log(obj.div);
//		console.log(collide(person.div,obj.div));	
		if(obj instanceof Obstacle){
			if(collide(person.div,obj.div)){
//				console.log("zhuangdao l ");
			person.score -=5;
			
			if(callback){
					callback(person.score);
				}

			}else{
//				console.log("tingzhi timer");
				clearInterval(timer);
			}
//			console.log("shi Obstacle")
					
		}else if(obj instanceof Present){
			if(collide(person.div,obj.div)){
//				console.log("zhuangdao l ");
//				console.log("shi Present");
				person.score +=1;
//				console.log(person.score);
				if(callback){
					callback(person.score);
				}
				
			}else{
//				console.log("tingzhi timer");
				clearInterval(timer);
			}
			
		}
		
	}
//	judger();
	
	var timer= setInterval(function(){
		
		judger();
			
		},500); 
	
}
