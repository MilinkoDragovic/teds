jQuery(document).ready(function () {


    if (location.pathname !== '/') {
        $("nav#mainnav a[href*='" + location.pathname + "']").addClass("current");
    } else {
        var home = document.getElementById("mainnav").getElementsByTagName('a')[0];
        home.className = 'current';
    }


});


