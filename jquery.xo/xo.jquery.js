var uXOGameFigure = "O";
var uXOGameClick = 0;
function uXOGame() {
	$("#uXO td div").click(function () {
		if (setSymbol(this) == 1) {
			if (getXOGameCondition() == 0) {
				AI_Level_0();
				getXOGameCondition();
			}
			else {
				clearField();
			}
		}
	});
}

function getXOGameCondition() {

	if (checkXOGameCondition($("#uXO td:eq(0) div").text(), $("#uXO td:eq(1) div").text(), $("#uXO td:eq(2) div").text()) == 1)
	return 1;
	if (checkXOGameCondition($("#uXO td:eq(3) div").text(), $("#uXO td:eq(4) div").text(), $("#uXO td:eq(5) div").text()) == 1)
	return 1;
	if (checkXOGameCondition($("#uXO td:eq(6) div").text(), $("#uXO td:eq(7) div").text(), $("#uXO td:eq(8) div").text()) == 1)
	return 1;
	
	if (checkXOGameCondition($("#uXO td:eq(0) div").text(), $("#uXO td:eq(3) div").text(), $("#uXO td:eq(6) div").text()) == 1)
	return 1;
	if (checkXOGameCondition($("#uXO td:eq(1) div").text(), $("#uXO td:eq(4) div").text(), $("#uXO td:eq(7) div").text()) == 1)
	return 1;
	if (checkXOGameCondition($("#uXO td:eq(2) div").text(), $("#uXO td:eq(5) div").text(), $("#uXO td:eq(8) div").text()) == 1)
	return 1;
	
	if (checkXOGameCondition($("#uXO td:eq(0) div").text(), $("#uXO td:eq(4) div").text(), $("#uXO td:eq(8) div").text()) == 1)
	return 1;
	if (checkXOGameCondition($("#uXO td:eq(2) div").text(), $("#uXO td:eq(4) div").text(), $("#uXO td:eq(6) div").text()) == 1)
	return 1;
	
	if (clearField() == 1)
	return 1;
	
	return 0;
}

function clearField() {
	if (uXOGameClick == 9)  {
		$("#uXO td div").html("");
		uXOGameClick = 0;
		uXOGameFigure = "O";
		return 1;
	}
return 0;
}

function checkXOGameCondition(x0, x1, x2) {
	if (x0 != "" && x1 != "" && x2 != "") {
		if ( (x0 == "X" && x1 == "X" && x2 == "X") || (x0 == "O" && x1 == "O" && x2 == "O") ) {
			alert("Wins: " + uXOGameFigure);
			$("#uXO td div").html("");
			uXOGameClick = 0;
			uXOGameFigure = "O";
			return 1;
		} 
	}
	return 0;
}

function setSymbol(e) {
	var thisContent = $(e).text();
		if (thisContent != "")
			return 0;

		if (uXOGameFigure == "O") {
			uXOGameFigure = "X";
			$(e).css({color : "blue"});
		} else {
			uXOGameFigure = "O";
			$(e).css({color : "red"});
		}
		
		$(e).html(uXOGameFigure);
		
		uXOGameClick++;
	return 1;
}

function AI_Level_0() {
	var elemId;
	var elemText;
	var elem;

	while (true) {
		elemId = Math.floor(Math.random() * 9);
		elem = $("#uXO td:eq("+elemId+") div");
		if (setSymbol(elem) == 1) {
			break;
		}
	}
}

