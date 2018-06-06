uFifteenGame = function () {
	uFifteenShuffle();

	$("#uFifteenGame div").click(function() {
		var thisX = $(this).parent().parent().index();
		var thisY = $(this).parent().index();
		var newX, newY;
		var x1 = $("#uFifteenGame tr:eq("+(thisX-1)+") td:eq("+thisY+") div").text();
		var x2 = $("#uFifteenGame tr:eq("+thisX+") td:eq("+(thisY+1)+") div").text();
		var x3 = $("#uFifteenGame tr:eq("+(thisX+1)+") td:eq("+thisY+") div").text();
		var x4 = $("#uFifteenGame tr:eq("+thisX+") td:eq("+(thisY-1)+") div").text();

		if (x1 == " ") {
			uFifteenChange(thisX, thisY, thisX-1, thisY);
			uFifteenCheckWinCondition();
			return;
		}
		
		if (x2 == " ") {
			uFifteenChange(thisX, thisY, thisX, thisY+1);
			uFifteenCheckWinCondition();
			return;
		}
		
		if (x3 == " ") {
			uFifteenChange(thisX, thisY, thisX+1, thisY);
			uFifteenCheckWinCondition();
			return;
		}
		
		if (x4 == " ") {
			uFifteenChange(thisX, thisY, thisX, thisY-1);
			uFifteenCheckWinCondition();
			return;
		}

	});

	function uFifteenChange(thisX, thisY, newX, newY) {
		var currentValue = $("#uFifteenGame tr:eq("+thisX+") td:eq("+thisY+") div").text();
		$("#uFifteenGame tr:eq("+thisX+") td:eq("+thisY+") div").html(" ");
		$("#uFifteenGame tr:eq("+newX+") td:eq("+newY+") div").html(currentValue);
	}

	$("#uFifteenNewGame").click(function() {
		uFifteenShuffle();
	});
	
	function uFifteenShuffle() {
		var val = 0;
		var testVal = 0;
		var flag = true;
		for (var i = 0; i < 4; i++) {
			$("#uFifteenGame tr:eq("+i+") td:eq("+j+") div").html(val);
		}
		

		for(var k = 0; k < 4; k++) {
			for(var j = 0, i = 0; i < 4; j = Math.floor(Math.random() * 3), i++) {
				testVal = $("#uFifteenGame tr:eq("+k+") td:eq("+i+") div").text();
				val = $("#uFifteenGame tr:eq("+k+") td:eq("+j+") div").text();
				$("#uFifteenGame tr:eq("+k+") td:eq("+i+") div").html(val);
				$("#uFifteenGame tr:eq("+k+") td:eq("+j+") div").html(testVal);
			}
		}
		
		for(var k = 0; k < 4; k++) {
			for(var j = 0, i = 0; i < 4; j = Math.floor(Math.random() * 3), i++) {
				testVal = $("#uFifteenGame tr:eq("+i+") td:eq("+k+") div").text();
				val = $("#uFifteenGame tr:eq("+j+") td:eq("+k+") div").text();
				$("#uFifteenGame tr:eq("+i+") td:eq("+k+") div").html(val);
				$("#uFifteenGame tr:eq("+j+") td:eq("+k+") div").html(testVal);
			}
		}
	}

	function uFifteenCheckWinCondition() {
	var flag = true;
	var number = 1;
	var testVal = 0;
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				testVal = parseInt($("#uFifteenGame tr:eq("+i+") td:eq("+j+") div").text());
				if (testVal != number && number != 16) {
					flag = false;
					return;
				}
				number++;
			}
		}
		alert("Congratulations!");
	}
}