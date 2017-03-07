/**
 * @name LetsDraw!JS - library for canvas drawing
 * @author Andrey Kizimov (independ12@gmail.com)
 */
"use strict";
(function(){

    var version = '0.1';
    var mainCanvas = undefined;
    var mainContext = undefined;

    var floppyPropertyDiv = undefined;
	var fixedPropertyDiv = undefined;

	var mainMenuDiv = undefined;
    var debugMode = false;
    var selectedIndex = -1;
	var userMouseUnderIndex = -1;
	var autoCorrectPositionFlag = true;

    var ComponentConnected = new Array();
    var ComponentConnectedInit = new Object();
	var menuItemList;
	var backgroundColor = undefined;
	var blockMainWork = false;
	var indexSetBlock = -1;

	var currentIndexInLoop = -1;

    LetsDraw.GetSelectedIndex = function(){
        return selectedIndex;
    }

	LetsDraw.GetCurrentComponent = function(){
		
		if(selectedIndex >= 0 && mainBuffer.listOfComponents.length > 0)
			return mainBuffer.listOfComponents[selectedIndex];
		else
			return true;
	}
	
	

    /**
     * Inizialize module
     * @param[] canvasID, toolbarID
     */
    function LetsDraw( param ){
		
		InitialLangLD(param['lang'] || "en");
		
		//Checking canvas element
        if(param['canvasID'] == undefined || param['canvasID'] == null){
            console.error("LetsDraw!JS: canvas doesn`t exist");
		   
        }

        mainCanvas = document.getElementById(param['canvasID']);
        mainContext = mainCanvas.getContext("2d");
  
		//Cheking panel for tool
        if(param['toolDivID'] == undefined || param['toolDivID'] == null)
        {
            console.log("LetsDraw!JS: tool div doesn`t exist");
        }

		

        floppyPropertyDiv = document.getElementById(param['toolDivID']);
		fixedPropertyDiv  = document.getElementById(param['fixedToolDivID']);
		
		LetsDraw.fixedPropertyDiv = fixedPropertyDiv;
		LetsDraw.floppyPropertyDiv = floppyPropertyDiv;
		
		if(param['mainToolDivID'])
		{
			mainMenuDiv = document.getElementById(param['toolDivID']);
			createMainMenu();
		}
		
        debugMode = param['debug'];

		backgroundColor = param['backgroundColor'] || "#fff";
		mainContext.fillStyle = backgroundColor;
		mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);


        ComponentConnected = param['components'];

        
            for(var elem in ComponentConnected){
                ComponentConnectedInit[elem] = new  ComponentConnected[elem]();

                if(!ComponentConnectedInit[elem].name){
                    if(debugMode)
                        console.error("LetsDraw!JS: `"+(typeof ComponentConnectedInit[elem])+"` component has not `name`");
                }
                else{
                    if(debugMode)
                        console.info("LetsDraw!JS: `"+ComponentConnectedInit[elem].name+"` was joined");
                }
            }
        



/**
* Can be deleted
**/
function createMainMenu()
{


}   


/**
* Return array of current object in cover
**/
var GetComponentOnScene = function()
{
	return mainBuffer.listOfComponents;
}
LetsDraw.GetComponentOnScene = GetComponentOnScene;


var showElementsList = function(){
	
	contextMenu.clearMenu();
	contextMenu.addHeader({text: langLD.addElement});
	contextMenu.prepareMenu();
	
	for( var elem in ComponentConnectedInit )
	{
		
		var savedComponent = new saveComponent( new ComponentConnected[elem]()); //save current component in function

		contextMenu.addElements({"elem":{
			value: ComponentConnectedInit[elem].name,
			description: ComponentConnectedInit[elem].description,
			data: new saveComponent( new ComponentConnected[elem]()),
			image: ComponentConnectedInit[elem].previewImg,
			action: 
			function ( data ){

				mainBuffer.addToBuffer(data.component);

			},
			visiblePredicat: function()
			{
				return true;
			}
		}
		});
	}

	contextMenu.showMenu();
}
LetsDraw.showElementsList = showElementsList;

function saveComponent( component ){
	this.component = component;
}


function aboutPrint (){
	
	contextMenu.clearMenu();
	var header = document.createElement("h2");
	header.innerHTML = "LetsDraw!JS";
	floppyPropertyDiv.appendChild(header);
	floppyPropertyDiv.style.display = "block";
	var version = document.createElement("p");
	version.innerHTML = LetsDraw.version + "<br> &copy 2017 Andrey Kizimov";



	floppyPropertyDiv.appendChild(version);

	var copy1 = document.createElement("p");
	copy1.innerHTML = "&copy Icons from <a href='http://iconmonstr.com'>iconmonstr.com</a><br>B-spline interpolate <a href='https://github.com/thibauts/b-spline'>thibauts</a>";
	floppyPropertyDiv.appendChild(copy1);

	contextMenu.prepareMenu();
	contextMenu.addElements({
		"Git":{
			value: "<a target='_blank' href='https://github.com/Bookler96/letsdrawjs'>GitHub</a>",
			action: function(){},
			visiblePredicat: function()
			{
				return true;
			}
		},
		"Web-site":{
			value: "<a target='_blank' href='http://bookleron.com/letsdraw'>Visit LetsDraw!JS web site</a>",
			action: function(){},
			visiblePredicat: function(){
				return true
			}
		}
	});
	contextMenu.showMenu();

	
} 

var showCustomMenu = function(){
	
}

/**
* Listening right mouse click and show context menu
**/
mainCanvas.addEventListener( "contextmenu", function(e) {
      e.preventDefault();
	  contextMenu.clearMenu();
	  contextMenu.prepareMenu();
	  contextMenu.addElements({
		  Create: menuItemList.Create,
		  Delelte: menuItemList.Delete,
		  Copy: menuItemList.Copy,
		  Paste: menuItemList.Paste,
		  "To back": menuItemList["To back"],
		  "To front": menuItemList["To front"],
		  Lock: menuItemList.Lock,
		  Settings: menuItemList.Settings,
		  About: menuItemList.About
	  });
	  contextMenu.showMenu();
  });

  

 
function SettingProperty()
{
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	
	if( autoCorrectPositionFlag ){
		checkbox.checked = "checked";
	}
	
	checkbox.addEventListener("change", function(e){
		console.log(autoCorrectPositionFlag);
		autoCorrectPositionFlag = !autoCorrectPositionFlag;
	});
	
	var label = document.createElement("label");
	label.innerHTML = "Auto-correct position";
	label.appendChild(checkbox);
	contextMenu.prepareMenu();
	contextMenu.clearMenu();
	contextMenu.addHeader({text: "Settings"});
	floppyPropertyDiv.appendChild(label);
	contextMenu.showMenu();
}
 
mainCanvas.ondblclick = function(){

	contextMenu.clearMenu();
	 while(fixedPropertyDiv.firstChild){
			 fixedPropertyDiv.removeChild(fixedPropertyDiv.firstChild);
			
	}
	
	//Show settings for current element
	if(selectedIndex >= 0){
		setPropertyField();
		mainBuffer.listOfComponents[selectedIndex].changeComponent();
		
	}
	
	if(indexSetBlock != LetsDraw.GetSelectedIndex())
		blockMainWork = false;


}
var prevID = -1; //Previous id of selected element

mainCanvas.onmousedown =  function(e){

	
	prevID = selectedIndex;
	userMouse.isMouseDown = true;
	selectedIndex = userMouseUnderIndex;
	userMouseUnderIndex = -1;
	selectedIndex = -1;

	render();
	
	if(selectedIndex == -1)
		while(fixedPropertyDiv.firstChild)
			fixedPropertyDiv.removeChild(fixedPropertyDiv.firstChild);

	
	
	if(selectedIndex >= 0 && prevID != selectedIndex){

		contextMenu.clearMenu();
		setPropertyField();
		
		while(fixedPropertyDiv.firstChild)
			fixedPropertyDiv.removeChild(fixedPropertyDiv.firstChild);
		
		mainBuffer.listOfComponents[selectedIndex].changeComponent();
		blockMainWork = false;
	}

}

mainCanvas.onmouseup = function(e){

	userMovingElement = false;
	userMouse.isMouseDown = false;
	resizeModeUse = false;
	render();

	
}

mainCanvas.onmousemove = mainCanvas.ontouchmove = function (e){

	var rect = this.getBoundingClientRect();
	userMouse.dX =  (e.clientX - rect.left) - userMouse.x;
	userMouse.dY =  (e.clientY  - rect.top)  - userMouse.y;
	userMouse.x = e.clientX  - rect.left;
	userMouse.y = e.clientY - rect.top;
	userMouse.absoluteX = e.clientX;
	userMouse.absoluteY = e.clientY;
	userMouse.isMouseMove = true;
	render();
}

/**
 * Handler for delete button
 */
var ctrlDown = false;
document.onkeydown = function(e){
	
	/**
	* Handler for Del
	*/
	if( e.keyCode == 46 ){
		if( selectedIndex >= 0 && mainBuffer.listOfComponents.length > 0 ){
			mainBuffer.deleteFromBuffer();
		}
	}
	
	/**
 	* Handler for Ctrl
 	*/
	 if( e.keyCode == 17 ){
		 ctrlDown = true
	 }
	 
	 /**
	  * Handler for Ctrl+C
	  */
	 if( e.keyCode == 67 && ctrlDown ){
		mainBuffer.Copy();
	 }

	 /**
	  * Handler for Ctrl+V
	  */
	  if( e.keyCode == 86 && ctrlDown ){
		  mainBuffer.Paste();
	  }
}

document.onkeyup = function(e){
	
	if( e.keyCode == 17 )
		ctrlDown = false;
	
}

/**
* Item list elements of context menu
*/
menuItemList = {
		
		  	"Create":{
			  	value: langLD.addElement, action: function(){setTimeout(showElementsList());},
				'image': 'images/create.png',
				visiblePredicat: function(){
					return true
				}

		  	},
			"Delete":	{
				value: langLD.deleteElement, action: function(){mainBuffer.deleteFromBuffer();},
				"image": 'images/delete.png',
				visiblePredicat: function(){
						return (LetsDraw.GetSelectedIndex() >= 0)
				}
			},
			"Copy": {
				value: langLD.copyElement, action: function(){
					var selected = mainBuffer.listOfComponents[selectedIndex];
		

                    //Check type from componentList and Create it
                    for(var elem in ComponentConnectedInit){
                        if(selected.name == ComponentConnectedInit[elem].name){
                            var temp = new ComponentConnected[elem]();
                        }
                    }
					
			
				
					for(var elem in selected){
						
						if(selected.hasOwnProperty(elem)){
							temp[elem] = selected[elem];
						}
					}
		
					console.log(temp);
			
					temporaryBuffer.putInBuffer(temp);

				},
				image: "images/copy.png",
				visiblePredicat: function(){ //Show only if a element selected
						return (LetsDraw.GetSelectedIndex() >= 0)
				}
				
			},
			"Paste": {
				value: langLD.pasteElement, action: function(){
					var selected = temporaryBuffer.getBuffer();


                 for(var elem in ComponentConnectedInit){
                        if(selected.name == ComponentConnectedInit[elem].name){
                            var temp = new ComponentConnected[elem]();
                        }
                    }
					
		
				
					for(var elem in selected){
						
						if(selected.hasOwnProperty(elem)){
							temp[elem] = selected[elem];
						}
					}
					temp.x =0;
					mainBuffer.addToBuffer(temp);
			
					render();
			
				},
				image: "images/paste.png",
				visiblePredicat: function(){ //Show only if element is in the buffer
					return temporaryBuffer.checkBuffer();
				}
			},
			"To back": {
				value: langLD.toBackElement,
				image: "images/down.png",
				action: function(){ mainBuffer.toBack(); render(); },
				visiblePredicat: function(){
						return (LetsDraw.GetSelectedIndex() >= 0)
				}
			},
			"To front":{
				value: langLD.toFrontElement,
				image: "images/up.png",
				action: function(){ mainBuffer.toFront(); render()},
				visiblePredicat: function(){
						return (LetsDraw.GetSelectedIndex() >= 0)
				}
			},
			"Lock": {
				value: langLD.lockElement,
				description: langLD.lockDesc,
				action: function(){
					LetsDraw.ChangeCurrentElement({
						block: !(LetsDraw.GetCurrentComponent().block)
					});
				
				},
				image: "images/lock.png",
				visiblePredicat: function(){
					if(LetsDraw.GetCurrentComponent().block == true){
						this.value = langLD.unlockElement;
						this.image =  "images/unlock.png";
					}
					else{
						this.value = langLD.lockElement;
						this.image =  "images/lock.png";
					}
					return (LetsDraw.GetSelectedIndex() >= 0)
				}
			},

			"Settings":{
				value: langLD.settings,
				action: function()
				{
					SettingProperty();
				},
				visiblePredicat: function()
				{
					return true
				}
			},
			"About":{
				value: langLD.about,
				action: function(){aboutPrint()},
				visiblePredicat:  function()
				{
					return true;
				}
			}

	}

	function GetMenuList()
	{
		return menuItemList;
	}
	LetsDraw.GetMenuList = GetMenuList;

    LetsDraw.mainBuffer = mainBuffer;
    LetsDraw.mainCanvas = mainCanvas;
    LetsDraw.mainContext = mainContext;
	LetsDraw.ComponentConnected = ComponentConnected;
    }
   
   /**
   * Main class for customs element
   */
    var Component = function(  ){

        this.name = undefined;
		this.id = -1;
        this.value = undefined;
        this.block = false;
		this.color = '#000';
		this.canBeResized = true;
        this.x = 150;
        this.y = 50;
        this.w = 100;
        this.h = 25;
        this.background = "#ccc";

    }

    Component.prototype = {

        createComponent: function(){

        },
        renderComponent: function(){

        },
        changeComponent: function(){
        
        },
        setProperty: function(){

        }
    }

    var x = 0, y =0 ;

/**
 * Set params for selected elements
 * @param{key: value} - property
 */
function ChangeCurrentElement(param){
	for(var elem in param){
		mainBuffer.listOfComponents[selectedIndex][elem] = param[elem];
		if(debugMode){
			console.info("LetsDraw!JS: The value of `"+mainBuffer.listOfComponents[selectedIndex][elem].name+
						"` was changed. (`"+elem.toString()+"` : `"+param[elem]+"`)");
		}
	}
	render();
}
LetsDraw.ChangeCurrentElement = ChangeCurrentElement;


function GetConnectedComponent()
{

	return ComponentConnected;
}

LetsDraw.GetConnectedComponent = GetConnectedComponent;

var resizeExist = false; //shows that resize availible
var resizeModeUse = false; //shows that user make resize
var userMovingElement = false;
var resizeModeAllow = ""; // left-top; right-top


/**
 * ContextMenu 
 */
	var contextMenu = {
	 divCreate: "",
	 ulCreate: "",
	 elements: {},
	 
	 /**
	  * Delete all previos items in menu
	  */
	 clearMenu: function(){
		 while(floppyPropertyDiv.firstChild){
			 floppyPropertyDiv.removeChild(floppyPropertyDiv.firstChild);
			
		 }
		  floppyPropertyDiv.style.display = "none";
	 },
	 
	

	  addHeader: function(param){
		  var div = document.createElement("h3");
		  div.innerHTML = param['text'];
		  floppyPropertyDiv.appendChild(div);
	  },
 	/**
	  * @description "Merge with addElements() function?"
	  */
	 prepareMenu: function(){
		 this.divCreate = document.createElement('div');
		 this.ulCreate = document.createElement("ul");
	 },

	 /**
	  * Add elements in menu 
	  * @param {Object[]} array - collection of items elements via {value: "Label", action: foo()}
	  */
	 addElements: function( array ){

		 

		
		 
		
			var i = 0;
			for(var elem in array)
			{
			 if(array.hasOwnProperty(elem)){
				 
				 if(array[elem].visiblePredicat()){
			
			
				 this.elements[i] = document.createElement("li");
				 this.elements[i].innerHTML = array[elem].value;

				 var obj = array[elem];

				 if(array[elem].image){
					 var image = document.createElement("img");
					 image.src = array[elem].image;
					 this.elements[i].appendChild(image);
				 }

				 if(array[elem].description){
					 var desc = document.createElement("p");
					 desc.innerHTML = array[elem].description;
					 this.elements[i].appendChild(desc);
				 }

				 this.elements[i].addEventListener("click", 
					new contextMenuEvent(array[elem], array[elem].data)
					 , false);
					
				 this.ulCreate.appendChild(this.elements[i]);
				 i++;
				 }
			 }
		 }

	 },
	 /**
	  * Show context menu
	  */
	showMenu: function(){
		floppyPropertyDiv.style.left = userMouse.absoluteX;
		floppyPropertyDiv.style.top = userMouse.absoluteY;
		this.divCreate.appendChild(this.ulCreate);
		floppyPropertyDiv.appendChild(this.divCreate);
		floppyPropertyDiv.style.display = "block";
	},

	setPosition: function( x , y){
		floppyPropertyDiv.style.left = x;
		floppyPropertyDiv.style.top = y;
	}


 }

/**
 * Create event for custom menu function
 * @param obj - function, which we will call
 * @param data=null - arguments for function
 */
var contextMenuEvent = function(obj , data = null){
	var obj1 = obj;
	var data = data;

	function clickMenuItem (){
		contextMenu.clearMenu();
		obj.action(data); //call user`s function
		
	}

	return function(e){
		clickMenuItem();
	}
};


var userMouse = {
	x: 0,
	y: 0,
	absoluteX: 0,
	absoluteY: 0,
	isMouseMove: false,
	isMouseDown: false,
	dX: 0,
	dY: 0
}

var temporaryBuffer = {
	 putInBuffer : function (obj){
		this.object = obj;
	//	this.object.x = 0;
	//	this.object.y = 0;
	},
	getBuffer: function (){
		this.object.x = 0;
		return this.object;
	},

	checkBuffer: function(){
		return (this.object != undefined)
	}
}

temporaryBuffer.prototype = {
	object: undefined
};

var mainBuffer = {
	
	count : 0

}; 
mainBuffer.listOfComponents = new Array();

mainBuffer.addToBuffer =  function(component){

	this.listOfComponents[this.count] = component;
	this.listOfComponents[this.count].id = this.count;
	this.count++;
	this.listOfComponents[this.count-1].createComponent();
	if(debugMode){
		console.log("LetsDraw!JS: "+this.listOfComponents[this.count-1].name+" was added to scene. Id = "+(this.count - 1));
	}
	selectedIndex = this.count - 1;
	render();
}

mainBuffer.getElement = function( index  = this.count){
	return mainBuffer.listOfComponents[index];
}

mainBuffer.deleteFromBuffer = function( start = selectedIndex, count = 1){
	if(mainBuffer.count > 0){
		mainBuffer.listOfComponents.splice(start, count);
		mainBuffer.count -= count;
		render();
	}

}

mainBuffer.toBack = function( index = selectedIndex )
{
	if(selectedIndex > 0 && mainBuffer.listOfComponents.length > 0)
	{
		var temp = mainBuffer.listOfComponents[selectedIndex - 1];
		mainBuffer.listOfComponents[selectedIndex - 1] = mainBuffer.listOfComponents[selectedIndex];
		mainBuffer.listOfComponents[selectedIndex] = temp;
		selectedIndex -= 1;
	}
}

mainBuffer.toFront = function ( index = selectedIndex )
{
	if(selectedIndex < (mainBuffer.listOfComponents.length -1) && mainBuffer.listOfComponents.length > 0)
	{
		var temp = mainBuffer.listOfComponents[selectedIndex + 1];
		mainBuffer.listOfComponents[selectedIndex + 1] = mainBuffer.listOfComponents[selectedIndex];
		mainBuffer.listOfComponents[selectedIndex] = temp;
		selectedIndex += 1;
	}
}

mainBuffer.Copy = function(){
	var selected = mainBuffer.listOfComponents[selectedIndex];
		

                    //Check type from componentList and Create it
                    for(var elem in ComponentConnectedInit){
                        if(selected.name == ComponentConnectedInit[elem].name){
                            var temp = new ComponentConnected[elem]();
                        }
                    }
					
			
				
					for(var elem in selected){
						
						if(selected.hasOwnProperty(elem)){
							temp[elem] = selected[elem];
						}
					}
		
					console.log(temp);
			
					temporaryBuffer.putInBuffer(temp);
}

mainBuffer.Paste = function(){
		var selected = temporaryBuffer.getBuffer();


                 for(var elem in ComponentConnectedInit){
                        if(selected.name == ComponentConnectedInit[elem].name){
                            var temp = new ComponentConnected[elem]();
                        }
                    }
					
		
				
					for(var elem in selected){
						
						if(selected.hasOwnProperty(elem)){
							temp[elem] = selected[elem];
						}
					}
					temp.x =0;
					mainBuffer.addToBuffer(temp);
			
					render();
}

var autoCorrectPosition = function( ){ // auto-correct position
	var savePrevStyle = mainContext.strokeStyle;
	var centerX = (mainCanvas.width - mainBuffer.listOfComponents[selectedIndex].w) / 2;
    	mainContext.strokeStyle = "#ff0000";

	//Center align
	if(Math.abs(mainBuffer.listOfComponents[selectedIndex].x - centerX) < 5){
		mainBuffer.listOfComponents[selectedIndex].x = centerX;
		setTimeout(function(){
            mainContext.strokeStyle = "#ff0000";
            mainContext.moveTo(centerX, 0);
            mainContext.lineTo(centerX, mainBuffer.listOfComponents[selectedIndex].y);
            mainContext.moveTo(centerX + mainBuffer.listOfComponents[selectedIndex].w, 0);
            mainContext.lineTo(centerX + mainBuffer.listOfComponents[selectedIndex].w, mainBuffer.listOfComponents[selectedIndex].y);

            mainContext.stroke();
        });

	}

	//Other elements
	for( var i = 0; i < mainBuffer.count; i++ ){
		if( i != selectedIndex){
			//Left align
			if( Math.abs(mainBuffer.listOfComponents[i].x - mainBuffer.listOfComponents[selectedIndex].x)  < 5){
				setTimeout(function(){
                mainContext.strokeStyle = "#00ff00";
				mainContext.moveTo(mainBuffer.listOfComponents[selectedIndex].x, mainBuffer.listOfComponents[selectedIndex].y);
				mainContext.lineTo(mainBuffer.listOfComponents[selectedIndex].x, mainBuffer.listOfComponents[i].y);
				mainContext.stroke();
				mainBuffer.listOfComponents[selectedIndex].x = mainBuffer.listOfComponents[i].x;
				
                });
                break;
			}
			
			//Right align
			if( Math.abs((mainBuffer.listOfComponents[i].x + mainBuffer.listOfComponents[i].w) - (mainBuffer.listOfComponents[selectedIndex].x + mainBuffer.listOfComponents[selectedIndex].w))  < 5){
				//setTimeout(function(){
                mainContext.strokeStyle = "#00ff00";
				mainContext.moveTo(mainBuffer.listOfComponents[selectedIndex].x + mainBuffer.listOfComponents[selectedIndex].w, mainBuffer.listOfComponents[selectedIndex].y);
				mainContext.lineTo(mainBuffer.listOfComponents[selectedIndex].x + mainBuffer.listOfComponents[selectedIndex].w, mainBuffer.listOfComponents[i].y);
				mainContext.stroke();
				mainBuffer.listOfComponents[selectedIndex].x = (mainBuffer.listOfComponents[i].x + mainBuffer.listOfComponents[i].w) - 													mainBuffer.listOfComponents[selectedIndex].w;
				
               // });
                break;
			}
		}
	}


}

var setPropertyField = function(){
	var rect = mainCanvas.getBoundingClientRect();
	floppyPropertyDiv.style.display = "block";
	floppyPropertyDiv.style.left = mainBuffer.listOfComponents[selectedIndex].x + rect.left;
	floppyPropertyDiv.style.top = mainBuffer.listOfComponents[selectedIndex].y + rect.top + mainBuffer.listOfComponents[selectedIndex].h;
}

var propertyClear = function(){
	floppyPropertyDiv.style.display = "none";
	
}

var drawGrid = function(){

}

/**
* Drawing all elements in canvas
*@param finalRender = false - drawing only elements without controls (for get a result picture)
*/
var render = function(finalRender = false){
	mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
	resizeExist = false; 

	mainContext.fillStyle = backgroundColor;
	mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

	/**
	 * Start main render
	 */
	for( var i = 0; i < mainBuffer.count; i++){
		
		currentIndexInLoop = i;
		mainContext.beginPath();
		mainContext.lineWidth = 1;
		mainContext.rect(mainBuffer.listOfComponents[i].x,
							mainBuffer.listOfComponents[i].y,
							mainBuffer.listOfComponents[i].w,
							mainBuffer.listOfComponents[i].h);
	
		

		
		mainContext.strokeStyle = "#000";
	
		//draw control border for element 
		//if user clicked mouse or resize element
		if(((  userMouse.isMouseMove && mainContext.isPointInPath(
																userMouse.x,
																userMouse.y
		)) || resizeModeUse) || selectedIndex == i  && !finalRender){
															//	mainContext.fillStyle = 
															
			if (!userMovingElement && !resizeModeUse ) {
				
															//	selectedIndex = i;
																userMouseUnderIndex = i;
																//selected.innerHTML = i + "";
			}

			mainContext.globalAlpha = 0.5;
			mainContext.fillStyle = "#C2D1D6";
			mainContext.fillRect(mainBuffer.listOfComponents[i].x,
				mainBuffer.listOfComponents[i].y,
				mainBuffer.listOfComponents[i].w,
				mainBuffer.listOfComponents[i].h);
			mainContext.fillStyle = "#000";
			mainContext.arc(mainBuffer.listOfComponents[i].x,
				mainBuffer.listOfComponents[i].y,
				3,
				0,
				2 * Math.PI);
			mainContext.arc(mainBuffer.listOfComponents[i].x + mainBuffer.listOfComponents[i].w,
				mainBuffer.listOfComponents[i].y,
				3,
				0,
				2 * Math.PI);
			mainContext.arc(mainBuffer.listOfComponents[i].x + mainBuffer.listOfComponents[i].w,
				mainBuffer.listOfComponents[i].y + mainBuffer.listOfComponents[i].h,
				3,
				0,
				2 * Math.PI);
			mainContext.arc(mainBuffer.listOfComponents[i].x,
				mainBuffer.listOfComponents[i].y + mainBuffer.listOfComponents[i].h,
				3,
				0,
				2 * Math.PI);
			mainContext.stroke();
			
			mainContext.globalAlpha = 1;
		if(!resizeModeUse && mainBuffer.listOfComponents[i].canBeResized){
			if( Math.abs(userMouse.x - mainBuffer.listOfComponents[i].x) < 5 && 
					Math.abs(userMouse.y - mainBuffer.listOfComponents[i].y) < 5 )
					{
						resizeExist = true;
						resizeModeAllow = "left-top";
					}
					else if(Math.abs(userMouse.x - (mainBuffer.listOfComponents[i].x + mainBuffer.listOfComponents[i].w)) < 5
								&& Math.abs(userMouse.y - mainBuffer.listOfComponents[i].y) < 5)
					{
						resizeExist = true;
						resizeModeAllow = "right-top";
					}

					else if(Math.abs(userMouse.x - (mainBuffer.listOfComponents[i].x + mainBuffer.listOfComponents[i].w)) < 5
								&& Math.abs(userMouse.y - (mainBuffer.listOfComponents[i].y +  mainBuffer.listOfComponents[i].h)) < 5)

					{
						resizeExist = true;
						resizeModeAllow = "right-bottom";
					}

					else if(Math.abs(userMouse.x - (mainBuffer.listOfComponents[i].x ) < 5
								&& Math.abs(userMouse.y - (mainBuffer.listOfComponents[i].y +  mainBuffer.listOfComponents[i].h)) < 5))
					{
						resizeExist = true;
						resizeModeAllow = "left-bottom";
					}

					else{
						resizeExist = false;
					}
		}

		if(userMouse.isMouseDown){
			selectedIndex = userMouseUnderIndex;

		}
	//	else
	//		selectedIndex = -1;
				
															} 
																

	
	//Moving and resizing
	if(!mainBuffer.listOfComponents[i].block && !blockMainWork){
		//resizing
		if((resizeModeUse || resizeExist) && userMouse.isMouseDown){
			
			resizeModeUse = true;
			if(resizeModeAllow == "left-top")
			{
				mainBuffer.listOfComponents[selectedIndex].x +=  userMouse.dX;
				mainBuffer.listOfComponents[selectedIndex].y +=  userMouse.dY;
				mainBuffer.listOfComponents[selectedIndex].w -=  userMouse.dX;
				mainBuffer.listOfComponents[selectedIndex].h -=  userMouse.dY;
			}
			else if (resizeModeAllow == "right-bottom")
			{
				mainBuffer.listOfComponents[selectedIndex].w +=  userMouse.dX;
				mainBuffer.listOfComponents[selectedIndex].h +=  userMouse.dY;
			
			}
			else if (resizeModeAllow == "right-top")
			{
				mainBuffer.listOfComponents[selectedIndex].y +=  userMouse.dY;
				mainBuffer.listOfComponents[selectedIndex].h -=  userMouse.dY;
				mainBuffer.listOfComponents[selectedIndex].w +=  userMouse.dX;
			}
			else if (resizeModeAllow == "left-bottom")
			{
				mainBuffer.listOfComponents[selectedIndex].x +=  userMouse.dX;
				mainBuffer.listOfComponents[selectedIndex].w -=  userMouse.dX;
				mainBuffer.listOfComponents[selectedIndex].h +=  userMouse.dY;
			}
		}
		else{
			//moving
			if(selectedIndex == i && userMouse.isMouseDown && selectedIndex == userMouseUnderIndex){
			//	setTimeout(function(){
				userMovingElement = true;
				mainBuffer.listOfComponents[selectedIndex].x +=  userMouse.dX;
				mainBuffer.listOfComponents[selectedIndex].y +=  userMouse.dY;
				
				if(autoCorrectPositionFlag)
				{
					autoCorrectPosition();
				}
				
				propertyClear();
			//	},10); //delay

			}
		}
	}
	
		//call custom  render function for a element
		mainBuffer.listOfComponents[i].renderComponent();
		
	}

	currentIndexInLoop = -1;
	/**
	 * End main render
	 */


	if(resizeExist){
		if(resizeModeAllow == "left-top" || resizeModeAllow == "right-bottom")
			mainCanvas.style.cursor = "nw-resize";
		else
			mainCanvas.style.cursor = "ne-resize";
	}
	else{
		
		mainCanvas.style.cursor = "auto";
	}
//	userMouseUnderIndex = -1;
};


	/**
	 * Color picker library 
	 */
	var ColorPicker = function(){
		var colorPickerArray = new Array();


		/**
		 * Create a new input color picker
		 * @param 'value' => initial color value (without '#'),
		 * @param 'place' => div, where input color must be placed
		 * @param 'event' => function, which will run when input color changed
		 */
	
	}

	ColorPicker.createPicker = function( param ){
			var elem = document.createElement("input");
			elem.className = "jscolor";
			elem.value = param['value'] || "000";
			var colorPicker = new jscolor(elem);
			elem.addEventListener("change", function(e){
				param['event'](e);
			});
			if(param['width']){
				elem.style.width = param['width'];
			}
			param['place'].appendChild(elem);
			return elem;
	}


	var setBlockMainWork = function(){
		blockMainWork = true;
		indexSetBlock = selectedIndex;//LetsDraw.GetSelectedIndex();
		

		var caption = document.createElement("h3");
		caption.innerText = langLD.closePaintMode;
		floppyPropertyDiv.appendChild(caption);
		
		floppyPropertyDiv.style.display = "block";

	}
	var isBlockMainWork = function(){
		
		return (indexSetBlock == selectedIndex && selectedIndex == currentIndexInLoop && blockMainWork)
	}

	var GetIndexWasBlocked = function(){
		return indexSetBlock;
	}

	/**
	 * Get final image via Base64
	 * @param[String] img element id
	 */
	var getFinalImage = function( div ){
		var image = document.getElementById(div);
		render(true);
		image.src = LetsDraw.mainCanvas.toDataURL("image/png");
	}


	var FixedToolDiv = function(){

	}

	var GetBase64 = function(){
		render(true);
		return LetsDraw.mainCanvas.toDataURL();
	}

  //  LetsDraw.selectedIndex = selectedIndex;
  	LetsDraw.blockMainWork = blockMainWork;
 	LetsDraw.ColorPicker = ColorPicker;
    LetsDraw.mainBuffer = mainBuffer;
    LetsDraw.mainCanvas = mainCanvas;
    LetsDraw.mainContext = mainContext;
    LetsDraw.render = render;
	LetsDraw.contextMenu = contextMenu;
    LetsDraw.Component = Component;
	LetsDraw.version = version;
	LetsDraw.menuItemList = menuItemList;
	LetsDraw.userMouse = userMouse;
    LetsDraw.setBlockMainWork = setBlockMainWork;
	LetsDraw.isBlockMainWork = isBlockMainWork;
	LetsDraw.getFinalImage = getFinalImage;
	LetsDraw.autoCorrectPosition = autoCorrectPositionFlag;
	LetsDraw.GetBase64 = GetBase64;
	LetsDraw.floppyPropertyDiv = floppyPropertyDiv;
	window.LetsDraw = LetsDraw;

})();


