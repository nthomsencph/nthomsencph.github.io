$(window).on("load",function(){
  
    
    "use strict";
    /*=========================================================================
        Preloader
    =========================================================================*/
    $("#preloader").delay(350).fadeOut('slow');

    /*=========================================================================
        Custom Scrollbar
    =========================================================================*/
    $(".header-inner").mCustomScrollbar();

    /*=========================================================================
     Isotope
     =========================================================================*/  

    $('.portfolio-filter').on( 'click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });

    });

    $('.skills-filter').on( 'click', 'li', function() {
        var skills_filterValue = $(this).attr('data-filter');
        $skillscontainer.isotope({ filter: skills_filterValue });
    });

    $('.toggle-filter').on( 'click', 'li', function() {
        var toggle_filterValue = $(this).attr('data-filter');
        $togglecontainer.isotope({ filter: toggle_filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });

    // WORKS
    $('.skills-filter').each( function( i, buttonGroup ) {
        var $skillsbuttonGroup = $( buttonGroup );
        $skillsbuttonGroup.on( 'click', 'li', function() {
            $skillsbuttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });

    // WORKS
    $('.toggle-filter').each( function( i, buttonGroup ) {
        var $togglebuttonGroup = $( buttonGroup );
        $togglebuttonGroup.on( 'click', 'li', function() {
            $togglebuttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });   

    

    var $container = $('.portfolio-wrapper');
    $container.imagesLoaded( function() {
      $('.portfolio-wrapper').isotope({
          // options
          itemSelector: '.grid-item',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '.grid-item'
          }
      });
    });


    var $skillscontainer = $('.skills-wrapper');
    $skillscontainer.imagesLoaded( function() {
      $('.skills-wrapper').isotope({

          // options
          itemSelector: '.grid-item',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '.grid-item'
          }
      });
    });

    var $togglecontainer = $('.toggle-wrapper');
    $togglecontainer.imagesLoaded( function() {
      $('.toggle-wrapper').isotope({

          // options
          itemSelector: '.grid-item',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '.grid-item'
          }
      });
    });

    // Sets python as first skill value and hides rest. 
    // Wrap this in a function somehow.
    var skills_filterValue = $('.first').attr('data-filter');
    $skillscontainer.isotope({ filter: skills_filterValue });
    $('.first' ).addClass('current').hide();

    

      // Sets academic as first background value and hides rest. 
    // Wrap this in a function somehow.
    var toggle_filterValue = $('.primary').attr('data-filter');
    $togglecontainer.isotope({ filter: toggle_filterValue });
    $('.primary' ).addClass('current');

    /*=========================================================================
     Toggle Specific Sections
     =========================================================================*/


    $("#section-title-cert").click(function () {
      $(".content-section-cert").toggle();
    });

    
    $("#section-title-skills").click(function () {
      $(".content-section-skills").toggle();
    });

    $("#section-title-aca").click(function () {
      $(".content-section-aca").toggle();
    });

    $("#section-title-res").click(function () {
      $("#content-section-res").toggle();

    });



    /*=========================================================================
     Infinite Scroll
     =========================================================================*/
    var curPage = 1;
    var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
        itemSelector: '.grid-item',
        nextSelector: '.portfolio-pagination li a',
        navSelector: '.portfolio-pagination',
        extraScrollPx: 0,
        bufferPx: 0,
        maxPage: 6,
        loading: {
            finishedMsg: "No more works",
            msgText: '',
            speed: 'slow',
            selector: '.load-more',
        },
    },
    // trigger Masonry as a callback
    function( newElements ) {

      var $newElems = $( newElements );
      $newElems.imagesLoaded(function(){  
        $newElems.animate({ opacity: 1 });
        $container.isotope( 'appended', $newElems );
      });

      // Check last page
      curPage++;
      if(curPage == pagesNum) {
        $( '.load-more' ).remove();
      }

    });



    $container.infinitescroll( 'unbind' );

    $( '.load-more .btn' ).on('click', function() {
      $container.infinitescroll( 'retrieve' );
      // display loading icon
      $( '.load-more .btn i' ).css('display', 'inline-block');
      $( '.load-more .btn i' ).addClass('fa-spin');

      $(document).ajaxStop(function () {
        setTimeout(function(){
               // hide loading icon
          $( '.load-more .btn i' ).hide();
        }, 1000);
      });
      return false;
    });

    /* ======= Mobile Filter ======= */

    // bind filter on select change
    $('.portfolio-filter-mobile').on( 'change', function() {
      // get filter value from option value
      var filterValue = this.value;
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
    });

    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
});

/*=========================================================================
            Carousels
=========================================================================*/
$(document).on('ready', function() {
    "use strict";

    $('.volunteer-slick-slider').slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });
});

$(function(){
    "use strict";

    $('.menu-icon').on( 'click', function() {
        $('header.left').toggleClass('open');
        $('.mobile-header, main.content').toggleClass('push');
    });

    $('main.content, header.left button.close').on( 'click', function() {
        $('header.left').removeClass('open');
        $('.mobile-header, main.content').removeClass('push');
    });

    /*=========================================================================
     Counterup JS for facts
     =========================================================================*/
    $('.count').counterUp({
      delay: 10,
      time: 2000
    });

    /*=========================================================================
     Progress bar animation with Waypoint JS
     =========================================================================*/
    if ($('.skill-item').length > 0) { 
      var waypoint = new Waypoint({
        element: document.getElementsByClassName('skill-item'),
        handler: function(direction) {
          
          $('.progress-bar').each(function() {
            var bar_value = $(this).attr('aria-valuenow') + '%';                
            $(this).animate({ width: bar_value }, { easing: 'linear' });
          });

          this.destroy()
        },
        offset: '50%'
      });
    }

    /*=========================================================================
     One Page Scroll with jQuery
     =========================================================================*/
    $('.vertical-menu li a[href^="#"]:not([href="#"])').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top-50
      }, 800, 'easeInOutQuad');
      event.preventDefault();
    });

    /*=========================================================================
     Add (nav-link) class to main menu.
     =========================================================================*/
    $('.vertical-menu li a').addClass('nav-link');

    /*=========================================================================
     Bootstrap Scrollspy
     =========================================================================*/
    $("body").scrollspy({ target: ".scrollspy", offset: 50});

    /*=========================================================================
     Background Image with Data Attribute
     =========================================================================*/
    var bg_img = document.getElementsByClassName('background');

    for (var i = 0; i < bg_img.length; i++) {
      var src = bg_img[i].getAttribute('data-image-src');
      bg_img[i].style.backgroundImage="url('" + src + "')";
    }

    /*=========================================================================
     Spacer with Data Attribute
     =========================================================================*/
    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
      var size = list[i].getAttribute('data-height');
      list[i].style.height = "" + size + "px";
    }

    /*=========================================================================
            Scroll to Top
    =========================================================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 250) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').on('click', function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 400);
    });

    

});