$(document).ready(function () {
	"use strict";
	$('.loader img').animate({
		width: "1200",
		opacity: 0
	}, 400);
	$(".loader").fadeOut(500, function() {
		
		$("#main").animate({
			opacity: "1"
		}, 500);
	});
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

	function initGoogleMap() {
		var myLatlng = new google.maps.LatLng(34.043238, -118.258338);
		var mapOptions =
		{
			center: myLatlng,
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			scrollwheel: false,
			zoomControl: true,
			zoomControlOptions:
			{
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
			styles:
				[
					{
						"featureType": "landscape",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#e9e5dc"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry",
						"stylers": [
							{
								"weight": 1.5
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"weight": 1
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#fa9e25"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#e49307"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry",
						"stylers": [
							{
								"weight": 0.5
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#d9d4ca"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}
				]
		}

		// Initialize a map with options
		map = new google.maps.Map(document.getElementById('map'), mapOptions);

		// Re-center map after window resize
		google.maps.event.addDomListener(window, 'resize', function () {
			setTimeout(function () {
				google.maps.event.trigger(map, "resize");
				map.setCenter(myLatlng);
			}, 1400);
		});
	}
});