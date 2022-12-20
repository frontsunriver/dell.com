
// Ticker
/*

example HTML:
<span class="num" data-value="89" data-prefix="$" data-suffix="M" data-time="0.7" >$11M</span>

example JS:
new Ticker(jQuery(".num"));

*/

var Ticker = function (element) {
    // console.log("Ticker");
    // console.log(element.data("value"));

    var values = {
        int: 0
    };

    var el = element;
    var el_trigger = "trigger-"+makeid();
    var start = 0;
    var end = element.data("value")? element.data("value") : console.warn("no value");
    var pf = element.data("prefix")? element.data("prefix") : "";
    var sf = element.data("suffix")? element.data("suffix") : "";
    var time = element.data("time")? element.data("time") : 1.2;
    var delay = element.data("delay")? element.data("delay") : 0.1;

    var controller = new ScrollMagic.Controller();

    // console.log(end);

    el.parent().prepend("<div class=\""+el_trigger+"\"></div>");

    var tl1 = new TimelineMax();
    var tweenCells1 = tl1
        .to(values, time, {int: end, roundProps: "int", onUpdate: int_updateHandler, ease: Linear.easeNone}, delay);

    new ScrollMagic.Scene({triggerElement: "."+el_trigger, triggerHook: "onEnter"})
        .setTween(tweenCells1)
        .addTo(controller)
        // .addIndicators("stats")
        .reverse(false);



    function int_updateHandler  () {
        $(el).text(pf.toString() + values.int + sf.toString());
    }

    function makeid (){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
    

};



