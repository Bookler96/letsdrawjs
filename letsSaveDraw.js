/**
 * @name LetsSaveDraw!JS - library for i/o canvas drawing
 * @author Andrey Kizimov (independ12@gmail.com)
 */
"use strict";
(function(){

    var version = "0.1";
    var saveInfo = new Object();
    var mainArray = new Object();
    function LetsSaveDraw( param ){
        mainArray = LetsDraw.GetComponentOnScene();
        console.log(mainArray);
        var connectedList = LetsDraw.GetConnectedComponent();
        console.log(connectedList);

        for(var elem in mainArray)
        {
            if(mainArray.hasOwnProperty(elem))
            {
                
           
           
        var t = new connectedList[mainArray[elem]["sysName"]]();
          // console.log(t);
     
          //      if(t[elem] != mainArray[elem]){
              //  {
                  var state = new Object();
                  for(var elem2 in mainArray[elem]){
                      if(t[elem2] != mainArray[elem][elem2]){
                             state[elem2] = mainArray[elem][elem2];
                      }
                  }
                 
                  saveInfo[elem] = state;
                   saveInfo[elem]['sysName'] = mainArray[elem]["sysName"];
                   // saveInfo[elem].
              //  }
                    
            }
        }

        param["textarea"].value = JSON.stringify(saveInfo);
      //  console.log(saveInfo);
   //   console.log(JSON.stringify(saveInfo));
    //  LetsOpenDraw((JSON.stringify(saveInfo)));
    }

    function LetsOpenDraw( JSONString )
    {
        var string = JSON.parse(JSONString);
        var connectedList = LetsDraw.GetConnectedComponent();
        console.log(string);
        for(var elem in string)
        {
       //    console.log(connectedList[string[elem]['sysName']]); 
            var comp = new connectedList[string[elem]['sysName']]();
            for(var elem2 in string[elem]){
                comp[elem2] = string[elem][elem2];
            } 
            LetsDraw.mainBuffer.addToBuffer(comp);
            
        }
    }
    
    window.LetsSaveDraw = LetsSaveDraw;
    window.LetsOpenDraw = LetsOpenDraw;
    
})();