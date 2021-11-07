$(function () {
	'use strict';
	var width = $(window).width();
	// var height = $(window).height();

  /* Setting Current Year */
  $("#date").html(new Date().getFullYear());

	/* Preloader Annimation */
	$(window).on('load', function() {
		$(".preloader .spinner").fadeOut(function(){
			$('.preloader').fadeOut();
			$('body').addClass('ready');
		});
	});

	/* Scroll Fade Animation */
	if (width > 720) {
		window.sr = ScrollReveal();
		sr.reveal('.animated');
	}

  /* Button Hover Effect */
	$('.button-animated').on('mouseenter', '.circle', function(e){
		if ($(this).find(".ink").length === 0) {
			$(this).prepend("<span class='ink'></span>");
		}
		var ink = $(this).find(".ink");
		ink.removeClass("animate");
		if (!ink.height() && !ink.width()) {
			var d = Math.max($(this).outerWidth(), $(this).outerHeight());
			ink.css({
				height: d,
				width: d
			});
		}
		var x = e.pageX - $(this).offset().left - ink.width() / 2;
		var y = e.pageY - $(this).offset().top - ink.height() / 2;
		ink.css({
			top: y + 'px',
			left: x + 'px'
		}).addClass("animate");
	});

	/* Validate Contact Form */
	$("#contact-form").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			subject: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$.ajax({
				url: 'mailer/feedback.php',
				type: 'post',
				dataType: 'json',
				data: 'name='+ $("#contact-form").find('input[name="name"]').val() + '&email='+ $("#contact-form").find('input[name="email"]').val() + '&subject='+ $("#contact-form").find('input[name="subject"]').val() + '&message=' + $("#contact-form").find('textarea[name="message"]').val(),
				beforeSend: function() {
				},
				complete: function() {
				},
				success: function(data) {
					$('#contact-form').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});
});