/**
 * TextLabel component
 */
var textLabel = function(){
	
	LetsDraw.Component.apply(this, arguments);
	
	this.name = langLD.textLabel;
	this.sysName = "textLabel";
	this.fontArray = new Array("serif","Arial","Calibri", "Times New Roman", "Comic Sans MS", "Courier New", "Georgia", "Impact", "Verdana",
	 "Tahoma", "Play", "Open Sans Condensed", "Lobster", "Comfortaa", "Rubik Mono One");
	this.value = langLD.insertTextHere;
	this.fontsize = 20;
	this.alphaLevel = 1;
	this.gradientExist = false;
	this.gradientColor2 = "#fff";
	this.alignSelect = new Array(langLD.left, langLD.center, langLD.right);
	this.align = "left";
	this.w = 200;
	this.h = 50;
	this.lineSpace = 0;
	this.canBeResized = true;
	this.font = this.fontArray[0];
	this.border = "";
	this.previewImg = "images/text.png"
	this.fontStyle = "normal";
	this.fontVariant = "normal";
	this.fontWeight = "normal";
	this.description = "";
	this.border = "#000";
	this.borderWidth = 0;
}

textLabel.eventClick = function ( buttonID ){
    var elem = document.getElementById(buttonID);
    elem.addEventListener("click", function(e){
        var text = new textLabel();
	    LetsDraw.mainBuffer.addToBuffer(text);
    });
}

textLabel.prototype = Object.create(LetsDraw.Component.prototype);
textLabel.prototype.constructor = textLabel;
textLabel.prototype.renderComponent = function(){

		//Separate for multi-line text
		var array = this.value.split('\n');
		LetsDraw.mainContext.globalAlpha=this.alphaLevel;
		LetsDraw.mainContext.font = this.fontStyle + " " 
							+ this.fontVariant + " " 
							+ this.fontWeight + " "
							+ this.fontsize + 'pt ' + this.font; 
		
/*		LetsDraw.mainContext.shadowColor = "black";
		LetsDraw.mainContext.shadowOffsetX = 5; 
		LetsDraw.mainContext.shadowOffsetY = 5; 
		LetsDraw.mainContext.shadowBlur = 7;*/
	
		if(this.gradientExist){
			var gradient = LetsDraw.mainContext.createLinearGradient(this.x, this.y, this.w + this.x, this.h + this.y);
			gradient.addColorStop("0" , this.color);
			gradient.addColorStop("1" , this.gradientColor2);
			LetsDraw.mainContext.fillStyle = gradient;
		}
		else{
			LetsDraw.mainContext.fillStyle = this.color;
		}

		for( var i = 0; i < array.length; i++ ){
			
			var alignXPoint = this.x;
			if( this.align == 1 )
			{
					alignXPoint = this.x + ((this.w - LetsDraw.mainContext.measureText(array[i]).width)) /2;
			}
			if( this.align == 2 )
			{
				alignXPoint = this.x + (this.w - LetsDraw.mainContext.measureText(array[i]).width);
			}
			
			LetsDraw.mainContext.fillText(array[i], alignXPoint ,this.y+i*20+this.h + 
														(i == 0 ? 0 : this.lineSpace * i));
														
			if( this.borderWidth > 0 ){
				LetsDraw.mainContext.strokeStyle = this.border;
				LetsDraw.mainContext.lineWidth = this.borderWidth;
				LetsDraw.mainContext.strokeText(array[i], alignXPoint ,this.y+i*20+this.h + 
															(i == 0 ? 0 : this.lineSpace * i));
			}
			
			if( Math.round( LetsDraw.mainContext.measureText(array[i]).width ) > this.w )
			{
				this.w =  Math.round( LetsDraw.mainContext.measureText(array[i]).width );
			}
		
		}

	
	};
	
/*textLabel.prototype.setText = function(e){
	//LetsDraw.mainBuffer.listOfComponents[LetsDraw.selectedIndex].value = e.target.value;
		LetsDraw.ChangeCurrentElement({
			value: e.target.value
		});
};*/

textLabel.prototype.changeComponent = function(){
       
	   
		var  floppyPropertyDiv = LetsDraw.fixedPropertyDiv;
		


		var text = document.createElement('textarea');
		text.value = this.value;
		text.style.width = "100%";
		
		text.addEventListener("input", function(e){
			textLabel.setText(e);
			LetsDraw.render();
		});
		floppyPropertyDiv.appendChild(text);

		var divBreak = document.createElement("div");
		divBreak.style.clear = "both";
		floppyPropertyDiv.appendChild(divBreak);


		var boldButton2 = document.createElement("div");
		var boldImage = document.createElement("img");
		boldButton2.className = "menuButtonItem";
		if(this.fontWeight == "bold"){
			boldButton2.className += " active";
		}
		
		boldImage.src = "images/Bold.png";
		boldImage.width = 23;
		boldButton2.appendChild(boldImage);
		var selfB = boldButton2;
		boldButton2.addEventListener("click",(function(e){
			console.log(e.target);
			if(LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontWeight === "normal")
			{
				LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontWeight = "bold";
				selfB.className = "menuButtonItem active";
			}
			else
			{
				LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontWeight = "normal";
				selfB.className = "menuButtonItem";
			}
			LetsDraw.render();
		}));
		floppyPropertyDiv.appendChild(boldButton2);



		var ItalicButton2 = document.createElement("div");
		var ItalicImage = document.createElement("img");
		ItalicButton2.className = "menuButtonItem";
		ItalicButton2.width = 23;

		if(this.fontStyle == "italic"){
			ItalicButton2.className += " active";
		}
		
		ItalicImage.src = "images/Italic.png";
		ItalicImage.width = 23;
		var selfI = ItalicButton2;
		ItalicButton2.addEventListener("click", function(e){
			if(LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontStyle === "normal")
			{
				LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontStyle = "italic";
				selfI.className = "menuButtonItem active";
			}
			else
			{
				LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontStyle = "normal";
				selfI.className = "menuButtonItem";
			}
			LetsDraw.render();
		});
		ItalicButton2.appendChild(ItalicImage);
		floppyPropertyDiv.appendChild(ItalicButton2);

		var selectFontSize = document.createElement("select");
		for(var i = 6; i <= 40; i+=2)
		{
			var opt = document.createElement("option");
			opt.value = i;
			opt.text = i;
			if(this.fontsize == i)
			{
				opt.selected = true;
				
			}
			selectFontSize.appendChild(opt);
		}
		selectFontSize.addEventListener("change", function(e){
			var options = e.target.options;
			for(var i = 0; i < options.length; i++)
			{
				if(options[i].selected)
				{
					//LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontsize = options[i].value;
					LetsDraw.ChangeCurrentElement({
						fontsize: options[i].value
					});
					break;
				}
			}
			LetsDraw.render();
		});
		
		floppyPropertyDiv.appendChild(selectFontSize);

		var selectFontName = document.createElement("select");
		for(var i = 0; i< this.fontArray.length; i++)
		{
			var opt = document.createElement("option");
			opt.value = i;
			opt.text = this.fontArray[i];
			opt.style.fontFamily = this.fontArray[i];
			if(this.font == this.fontArray[i])
			{
				opt.selected = true;
				
			}
			selectFontName.appendChild(opt);
		}

		selectFontName.addEventListener("change", function(e){
			var options = e.target.options;
			for(var i = 0; i < options.length; i++)
			{
				if(options[i].selected)
				{
					//LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontsize = options[i].value;
					LetsDraw.ChangeCurrentElement({
						font: options[i].text
					});
					break;
				}
			}
			LetsDraw.render();
		});

		floppyPropertyDiv.appendChild(selectFontName);

		var labelColor = document.createElement("h3");
		
		labelColor.innerText = langLD.align;
		
		floppyPropertyDiv.appendChild(labelColor);

		var selectAlign = document.createElement("select");
		for(var i = 0; i< this.alignSelect.length; i++)
		{
			var opt = document.createElement("option");
			opt.value = i;
			opt.text = this.alignSelect[i];
			if(this.align == i)
			{
				opt.selected = true;
				
			}
			selectAlign.appendChild(opt);
		}

		selectAlign.addEventListener("change", function(e){
			var options = e.target.options;
			for(var i = 0; i < options.length; i++)
			{
				if(options[i].selected)
				{
					//LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].fontsize = options[i].value;
					LetsDraw.ChangeCurrentElement({
						align: options[i].value
					});
					break;
				}
			}
			LetsDraw.render();
		});

		floppyPropertyDiv.appendChild(selectAlign);


		var labelColor = document.createElement("h3");
		labelColor.innerText = langLD.textColor;
		floppyPropertyDiv.appendChild(labelColor);
		
	

		var colorDiv = document.createElement("div");
		colorDiv.className = "colorDiv";
		var colorSelect = LetsDraw.ColorPicker.createPicker({
			value: this.color.substr(1,this.color.length),
			place: colorDiv,
			event: function(e){
				textLabel.setColor(e);
			},
			width: 137
		});
	//	colorSelect.style.cssFloat = "left";
	//	colorSelect.style.border = 0;
		var colorSelect2 = LetsDraw.ColorPicker.createPicker({
			value: this.gradientColor2.substr(1,this.gradientColor2.length),
			place: colorDiv,
			event: function(e){
				textLabel.setGradient(e);
			},
			width: 137
		
		});
	//	colorSelect2.style.border = 0;
	//	colorSelect2.style.cssFloat = "left";
	

		if(!LetsDraw.GetCurrentComponent().gradientExist){
			colorSelect2.style.display = "none";
		}

		var addPicker = document.createElement("input");
		addPicker.value = (this.gradientExist == true ? "-" : "+");
		addPicker.type = "button";
		colorDiv.appendChild(addPicker);
		addPicker.addEventListener("click", function(e){
			if(!LetsDraw.GetCurrentComponent().gradientExist){
			//	gradientColor2F(p);
				colorSelect2.style.display = "block";
				LetsDraw.ChangeCurrentElement({
					gradientExist: true
				});
			}
			else{
				colorSelect2.style.display = "none";
				LetsDraw.ChangeCurrentElement({
					gradientExist: false
				});
			}
			
		});

		floppyPropertyDiv.appendChild(colorDiv);

	var gradientColor2F = function(p){
		
		}

		/**
		 * Gradient 
		 */

		
		var labelBorderColor = document.createElement("h3");
		labelBorderColor.innerText = langLD.border;
		floppyPropertyDiv.appendChild(labelBorderColor);

		var colorDiv2 = document.createElement("div");
		colorDiv2.className = "colorDiv";
		var colorSelectBorder = LetsDraw.ColorPicker.createPicker({
			value: this.border.substr(1,this.border.length),
			place: colorDiv2,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					border:  "#" + e.target.value
				});
			},
			width: 137
		});
		floppyPropertyDiv.appendChild(colorDiv2);

		var picker = document.createElement("input");
		picker.type = "range";
		picker.min = 0;
		picker.max = 5;
		picker.step = 1;
		picker.style.width = "90px";
		picker.value = this.borderWidth;
		picker.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				borderWidth: (e.target.value)
			});
		});
		floppyPropertyDiv.appendChild(picker);


		var labelInterval = document.createElement("h3");
		labelInterval.innerText = langLD.lineSpace;
		floppyPropertyDiv.appendChild(labelInterval);

		var picker = document.createElement("input");
		picker.type = "range";
		picker.min = 0;
		picker.max = 40;
		picker.value = this.lineSpace +10;
		picker.addEventListener("input", function(e){
		
			LetsDraw.ChangeCurrentElement({
				lineSpace: (e.target.value - 10)
			});
		});
		floppyPropertyDiv.appendChild(picker);


	//	floppyPropertyDiv.style.top = this.y -  this.h;
		
		LetsDraw.render();
};

textLabel.setText = function(e){

	LetsDraw.ChangeCurrentElement({
		value: e.target.value
	});
	var length = e.target.value.length;
}

textLabel.setGradient = function(e){
	LetsDraw.ChangeCurrentElement({
		gradientColor2: '#' + e.target.value,
		gradientExist: true
	})
}

textLabel.setColor = function(e){

	LetsDraw.ChangeCurrentElement({
		color: '#' + e.target.value
	})

}

/**
 * Simple rectangle component
 */

var RectangleComponent = function(){
	LetsDraw.Component.apply(this,arguments);
	this.name = langLD.rectangle
	this.x = 50
	this.y = 50
	this.w = 100
	this.h = 50
	this.borderWidth = 1;
	this.roundParam = 10;
	this.sysName = "RectangleComponent"
	this.border = "#000"
	this.alphaLevel = 100;
	this.previewImg = "images/rect.png"
	this.color = '#fff'
	this.gradientExist = false;
	this.gradientColor2 = "#fff";

	this.changeComponent = function(){
		 var  floppyPropertyDiv = LetsDraw.fixedPropertyDiv;

		floppyPropertyDiv.innerHTML = "<h3>"+langLD.fill+"</h3>";
		var place = document.createElement('div');
		place.className = "colorPlaceSelect";

		var colorDiv = document.createElement("div");
		colorDiv.className = "colorDiv";
		var colorSelect = LetsDraw.ColorPicker.createPicker({
			value: this.color.substr(1,this.color.length),
			place: colorDiv,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					color:  "#" + e.target.value
				});
			},
			width: 137
		});

		var colorSelect2 = LetsDraw.ColorPicker.createPicker({
			value: this.gradientColor2.substr(1,this.gradientColor2.length),
			place: colorDiv,
			event: function(e){
				RectangleComponent.setGradient(e);
			},
			width: 137
		
		});

			if(!LetsDraw.GetCurrentComponent().gradientExist){
			colorSelect2.style.display = "none";
		}

		var addPicker = document.createElement("input");
		addPicker.value = (this.gradientExist == true ? "-" : "+");
		addPicker.type = "button";
		colorDiv.appendChild(addPicker);
		addPicker.addEventListener("click", function(e){
			if(!LetsDraw.GetCurrentComponent().gradientExist){
			//	gradientColor2F(p);
				colorSelect2.style.display = "block";
				LetsDraw.ChangeCurrentElement({
					gradientExist: true
				});
			}
			else{
				colorSelect2.style.display = "none";
				LetsDraw.ChangeCurrentElement({
					gradientExist: false
				});
			}
			
		});


		floppyPropertyDiv.appendChild(colorDiv);
		
		var borderHeader = document.createElement("h3");
		borderHeader.innerHTML = langLD.border;
		borderHeader.style.clear = "both"
		floppyPropertyDiv.appendChild(borderHeader);
		floppyPropertyDiv.appendChild(place);
		var colorDiv2 = document.createElement("div");
		colorDiv2.className = "colorDiv";
		var colorSelectBorder = LetsDraw.ColorPicker.createPicker({
			value: this.border.substr(1,this.border.length),
			place: colorDiv2,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					border:  "#" + e.target.value
				});
			},
			width: 137
		});
		floppyPropertyDiv.appendChild(colorDiv2);

		var picker = document.createElement("input");
		picker.type = "range";
		picker.min = 0;
		picker.max = 5;
		picker.step = 1;
		picker.style.width = "90px";
		picker.value = this.borderWidth;
		picker.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				borderWidth: (e.target.value)
			});
		});
		floppyPropertyDiv.appendChild(picker);

		/**
		 * Rounded corner
		 */
		var alphaHeader = document.createElement("h3");
		alphaHeader.innerHTML = langLD.roundCorner;
		alphaHeader.style.clear = "both";
		var picker2 = document.createElement("input");
		picker2.type = "range";
		picker2.min = 0;
		picker2.max = 20;
		picker2.step = 1;
	//	picker.style.width = "90px";
		picker2.value = this.roundParam;
		picker2.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				roundParam: (e.target.value)
			});
		});
		

		floppyPropertyDiv.appendChild(alphaHeader);
		floppyPropertyDiv.appendChild(picker2);

		var alphaHeader = document.createElement("h3");
		alphaHeader.innerHTML = langLD.alpha;
		alphaHeader.style.clear = "both";
		var picker2 = document.createElement("input");
		picker2.type = "range";
		picker2.min = 0;
		picker2.max = 100;
		picker2.step = 1;
	//	picker.style.width = "90px";
		picker2.value = this.alphaLevel;
		picker2.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				alphaLevel: (e.target.value)
			});
		});
		

		floppyPropertyDiv.appendChild(alphaHeader);
		floppyPropertyDiv.appendChild(picker2);

	}

	
}


RectangleComponent.setGradient = function(e){
	LetsDraw.ChangeCurrentElement({
		gradientColor2: '#' + e.target.value,
		gradientExist: true
	})
}

RectangleComponent.prototype = Object.create(LetsDraw.Component.prototype);
RectangleComponent.prototype.constructor = RectangleComponent;


RectangleComponent.prototype.renderComponent = function()
{

	LetsDraw.mainContext.globalAlpha = this.alphaLevel / 100;
	if(this.gradientExist){
			var gradient = LetsDraw.mainContext.createLinearGradient(this.x, this.y, this.w + this.x, this.h + this.y);
			gradient.addColorStop("0" , this.color);
			gradient.addColorStop("1" , this.gradientColor2);
			LetsDraw.mainContext.fillStyle = gradient;
		}
	else{
			LetsDraw.mainContext.fillStyle = this.color;
		}

/**
 * Draw rect with smooth corner
 */
	LetsDraw.mainContext.beginPath();
	LetsDraw.mainContext.moveTo(this.x + this.roundParam*2, this.y);
	LetsDraw.mainContext.lineTo(this.x + this.w - this.roundParam*2, this.y);
	
	LetsDraw.mainContext.quadraticCurveTo(this.x + this.w , this.y , this.x + this.w , this.y +this.roundParam*2 );
	LetsDraw.mainContext.lineTo(this.x + this.w, this.y + this.h - this.roundParam*2 );
	LetsDraw.mainContext.quadraticCurveTo(this.x + this.w , this.y + this.h , this.x + this.w -this.roundParam*2, this.y + this.h);
	LetsDraw.mainContext.lineTo(this.x + this.roundParam*2, this.y + this.h );
	LetsDraw.mainContext.quadraticCurveTo(this.x , this.y + this.h , this.x , this.y + this.h - this.roundParam*2);
	LetsDraw.mainContext.lineTo(this.x, this.y + this.roundParam*2);
	LetsDraw.mainContext.quadraticCurveTo(this.x, this.y  , this.x +this.roundParam*2, this.y );

	LetsDraw.mainContext.fillStyle = this.color;
	LetsDraw.mainContext.fill();
	LetsDraw.mainContext.lineWidth = this.borderWidth;
	if(this.borderWidth > 0){
		LetsDraw.mainContext.strokeStyle = this.border;
		LetsDraw.mainContext.stroke();
	}
	LetsDraw.mainContext.globalAlpha = 1;
}


var ImageComponent = function()
{
	LetsDraw.Component.apply(this,arguments);
	this.img = new Image();
	this.img.onload = function(){
		alert("hello");
	}
	this.sysName = "ImageComponent";
	this.name = langLD.image;
	this.description = langLD.uploadYourImage;
	this.imgData = "";
	this.w = 100;
	this.h = 70;
	this.previewImg = "images/image.png";
	var point = new Object();
	this.maxWidth = 300;
	this.border = "#000";
	this.alphaLevel = 100;
	point.x = this.x;
	point.y = this.y;
	point.w = this.w;
	point.h = this.h;
	this.isLoaded = false;


}

ImageComponent.prototype = Object.create(LetsDraw.Component.prototype);
ImageComponent.constructor = ImageComponent;

ImageComponent.prototype.createComponent = function(){
	/*if(this.imgData){
	
		this.img.onload = function(){
			console.log("succeess load image");
		}
		this.img.src = this.imgData;
	}*/
}

ImageComponent.prototype.createComponent1 = function()
{
	var fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.multiple = false;
	fileInput.addEventListener("change", function(e){
		var reader = new FileReader();
		var file = e.target.files[0];
		console.log(file);
		reader.onload = (function(file){
			return function(e){
			var img = document.createElement("img");
			img.src = reader.result;
			floppyPropertyDiv.appendChild(img);

			

			LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].img.onload = function(){
				LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].isLoaded = true;
			}
			LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].img.src = reader.result;

			}
		}(file));
		reader.readAsDataURL(file);
		
		
	});
	floppyPropertyDiv.appendChild(fileInput);
	floppyPropertyDiv.style.display = "block"
}

ImageComponent.prototype.changeComponent = function()
{
	 var  floppyPropertyDiv = LetsDraw.fixedPropertyDiv;
	var header = document.createElement("h3");
	header.innerHTML = langLD.uploadYourImage;
	floppyPropertyDiv.appendChild(header);
	var fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.multiple = false;
	fileInput.addEventListener("change", function(e){
		var reader = new FileReader();
		var file = e.target.files[0];
		
		console.log(file);
		reader.onload = (function(file){
			return function(e){
			var img = document.createElement("img");
			img.src = reader.result;
			img.style.display = "none";
			floppyPropertyDiv.appendChild(img);
			
			

			LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].img.onload = function(){
				LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].isLoaded = true;
				LetsDraw.ChangeCurrentElement({
					imgData: img.currentSrc// file.result
				});
			}
			LetsDraw.mainBuffer.listOfComponents[LetsDraw.GetSelectedIndex()].img.src = reader.result;

	
			}
		}(file));
		reader.readAsDataURL(file);
		
		
	});

		
	floppyPropertyDiv.appendChild(fileInput);


		var place = document.createElement('div');
		place.className = "colorPlaceSelect";
		var borderHeader = document.createElement("h3");
		borderHeader.innerHTML = langLD.border;
		borderHeader.style.clear = "both"

		floppyPropertyDiv.appendChild(borderHeader);
		floppyPropertyDiv.appendChild(place);
		var colorDiv2 = document.createElement("div");
		colorDiv2.className = "colorDiv";
		var colorSelectBorder = LetsDraw.ColorPicker.createPicker({
			value: this.border.substr(1,this.border.length),
			place: colorDiv2,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					border:  "#" + e.target.value
				});
			},
			width: 137
		});
		floppyPropertyDiv.appendChild(colorDiv2);

		var picker = document.createElement("input");
		picker.type = "range";
		picker.min = 0;
		picker.max = 5;
		picker.step = 1;
		picker.style.width = "90px";
		picker.value = this.borderWidth;
		picker.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				borderWidth: (e.target.value)
			});
		});
		floppyPropertyDiv.appendChild(picker);

		var alphaHeader = document.createElement("h3");
		alphaHeader.innerHTML = langLD.alpha;
		alphaHeader.style.clear = "both";
		var picker2 = document.createElement("input");
		picker2.type = "range";
		picker2.min = 0;
		picker2.max = 100;
		picker2.step = 1;
	//	picker.style.width = "90px";
		picker2.value = this.alphaLevel;
		picker2.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				alphaLevel: (e.target.value)
			});
		});
		

		floppyPropertyDiv.appendChild(alphaHeader);
		floppyPropertyDiv.appendChild(picker2);

	floppyPropertyDiv.style.display = "block"
}

ImageComponent.prototype.renderComponent = function()
{
//	var img = new Image();
	var point = new Object();

	point.x = this.x;
	point.y = this.y;
	point.w = this.w;
	point.h = this.h;
/*	this.img.onload = (function(point)
	{
		return function(){
		
		LetsDraw.mainContext.drawImage(img, point.x,
											point.y,
											point.w,
											point.h
											);
		}
	})(point);*/
	LetsDraw.mainContext.fillStyle = "#ccc";
	LetsDraw.mainContext.globalAlpha = this.alphaLevel / 100;
	if(!this.isLoaded){
		LetsDraw.mainContext.fillRect(point.x,
											point.y,
											point.w,
											point.h);

        LetsDraw.mainContext.beginPath();
        LetsDraw.mainContext.moveTo(point.x, point.y);
        LetsDraw.mainContext.lineTo(point.x + point.w, point.y + point.h);
        LetsDraw.mainContext.stroke();
        LetsDraw.mainContext.moveTo(point.x + point.w, point.y);
        LetsDraw.mainContext.lineTo(point.x, point.y + point.h);
        LetsDraw.mainContext.stroke();

	}

	

	if(this.isLoaded){
		
		
			
		
			try{
				//console.log(this.img.src);
			
				LetsDraw.mainContext.drawImage(this.img, point.x,
											point.y,
											point.w,
											point.h
											);
				
			}
			catch(e)
			{
			
				
	//			LetsDraw.mainBuffer.listOfComponents[this.id].img = new Image();
		//		LetsDraw.mainBuffer.listOfComponents[this.id].img.onload = function(id = this.id){
			this.imgData = this.imgData.replace(/[ ]/g, "+");
			
			this.img = new Image();
			this.img.onload  = function(id = this.id){

				//	LetsDraw.mainBuffer.listOfComponents[id].isLoaded = true;
				//	console.log(LetsDraw.mainBuffer.listOfComponents[id].img);
				
				}
			
			
			
				
			this.img.src = this.imgData;
			//	LetsDraw.mainBuffer.listOfComponents[this.id].img.src = this.imgData;
			
			}
		
	
//	LetsDraw.mainContext.stroke();
	}
	else{
	
		LetsDraw.mainContext.restore();
	}

	if(this.borderWidth > 0){
		LetsDraw.mainContext.strokeStyle = this.border;
		LetsDraw.mainContext.stroke();
	}
	LetsDraw.mainContext.globalAlpha = 1;

	
}

var CircleComponent = function()
{
		LetsDraw.Component.apply(this,arguments);
		this.sysName = "CircleComponent";
		this.name = langLD.circle;
		this.previewImg = "images/circle.png";
		this.gradientExist = false;
		this.gradientColor2 = "#fff";
		this.color = "#fff";
		this.border = "#000";
		this.borderWidth = 1;
	

	
	

}

CircleComponent.prototype = Object.create(LetsDraw.Component.prototype);
CircleComponent.prototype.constructor = CircleComponent;

CircleComponent.prototype.renderComponent = function(){


		LetsDraw.mainContext.beginPath();

		this.h = this.w;
		LetsDraw.mainContext.beginPath();
		if(this.gradientExist){
			var gradient = LetsDraw.mainContext.createLinearGradient(this.x, this.y, this.w + this.x, this.h + this.y);
			gradient.addColorStop("0" , this.color);
			gradient.addColorStop("1" , this.gradientColor2);
			LetsDraw.mainContext.fillStyle = gradient;
		}
	else{
			LetsDraw.mainContext.fillStyle = this.color;
		}
		LetsDraw.mainContext.arc(this.x + this.w /2 ,this.y + this.w /2,this.w /2 ,0,2*Math.PI);
		LetsDraw.mainContext.fill();
		LetsDraw.mainContext.lineWidth = this.borderWidth;
		if(this.borderWidth > 0){
			LetsDraw.mainContext.strokeStyle = this.border;
			LetsDraw.mainContext.stroke();
		}
}

CircleComponent.prototype.changeComponent = function(){
	 var  floppyPropertyDiv = LetsDraw.fixedPropertyDiv;
	floppyPropertyDiv.innerHTML = "<h3>"+langLD.fill+"</h3>";
		var place = document.createElement('div');
		place.className = "colorPlaceSelect";

		var colorDiv = document.createElement("div");
		colorDiv.className = "colorDiv";
		var colorSelect = LetsDraw.ColorPicker.createPicker({
			value: this.color.substr(1,this.color.length),
			place: colorDiv,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					color:  "#" + e.target.value
				});
			},
			width: 137
		});

		var colorSelect2 = LetsDraw.ColorPicker.createPicker({
			value: this.gradientColor2.substr(1,this.gradientColor2.length),
			place: colorDiv,
			event: function(e){
				RectangleComponent.setGradient(e);
			},
			width: 137
		
		});

			if(!LetsDraw.GetCurrentComponent().gradientExist){
			colorSelect2.style.display = "none";
		}

		var addPicker = document.createElement("input");
		addPicker.value = (this.gradientExist == true ? "-" : "+");
		addPicker.type = "button";
		colorDiv.appendChild(addPicker);
		addPicker.addEventListener("click", function(e){
			if(!LetsDraw.GetCurrentComponent().gradientExist){
			//	gradientColor2F(p);
				colorSelect2.style.display = "block";
				LetsDraw.ChangeCurrentElement({
					gradientExist: true
				});
			}
			else{
				colorSelect2.style.display = "none";
				LetsDraw.ChangeCurrentElement({
					gradientExist: false
				});
			}
			
		});


		floppyPropertyDiv.appendChild(colorDiv);
		
		var borderHeader = document.createElement("h3");
		borderHeader.innerHTML = langLD.border;
		borderHeader.style.clear = "both"
		floppyPropertyDiv.appendChild(borderHeader);
		floppyPropertyDiv.appendChild(place);
		var colorDiv2 = document.createElement("div");
		colorDiv2.className = "colorDiv";
		var colorSelectBorder = LetsDraw.ColorPicker.createPicker({
			value: this.border.substr(1,this.border.length),
			place: colorDiv2,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					border:  "#" + e.target.value
				});
			},
			width: 137
		});
		floppyPropertyDiv.appendChild(colorDiv2);

		var picker = document.createElement("input");
		picker.type = "range";
		picker.min = 0;
		picker.max = 5;
		picker.step = 1;
		picker.style.width = "90px";
		picker.value = this.borderWidth;
		picker.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				borderWidth: (e.target.value)
			});
		});
		floppyPropertyDiv.appendChild(picker);

	
}

var BezierLine = function(){
	LetsDraw.Component.apply(this, arguments);
	this.sysName = "BezierLine";
	this.name = langLD.bezier;
	this.previewImg = "images/curve.png";
	this.borderWidth = 1;
	this.border = "#000";

    this.gradientExist = false;
	this.gradientColor2 = "#fff";
	this.color = "#fff";
    
	this.x = 138;
	this.y = 184;
	this.w = 172;
	this.h = 111;
	this.startX = 10;
	this.startY = 10;
	this.endX = 149;
	this.endY = 54;
	this.controlX = 74;
	this.controlY = 111;
    this.controlX2 = 83;
    this.controlY2 = 7;

	this.renderComponent = function(){
		LetsDraw.mainContext.beginPath();
		LetsDraw.mainContext.moveTo(this.startX + this.x, this.startY + this.y);
		LetsDraw.mainContext.lineWidth = this.borderWidth;
		LetsDraw.mainContext.quadraticCurveTo(this.controlX + this.x,
											  this.controlY + this.y,
											  this.endX + this.x,
											  this.endY + this.y);
		LetsDraw.mainContext.strokeStyle = this.border;		

		LetsDraw.mainContext.stroke();
        LetsDraw.mainContext.moveTo(this.startX + this.x, this.startY + this.y);
        	LetsDraw.mainContext.quadraticCurveTo(this.controlX2 + this.x,
											  this.controlY2 + this.y,
											  this.endX + this.x,
											  this.endY + this.y);
         if(this.gradientExist){
			var gradient = LetsDraw.mainContext.createLinearGradient(this.x, this.y, this.w + this.x, this.h + this.y);
			gradient.addColorStop("0" , this.color);
			gradient.addColorStop("1" , this.gradientColor2);
			LetsDraw.mainContext.fillStyle = gradient;
		}
	    else{
			LetsDraw.mainContext.fillStyle = this.color;
		}                           
        LetsDraw.mainContext.fill();           
        LetsDraw.mainContext.stroke();
       
	//	LetsDraw.mainContext.moveTo(this.startX + this.x, this.startY + this.y);
	//	LetsDraw.mainContext.lineTo(this.endX + this.x, this.endY + this.y);
	//	LetsDraw.mainContext.stroke();
		if(LetsDraw.isBlockMainWork()){
			//floppyPropertyDiv.style.display = 'none';
			LetsDraw.mainContext.beginPath();
			LetsDraw.mainContext.lineWidth = 1;
			LetsDraw.mainContext.fillStyle = "red";
			LetsDraw.mainContext.arc(this.controlX + this.x, this.controlY + this.y, 3, 0, 2* Math.PI );
			LetsDraw.mainContext.fill();
			
			LetsDraw.mainContext.beginPath();
			LetsDraw.mainContext.moveTo(this.controlX + this.x, this.controlY + this.y);
			LetsDraw.mainContext.lineTo(this.endX + this.x, this.endY + this.y);
			LetsDraw.mainContext.stroke();

            	LetsDraw.mainContext.beginPath();
			LetsDraw.mainContext.lineWidth = 1;
			LetsDraw.mainContext.fillStyle = "red";
			LetsDraw.mainContext.arc(this.controlX2 + this.x, this.controlY2 + this.y, 3, 0, 2* Math.PI );
			LetsDraw.mainContext.fill();
			
			LetsDraw.mainContext.beginPath();
			LetsDraw.mainContext.moveTo(this.controlX2 + this.x, this.controlY2 + this.y);
			LetsDraw.mainContext.lineTo(this.endX + this.x, this.endY + this.y);
			LetsDraw.mainContext.stroke();

			LetsDraw.mainContext.beginPath();
		//	LetsDraw.mainContext.moveTo(this.x, this.y);
			LetsDraw.mainContext.arc(this.endX + this.x, this.endY + this.y, 3, 0, 2* Math.PI );
			LetsDraw.mainContext.fillStyle = "green";
			LetsDraw.mainContext.fill();
		//	LetsDraw.mainContext.end
			
			LetsDraw.mainContext.beginPath();
			LetsDraw.mainContext.fillStyle = "yellow";
			LetsDraw.mainContext.arc(this.startX + this.x, this.startY + this.y, 3, 0, 2* Math.PI );
			LetsDraw.mainContext.fill();

			LetsDraw.mainContext.stroke();				
			if(Math.abs(LetsDraw.userMouse.x - this.controlX - this.x) < 10
				&& Math.abs(LetsDraw.userMouse.y - this.controlY - this.y) < 10 && LetsDraw.userMouse.isMouseDown)
			{
				
                
                this.controlX = LetsDraw.userMouse.x - this.x;
				this.controlY = LetsDraw.userMouse.y - this.y;

				if(this.controlY > this.h  ){

					this.h += Math.abs(this.controlY - this.h) + 1;
				}
				if(this.controlX > this.w){
					this.w += Math.abs(this.controlX - this.w) + 1;
				}
			}		


            if(Math.abs(LetsDraw.userMouse.x - this.controlX2 - this.x) < 10
				&& Math.abs(LetsDraw.userMouse.y - this.controlY2 - this.y) < 10 && LetsDraw.userMouse.isMouseDown)
			{
				this.controlX2 = LetsDraw.userMouse.x - this.x;
				this.controlY2 = LetsDraw.userMouse.y - this.y;

				if(this.controlY2 > this.h  ){

					this.h += Math.abs(this.controlY2 - this.h) + 1;
				}
				if(this.controlX2 > this.w){
					this.w += Math.abs(this.controlX2 - this.w) + 1;
				}
			}		

			if(Math.abs(LetsDraw.userMouse.x - this.endX - this.x) < 10
				&& Math.abs(LetsDraw.userMouse.y - this.endY - this.y) < 10 && LetsDraw.userMouse.isMouseDown)
			{

				this.endX = LetsDraw.userMouse.x - this.x;
				this.endY = LetsDraw.userMouse.y - this.y;
				if(this.endY > this.h  ){

					this.h += Math.abs(this.endY - this.h) + 1;
				}
				if(this.endX > this.w){
					this.w += Math.abs(this.endX - this.w) + 1;
				}
			}

			if(Math.abs(LetsDraw.userMouse.x - this.startX - this.x) < 10
				&& Math.abs(LetsDraw.userMouse.y - this.startY - this.y) < 10 && LetsDraw.userMouse.isMouseDown)
			{
				this.startX = LetsDraw.userMouse.x - this.x;
				this.startY = LetsDraw.userMouse.y - this.y;

				if(this.startY > this.h  ){

					this.h += Math.abs(this.startY - this.h) + 1;
				}
				if(this.startX > this.w){
					this.w += Math.abs(this.startX - this.w) + 1;
				}
			}			

		}
	}

	this.changeComponent = function(){
	//	LetsDraw.blockMainWork = true;
		LetsDraw.setBlockMainWork();
		LetsDraw.render();

		var fillHeader = document.createElement("h3");
		fillHeader.innerHTML = langLD.fill;
		fillHeader.style.clear = "both"
		LetsDraw.fixedPropertyDiv.appendChild(fillHeader);

		var place = document.createElement('div');
		place.className = "colorPlaceSelect";

      	var colorDiv = document.createElement("div");
		colorDiv.className = "colorDiv";
		var colorSelect = LetsDraw.ColorPicker.createPicker({
			value: this.color.substr(1,this.color.length),
			place: colorDiv,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					color:  "#" + e.target.value
				});
			},
			width: 137
		});

		var colorSelect2 = LetsDraw.ColorPicker.createPicker({
			value: this.gradientColor2.substr(1,this.gradientColor2.length),
			place: colorDiv,
			event: function(e){
				RectangleComponent.setGradient(e);
			},
			width: 137
		
		});

			if(!LetsDraw.GetCurrentComponent().gradientExist){
			colorSelect2.style.display = "none";
		}

		var addPicker = document.createElement("input");
		addPicker.value = (this.gradientExist == true ? "-" : "+");
		addPicker.type = "button";
		colorDiv.appendChild(addPicker);
		addPicker.addEventListener("click", function(e){
			if(!LetsDraw.GetCurrentComponent().gradientExist){
			//	gradientColor2F(p);
				colorSelect2.style.display = "block";
				LetsDraw.ChangeCurrentElement({
					gradientExist: true
				});
			}
			else{
				colorSelect2.style.display = "none";
				LetsDraw.ChangeCurrentElement({
					gradientExist: false
				});
			}
			
		});


		LetsDraw.fixedPropertyDiv.appendChild(colorDiv);

		var borderHeader = document.createElement("h3");
		borderHeader.innerHTML = langLD.border;
		borderHeader.style.clear = "both"
		LetsDraw.fixedPropertyDiv.appendChild(borderHeader);
		LetsDraw.fixedPropertyDiv.appendChild(place);
		var colorDiv2 = document.createElement("div");
		colorDiv2.className = "colorDiv";
		var colorSelectBorder = LetsDraw.ColorPicker.createPicker({
			value: this.border.substr(1,this.border.length),
			place: colorDiv2,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					border:  "#" + e.target.value
				});
			},
			width: 137
		});
		LetsDraw.fixedPropertyDiv.appendChild(colorDiv2);

		var picker = document.createElement("input");
		picker.type = "range";
		picker.min = 0;
		picker.max = 5;
		picker.step = 1;
		picker.style.width = "90px";
		picker.value = this.borderWidth;
		picker.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				borderWidth: (e.target.value)
			});
		});
		LetsDraw.fixedPropertyDiv.appendChild(picker);
//		fixedPropertyDiv.style.top = Math.abs(this.x - this.h);



	}

}

BezierLine.prototype = Object.create(LetsDraw.Component.prototype);
BezierLine.prototype.constructor = BezierLine;


var Painter = function(){
	LetsDraw.Component.apply(this, arguments);
	this.name = langLD.painter
	this.sysName = "Painter"
	this.previewImg = "images/pen.png"
	this.w = 200
	this.h = 200
	this.pointPoint = new Array();
	this.interpolatePoint = new Array();
	this.border = "#000"
	this.borderWidth = 2
	this.lineStyleList = [
		 {
			type: "smooth",
			name: langLD.smooth
		},
		 {
			type: "point",
			name: langLD.point
		}
	]
	this.lineStyleSelect = "point";
}
Painter.prototype = Object.create(LetsDraw.Component.prototype);
Painter.prototype.constructor = Painter;

Painter.prototype.createComponent = function(){
	
	LetsDraw.fixedPropertyDiv.innerHTML = langLD.doubleClickToDraw;

}
Painter.prototype.renderComponent = function(){

	if(LetsDraw.userMouse.isMouseDown && LetsDraw.isBlockMainWork()){
		this.pointPoint.push([LetsDraw.userMouse.x - this.x, LetsDraw.userMouse.y - this.y]);
		var pointX = this.pointPoint[0][0], pointY =  this.pointPoint[0][1];
		for(var i = 0; i< this.pointPoint.length; i++){
			LetsDraw.mainContext.moveTo(pointX + this.x, pointY + this.y);
				LetsDraw.mainContext.lineTo(this.pointPoint[i][0] + this.x,
											this.pointPoint[i][1] + this.y);
				LetsDraw.mainContext.stroke();
				
				pointX = this.pointPoint[i][0];
				pointY = this.pointPoint[i][1];
		}
	}
	else{
	if(!LetsDraw.userMouse.isMouseDown && LetsDraw.isBlockMainWork()){

		this.interpolatePoint = new Array();
		var newArray = new Array();
		for(var i =0 ; i< this.pointPoint.length; i+= 10){
			newArray[i/10] = new Array();
			newArray[i/10][0] = this.pointPoint[i][0];
			newArray[i/10][1] = this.pointPoint[i][1];
		}
		for(var t=0; t<1; t+=0.01) {
			var point = interpolate(t, 2, newArray);
			this.interpolatePoint.push(point);
		}
	}
	var pointX = this.interpolatePoint[0][0], pointY =  this.interpolatePoint[0][1];
	LetsDraw.mainContext.beginPath();
	for(var i = 0; i < this.interpolatePoint.length - 1; i+=2){
		LetsDraw.mainContext.moveTo(pointX + this.x, pointY + this.y);
				
			//	var point = interpolate(t, 2, pointPoint);
				if(this.lineStyleSelect == "point"){
				LetsDraw.mainContext.lineTo(this.interpolatePoint[i][0] + this.x,
											this.interpolatePoint[i][1] + this.y);
				}
				if(this.lineStyleSelect == "smooth"){
				LetsDraw.mainContext.quadraticCurveTo(this.interpolatePoint[i][0] + this.x ,
														this.interpolatePoint[i][1] + this.y ,
														this.interpolatePoint[i+1][0] + this.x,
														this.interpolatePoint[i+1][1] + this.y
				
				);
				}
				LetsDraw.mainContext.lineWidth = this.borderWidth;
				LetsDraw.mainContext.strokeStyle = this.border;
				LetsDraw.mainContext.stroke();
				
				pointX = this.interpolatePoint[i+(this.lineStyleSelect == "point" ? 1: 0)][0];
				pointY = this.interpolatePoint[i+(this.lineStyleSelect == "point" ? 1: 0)][1];

	
	}
//	LetsDraw.mainContext.endPath();
	}
}
Painter.prototype.changeComponent = function(){
	 var  floppyPropertyDiv = LetsDraw.fixedPropertyDiv;
	LetsDraw.setBlockMainWork();
	var place = document.createElement('div');
		place.className = "colorPlaceSelect";

	var borderHeader = document.createElement("h3");
		borderHeader.innerHTML = langLD.border;
		borderHeader.style.clear = "both"
		floppyPropertyDiv.appendChild(borderHeader);
		floppyPropertyDiv.appendChild(place);
		var colorDiv2 = document.createElement("div");
		colorDiv2.className = "colorDiv";
		var colorSelectBorder = LetsDraw.ColorPicker.createPicker({
			value: this.border.substr(1,this.border.length),
			place: colorDiv2,
			event: function(e){
				LetsDraw.ChangeCurrentElement({
					border:  "#" + e.target.value
				});
			},
			width: 137
		});
		floppyPropertyDiv.appendChild(colorDiv2);

		var picker = document.createElement("input");
		picker.type = "range";
		picker.min = 0;
		picker.max = 5;
		picker.step = 1;
		picker.style.width = "90px";
		picker.value = this.borderWidth;
		picker.addEventListener("input", function(e){
			LetsDraw.ChangeCurrentElement({
				borderWidth: (e.target.value)
			});
		});
		floppyPropertyDiv.appendChild(picker);

		var borderHeader = document.createElement("h3");
		borderHeader.innerHTML = langLD.lineType;
		borderHeader.style.clear = "both"
		floppyPropertyDiv.appendChild(borderHeader);

		var selectLineType = document.createElement("select");
	//	for(var i = 0; i< this.alignSelect.length; i++)
		for(var i = 0; i< this.lineStyleList.length; i++)
		{
	//		console.log(elem.type);
			var opt = document.createElement("option");
			opt.value = this.lineStyleList[i].type;
			opt.text = this.lineStyleList[i].name;
			if(this.lineStyleSelect == this.lineStyleList[i].type)
			{
				opt.selected = true;
				
			}
			selectLineType.appendChild(opt);
		}

		selectLineType.addEventListener("change", function(e){
			var options = e.target.options;
			for(var i = 0; i < options.length; i++)
			{
				if(options[i].selected)
				{
					
					LetsDraw.ChangeCurrentElement({
						lineStyleSelect: options[i].value
					});
					break;
				}
			}
			LetsDraw.render();
		});

		floppyPropertyDiv.appendChild(selectLineType);





}