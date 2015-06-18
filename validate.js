$(document).ready(function() {
    // pulls configurable variables from data of script tag
    var script = $("script[src*='validate.js']");
    var scriptVariables = script.data();
    // sets configurable variables to data tag or default value
    var validateAllFormFields = "validateAllFormFields" in scriptVariables? scriptVariables["validateAllFormFields"] : true;
    var iconPadding = scriptVariables["iconPadding"] || "15px";
    var iconFont = scriptVariables["iconFont"] || "Arial";
    var iconWeight = scriptVariables["iconWeight"] || "bold";
    var iconSize = scriptVariables["iconSize"] || "14px";
    var iconInvalidCharacter = scriptVariables["iconInvalidCharacter"] || "X";
    var iconValidCharacter = scriptVariables["iconValidCharacter"] || "âœ”";
    var triangleWidth = scriptVariables["triangleWidth"] || "25px";
    var triangleHeight = scriptVariables["triangleHeight"] || "5px";
    var popupPadding = scriptVariables["popupPadding"] || "10px";
    var popupRadius = scriptVariables["popupRadius"] || "10px";
    var popupMaxWidth = scriptVariables["popupMaxWidth"] || "250px";
    var popupBackgroundColor = scriptVariables["popupBackgroundColor"] || "#f9d835";
    var popupBulletCharacter = scriptVariables["popupBulletCharacter"] || "â€¢ ";
    var checkForRequiredAttribute = "checkForRequiredAttribute" in scriptVariables? scriptVariables["checkForRequiredAttribute"] : true;
    var checkForWordsOverThirtyCharacters = "checkForWordsOverThirtyCharacters" in scriptVariables? scriptVariables["checkForWordsOverThirtyCharacters"] : false;
    var checkHtmlFiveWithCustomDataPatterns = "checkHtmlFiveWithCustomDataPatterns" in scriptVariables? scriptVariables["checkHtmlFiveWithCustomDataPatterns"] : false;

    // if validateAllFormFields then add validate class to all inputs, selects, and textarea
    if(validateAllFormFields) {
        $("form input,select,textarea").addClass("validate");
    }

    // appends css to head of page
    $("head").prepend(
    "<style type=\"text/css\">" +
    ".validate{\n" +
        "\tpadding-right: " + iconPadding + ";\n" +
    "}\n\n" +
    ".validation-icon{\n" +
        "\tposition: relative;\n" +
        "\tleft: -" + iconPadding + ";\n" +
        "\tfont-family: " + iconFont + ";\n" +
        "\tfont-weight: " + iconWeight + ";\n" +
        "\tfont-size: " + iconSize + ";\n" +
    "}\n\n" +
    ".validation-icon.invalid:after{\n" +
        "\tcontent: '" + iconInvalidCharacter + "';\n" +
        "\tcolor: red;\n" +
    "}\n\n" +
    ".validation-icon.valid:after{\n" +
        "\tcontent: '" + iconValidCharacter + "';\n" +
        "\tcolor: green;\n" +
    "}\n\n" +
    ".validation-popup {\n" +
        "\tposition:absolute;\n" +
        "\tz-index: 100;\n" +
        "\tpadding: " + popupPadding + ";\n" +
        "\tcolor: #000000;\n" +
        "\t-webkit-border-radius: " + popupRadius + ";\n" +
        "\t-moz-border-radius: " + popupRadius + ";\n" +
        "\tborder-radius: " + popupRadius + ";\n" +
        "\t max-width: " + popupMaxWidth + ";\n" +
        "\tbackground: " + popupBackgroundColor + ";\n" +
    "}\n\n" +
    ".validation-popup-triangle {\n" +
        "\tposition:absolute;\n" +
        "\tborder-style:solid;\n" +
        "\tleft: -" + triangleWidth + ";\n" +
        "\tborder-width: " + triangleHeight + " " + triangleWidth + " " + triangleHeight + " 0;\n" +
        "\tborder-color: transparent " + popupBackgroundColor + ";\n" +
    "}\n" +
    "</style>");

    // moves popup created by blur on last invalid field to clicked invalid field
    $(".validate").click(function () {
        $(this).trigger("mouseout");
        $(this).trigger("mouseover");
    });

    // creates popup if invalid on changes or navigations away but not on first click
    $(".validate").on("blur change keyup paste", function () {
        var field = $(this);
        var errors = [];
        // checks for html 5 required attribute
        if (checkForRequiredAttribute && field.prop("required") && (new RegExp(/^\s*$/).test(field.val()))) {
            errors.push("This field cannot be blank.");
        }
        // checks for words over thirty characters for security reasons (configurable)
        if (checkForWordsOverThirtyCharacters && new RegExp(/\S{30,}/).test(field.val())) {
            errors.push("This field cannot contain a word over 30 characters.");
        }
        var checkHTML5 = true;
        var data = field.data();
        // checks regex from pattern attribute and adds title attribute to errors
        $.each(data, function( key, value ) {
            if(key.indexOf("pattern") === 0){
                checkHTML5 = false;
                if(value && data["error"+key.replace("pattern","")] && !(new RegExp(value).test(field.val()))){
                    errors.push(data["error"+key.replace("pattern","")]);
                }
            }
        });
        var pattern = field.prop("pattern");
        var title = field.prop("title");
        // checks regex from data-pattern-xyz and adds data-error-xyz to errors
        if(checkHTML5 || checkHtmlFiveWithCustomDataPatterns){
            if ((!checkForRequiredAttribute && pattern && title && !(new RegExp(pattern).test(field.val()))) ||
                (checkForRequiredAttribute && field.prop("required") && pattern && title && !(new RegExp(pattern).test(field.val()))) ||
                (checkForRequiredAttribute && !field.prop("required") && !(new RegExp(/^\s*$/).test(field.val())) && pattern && title && !(new RegExp(field.prop("pattern")).test(field.val())))) {
                errors.push(field.prop("title"));
            }
        }
        // adds icon to field
        if(!field.next().hasClass("validation-icon")){
            field.after($("<span></span>").addClass("validation-icon"));
        }
        var icon = field.next();
        // add valid/invalid class and create popup if errors
        if (errors.length > 0) {
            icon.removeClass("valid").addClass("invalid").addClass("validation-hover");
            field.addClass("validation-hover");
            var mouseover = function(){
                //create popup on mouseover
                if(!icon.next().hasClass("validation-popup")){
                    icon.after($("<div></div>").addClass("validation-popup"));
                }
                var popup = icon.next();
                //populate popup with errors
                popup.html(popupBulletCharacter+errors.join("<br>"+popupBulletCharacter));
                //create popup triangle if needed
                if($(".validation-popup-triangle", popup).length == 0) {
                    popup.append($("<div></div>").addClass("validation-popup-triangle"));
                }
                var triangle = $(".validation-popup-triangle", popup);
                //set popup position (must be done every time incase screen size changes)
                popup.offset({
                    left: field.offset().left + field.outerWidth() + triangle.outerWidth(),
                    top: field.offset().top + field.outerHeight()/2 - popup.outerHeight()/2
                });
                //set popup triangle position (must be done every time incase screen size changes)
                triangle.css("top", popup.outerHeight()/2-$(".validation-popup-triangle", popup).outerHeight()/2);
            }
            // remove popup on mouse out
            var mouseout = function() {
                $(".validation-popup").remove();
            }
            // add events to icon and field
            field.mouseout(mouseout);
            icon.mouseout(mouseout);
            field.trigger("mouseout");
            field.mouseover(mouseover);
            icon.mouseover(mouseover);
            field.trigger("mouseover");
        } else {
            field.trigger("mouseout");
            field.unbind("mouseover").unbind("mouseout").removeClass("validation-hover");
            icon.unbind("mouseover").unbind("mouseout").removeClass("validation-hover");
            icon.removeClass("invalid").addClass("valid");
        }
    });
});