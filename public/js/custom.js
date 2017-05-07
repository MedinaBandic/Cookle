function openNav() {
    document.getElementById("mySidenav").style.marginRight = "0";
}

function closeNav() {
    document.getElementById("mySidenav").style.marginRight = "-250px";
}

(function ($) {
    // Instantiate MixItUp:
    $('#Container').mixItUp();

    // Add smooth scrolling to all links in navbar + footer link
    $(".sidenav a").on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function(){
            window.location.hash = hash;
        });
    });

})(jQuery);
