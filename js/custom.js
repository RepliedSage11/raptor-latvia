$(document).ready(function () {
	"use strict";
	$('.loader img').animate({
		width: "1200",
		opacity: 0
	}, 400);
	$(".loader").fadeOut(500);
	
	
	$("#main").animate({
		opacity: "1"
	}, 500);
	
	/* 

	1. Vars and Inits

	*/
	

	const header = $('.header');
	let hambActive = false;
	let menuActive = false;

	setHeader();

	$(window).on('resize', function () {
		setHeader();
	});

	$(document).on('scroll', function () {
		setHeader();
	});

	initHomeSlider();
	initMenu();

	/* 

	2. Set Header

	*/

	function setHeader() {
		if ($(window).scrollTop() > 100) {
			header.addClass('scrolled');
		} else {
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Home Slider

	*/

	function initHomeSlider() {
		if ($('.home_slider').length) {
			const homeSlider = $('.home_slider');
			homeSlider.owlCarousel(
				{
					items: 1,
					autoplay: true,
					autoplayTimeout: 10000,
					loop: true,
					nav: false,
					smartSpeed: 1200,
					dotsSpeed: 1200,
					fluidSpeed: 1200
				});

			/* Custom dots events */
			if ($('.home_slider_custom_dot').length) {
				$('.home_slider_custom_dot').on('click', function () {
					$('.home_slider_custom_dot').removeClass('active');
					$(this).addClass('active');
					homeSlider.trigger('to.owl.carousel', [$(this).index(), 1200]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			homeSlider.on('changed.owl.carousel', function (event) {
				$('.home_slider_custom_dot').removeClass('active');
				$('.home_slider_custom_dots li').eq(event.page.index).addClass('active');
			});

			// add animate.css class(es) to the elements to be animated
			function setAnimation(_elem, _InOut) {
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each(function () {
					var $elem = $(this);
					var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

					$elem.addClass($animationType).one(animationEndEvent, function () {
						$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
					});
				});
			}

			// Fired before current slide change
			homeSlider.on('change.owl.carousel', function (event) {
				var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-out]");
				setAnimation($elemsToanim, 'out');
			});

			// Fired after current slide has been changed
			homeSlider.on('changed.owl.carousel', function (event) {
				var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-in]");
				setAnimation($elemsToanim, 'in');
			})
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu() {
		if ($('.hamburger').length) {
			var hamb = $('.hamburger');

			hamb.on('click', function (event) {
				event.stopPropagation();

				if (!menuActive) {
					openMenu();

					$(document).one('click', function cls(e) {
						if ($(e.target).hasClass('menu_mm')) {
							$(document).one('click', cls);
						}
						else {
							closeMenu();
						}
					});
				}
				else {
					$('.menu').removeClass('active');
					menuActive = false;
				}
			});

			//Handle page menu
			if ($('.page_menu_item').length) {
				var items = $('.page_menu_item');
				items.each(function () {
					var item = $(this);

					item.on('click', function (evt) {
						evt.stopPropagation();
					});
				});
			}
		}
	}

	function openMenu() {
		var fs = $('.menu');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu() {
		var fs = $('.menu');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}


});