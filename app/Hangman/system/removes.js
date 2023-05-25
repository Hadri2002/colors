const Remove = (function()
{
    var self = 
    {

removeClickListenersAndSetClass: function() {
    // get all div elements whose id starts with "key_"
    const keyDivs = document.querySelectorAll('div[id^="key_"]');
  
    // loop through each keyDiv element
    keyDivs.forEach((keyDiv) => {
      let keyletterid= keyDiv.id;
      if(keyletterid!= ("hasznaltkey")){
        // remove the click event listener
        keyDiv.removeEventListener('click', null);
    
        // set the class to "hasznaltkey"
        keyletterid = ("hasznaltkey");
      }
      
    });
  }
  };

  return self;

})();