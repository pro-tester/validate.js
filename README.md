# validate.js  
A graphical, customizable, jquery validator compatible with standard html validation.  

##How to use (Basic):  
Make sure you have jquery included in the page:  
`<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>`  
Add validate.js script tag:  
`<script type="text/JavaScript" src="https://raw.github.com/pro-tester/validate.js/master/validate.js"></script>`  
You now have instant popup validation of html5 validated form fields  
`<input type="text" name="zip" maxlength="5" size="2" pattern="[0-9]{5}" title="Please enter a 5 digit zip code containing numbers only." required/>`  

##How to use (Advanced):  
Make sure you have jquery included in the page:  
`<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>`  
Add validate.js script tag with attributes for non-default parameters:  
`<script type="text/JavaScript" src="https://raw.github.com/pro-tester/validate.js/master/validate.js" non-default-parameter="non-default-value"></script>`  

Parameter defaults:  
validate-all-form-fields                   |  true  
icon-padding                               |  15px  
icon-font                                  |  Arial  
icon-weight                                |  bold  
icon-size                                  |  14px  
icon-invalid-character                     |  X  
icon-valid-character                       |  âœ”  
triangle-width                             |  25px  
triangle-height                            |  5px  
popup-padding                              |  10px  
popup-radius                               |  10px  
popup-max-width                            |  250px  
popup-background-color                     |  #f9d835  
popup-bullet-character                     |  â€¢   
check-for-required-attribute               |  true  
check-for-words-over-thirty-characters     |  false  
check-html-five-with-custom-data-patterns  |  false  

You now have instant popup validation of html5 validated form fields and can add custom pattern/error combos using the prefixes data-pattern and data-error:  
`<input type="text" name="zip" maxlength="5" size="2"  data-pattern="[0-9]{1,}" data-error="Must be atleast 1 letter" data-pattern2="[0-9]{2,}" data-error2="Must be atleast 2 letters" data-pattern-three="[0-9]{3,}" data-error-three="Must be atleast 3 letters" pattern="[0-9]{5}" title="Please enter a 5 digit zip code containing numbers only." required/>`  