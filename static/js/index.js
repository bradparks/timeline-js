$(document).ready(function() {
	var duration
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		// timeline instance
		var options = {
						'height':100, 
						'width':750,
						'scaleHeight':30,
						'scaleBackgroundColor':'#a50000', 
						'scaleColor':'#ccc',
						'backgroundColor':'#E7E2DE',
						'textColor':'#eee',
						'cursorColor':'#000',
						'maxScaleFactor':1,
						'numberOfTracks':3,
						'periodShape':'rectangle',
						'cursorHeight':100, 
					}
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options, 'scale', 'scroll');
		timeline.addPeriod(5,12, '#7A1631', 1)
		timeline.addPeriod(7,13, '#CF423C', 2)
		timeline.addPeriod(15,25, '#7A1631', 3)
		timeline.addPeriod(23,28, '#CF423C', 1)
	})
	
	$("#play").click(function(event){
		$('audio').get(0).play()
		$(this).hide()
		$("#pause").show()
	})
	$("#pause").click(function(event){
		$('audio').get(0).pause()
		$(this).hide()
		$("#play").show()
	})
	$("#stop").click(function(event){
		$('audio').get(0).pause()
		$('audio').get(0).currentTime = 0
		$("#play").show()
		$("#pause").hide()
	})
	$("#pause").hide()
	
	$( "#slider-range" ).dragslider({
		range: true,
		min: 0.0,
		max: 100.0,
		rangeDrag: true,
		values: [ 0.0, 100.0 ],
		slide: function( event, ui ) {
			var ratio = (100 - (ui.values[1]-ui.values[0]))/100 
			var min_scale = parseFloat($('#scale').attr('min'))
			var max_scale = parseFloat($('#scale').attr('max'))
			document.getElementById('scale').setAttribute('value', ratio*(max_scale-min_scale)+min_scale);
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, true);
			document.getElementById('scale').dispatchEvent(event)
			var max_scroll = parseFloat($('#scroll').attr('max'))
			document.getElementById('scroll').setAttribute('value', ui.values[0]/100*max_scroll);
		}
	});
})
