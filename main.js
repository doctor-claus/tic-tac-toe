$(document).ready(function(){
	var winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	var origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	$(".player").on('click', function(){
		var player = $(this).attr('id');
		if(player == "one"){
			$(".screen").fadeOut(1000, function(){
				$(this).remove();
				$(".game").append("<div class= 'screen'></div>");
				$(".screen").hide().html('<p style= "font-size: 2em; padding-top: 100px">Would you like to be X or O?</p><p class = "sign" style= "font-size: 4em" id= "X"><span>X</span></p><p class = "sign" style= "font-size: 4em" id= "O"><span>O</span></p>').fadeIn(1000);
				$(".sign").on('click', function(){
					sign = $(this).attr('id');
					if(sign == "X"){
						$(".screen").fadeOut(1000, function(){
							$(this).remove();
							$(".game").append("<div class= 'screen'></div>");
							$(".screen").html();
							$(".screen").prepend('<div class= "row"><div class= "col-md-4"><div class= "tic" id= "0"></div></div><div class= "col-md-4"><div class= "tic" id= "1"></div></div><div class= "col-md-4"><div class= "tic" id= "2"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "3"></div></div><div class= "col-md-4"><div class= "tic" id= "4"></div></div><div class= "col-md-4"><div class= "tic" id= "5"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "6"></div></div><div class= "col-md-4"><div class= "tic" id= "7"></div></div><div class= "col-md-4"><div class= "tic" id= "8"></div></div></div>');
							$("#line1").fadeIn(1000).removeClass(".line1").addClass(".line5");
							$("#line2").fadeIn(1000).removeClass(".line2").addClass(".line6");
							$("#line3").fadeIn(1000).removeClass(".line3").addClass(".line7");
							$("#line4").fadeIn(1000).removeClass(".line4").addClass(".line8");
							$("#reset").fadeIn(1000).removeClass(".reset").addClass(".reset1");
							$(".tic").on('click', function(){
								var flag = false;
								ai = "O";
								var slot = $(this).attr('id');
								if($("#" + slot + ":contains('X')").length == 0 && $("#" + slot + ":contains('O')").length == 0){
									$("#" + slot).text(sign).fadeIn(1000);
								}
								origBoard[slot] = sign;
								var plays = origBoard.reduce((a, e, i) => (e == sign) ? a.concat(i) : a, []);
								for(var i = 0; i<winConditions.length; i++){
									if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
										for(var j = 0; j<winConditions[i].length; j++){
											document.getElementById(winConditions[i][j]).style.color = (sign == "X") ? "blue" : "red";
											$(".tic").off('click');
											setTimeout(function(){
												$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
												$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
												$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
												$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
												$(".screen").fadeOut(1000, function(){
													$(this).remove();
													$(".game").append("<div class= 'screen'></div>");
													$(".screen").html();
													$(".screen").hide().html('<p id= "question" style= "font-size: 3em">You win!</p>').fadeIn(1000);
												});
											}, 2000);
										}
										flag = true;
									}
								}
								if(flag == false){
									var aislot = minimax(origBoard, ai).index;
									setTimeout(function(){
										$("#" + aislot).text(ai).fadeIn(1000);
										origBoard[aislot] = ai;
										var plays = origBoard.reduce((a, e, i) => (e == ai) ? a.concat(i) : a, []);
										for(var i = 0; i<winConditions.length; i++){
											if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
												for(var j = 0; j<winConditions[i].length; j++){
													document.getElementById(winConditions[i][j]).style.color = (ai == "O") ? "red" : "blue";
													$(".tic").off('click');
													setTimeout(function(){
														$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
														$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
														$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
														$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
														$(".screen").fadeOut(1000, function(){
															$(this).remove();
															$(".game").append("<div class= 'screen'></div>");
															$(".screen").html();
															$(".screen").hide().html('<p id= "question" style= "font-size: 3em">You lose!</p>').fadeIn(1000);
														});
													}, 2000);
												}
											}
										}
									}, 1000);
								}
								for(var i = 0; i<origBoard.length; i++){
									if(typeof origBoard[i] == 'number'){
										break;
									}
									else if(i == 8){
										$(".tic").off('click');
										setTimeout(function(){
											$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
											$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
											$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
											$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
											$(".screen").fadeOut(1000, function(){
												$(this).remove();
												$(".game").append("<div class= 'screen'></div>");
												$(".screen").html();
												$(".screen").hide().html('<p id= "question" style= "font-size: 3em">It' + "'" + 's' + ' a tie</p>').fadeIn(1000);
											});
										}, 2000);	
									}
								}
							});
						});
					}
					else if(sign == "O"){
						$(".screen").fadeOut(1000, function(){
							$(this).remove();
							$(".game").append("<div class= 'screen'></div>");
							$(".screen").html();
							$(".screen").prepend('<div class= "row"><div class= "col-md-4"><div class= "tic" id= "0"></div></div><div class= "col-md-4"><div class= "tic" id= "1"></div></div><div class= "col-md-4"><div class= "tic" id= "2"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "3"></div></div><div class= "col-md-4"><div class= "tic" id= "4"></div></div><div class= "col-md-4"><div class= "tic" id= "5"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "6"></div></div><div class= "col-md-4"><div class= "tic" id= "7"></div></div><div class= "col-md-4"><div class= "tic" id= "8"></div></div></div>');
							$("#line1").fadeIn(1000).removeClass(".line1").addClass(".line5");
							$("#line2").fadeIn(1000).removeClass(".line2").addClass(".line6");
							$("#line3").fadeIn(1000).removeClass(".line3").addClass(".line7");
							$("#line4").fadeIn(1000).removeClass(".line4").addClass(".line8");
							$("#reset").fadeIn(1000).removeClass(".reset").addClass(".reset1");
							$(".tic").on('click', function(){
								var flag = false;
								ai = "X";
								var slot = $(this).attr('id');
								if($("#" + slot + ":contains('X')").length == 0 && $("#" + slot + ":contains('O')").length == 0){
									$("#" + slot).text(sign).fadeIn(1000);
								}
								origBoard[slot] = sign;
								var plays = origBoard.reduce((a, e, i) => (e == sign) ? a.concat(i) : a, []);
								for(var i = 0; i<winConditions.length; i++){
									if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
										for(var j = 0; j<winConditions[i].length; j++){
											document.getElementById(winConditions[i][j]).style.color = (sign == "O") ? "red" : "blue";
											$(".tic").off('click');
											setTimeout(function(){
												$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
												$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
												$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
												$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
												$(".screen").fadeOut(1000, function(){
													$(this).remove();
													$(".game").append("<div class= 'screen'></div>");
													$(".screen").html();
													$(".screen").hide().html('<p id= "question" style= "font-size: 3em">You win!</p>').fadeIn(1000);
												});
											}, 2000);
										}
										flag = true;
									}
								}
								if(flag == false){
									var aislot = minimax(origBoard, ai).index;
									setTimeout(function(){
										$("#" + aislot).text(ai).fadeIn(1000);
										origBoard[aislot] = ai;
										var plays = origBoard.reduce((a, e, i) => (e == ai) ? a.concat(i) : a, []);
										for(var i = 0; i<winConditions.length; i++){
											if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
												for(var j = 0; j<winConditions[i].length; j++){
													document.getElementById(winConditions[i][j]).style.color = (ai == "X") ? "blue" : "red";
													$(".tic").off('click');
													setTimeout(function(){
														$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
														$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
														$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
														$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
														$(".screen").fadeOut(1000, function(){
															$(this).remove();
															$(".game").append("<div class= 'screen'></div>");
															$(".screen").html();
															$(".screen").hide().html('<p id= "question" style= "font-size: 3em">You lose!</p>').fadeIn(1000);
														});
													}, 2000);
												}
											}
										}
									}, 1000);
								}
								for(var i = 0; i<origBoard.length; i++){
									if(typeof origBoard[i] == 'number'){
										break;
									}
									else if(i == 8){
										$(".tic").off('click');
										setTimeout(function(){
											$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
											$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
											$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
											$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
											$(".screen").fadeOut(1000, function(){
												$(this).remove();
												$(".game").append("<div class= 'screen'></div>");
												$(".screen").html();
												$(".screen").hide().html('<p id= "question" style= "font-size: 3em">It' + "'" + 's' + ' a tie</p>').fadeIn(1000);
											});
										}, 2000);	
									}
								}
							});
						});
					}
				});
			});
		}
		else if(player == "two"){
			$(".screen").fadeOut(1000, function(){
				$(this).remove();
				$(".game").append("<div class= 'screen'></div>");
				$(".screen").hide().html('<p style= "font-size: 2em; padding-top: 100px">Would Player 1 like to be X or O?</p><p class = "sign" style= "font-size: 4em" id= "X"><span>X</span></p><p class = "sign" style= "font-size: 4em" id= "O"><span>O</span></p>').fadeIn(1000);
				$(".sign").on('click', function(){
					sign = $(this).attr('id');
					if(sign == "X"){
						$(".screen").fadeOut(1000, function(){
							$(this).remove();
							$(".game").append("<div class= 'screen'></div>");
							$(".screen").html();
							$(".screen").prepend('<div class= "row"><div class= "col-md-4"><div class= "tic" id= "0"></div></div><div class= "col-md-4"><div class= "tic" id= "1"></div></div><div class= "col-md-4"><div class= "tic" id= "2"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "3"></div></div><div class= "col-md-4"><div class= "tic" id= "4"></div></div><div class= "col-md-4"><div class= "tic" id= "5"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "6"></div></div><div class= "col-md-4"><div class= "tic" id= "7"></div></div><div class= "col-md-4"><div class= "tic" id= "8"></div></div></div>');
							$("#line1").fadeIn(1000).removeClass(".line1").addClass(".line5");
							$("#line2").fadeIn(1000).removeClass(".line2").addClass(".line6");
							$("#line3").fadeIn(1000).removeClass(".line3").addClass(".line7");
							$("#line4").fadeIn(1000).removeClass(".line4").addClass(".line8");
							$("#reset").fadeIn(1000).removeClass(".reset").addClass(".reset1");
							var turn = sign;
							var bool = true;
							$(".tic").on('click', function(){
								var slot = $(this).attr('id');
								if(bool == false){
									turn = "O";
									bool = true;
								}
								else if(bool == true){
									turn = sign;
									bool = false;
								}
								if($("#" + slot + ":contains('X')").length == 0 && $("#" + slot + ":contains('O')").length == 0){
									$("#" + slot).text(turn).fadeIn(1000);
								}
								origBoard[slot] = turn;
								var plays = origBoard.reduce((a, e, i) => (e == turn) ? a.concat(i) : a, []);
								for(var i = 0; i<winConditions.length; i++){
									if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
										for(var j = 0; j<winConditions[i].length; j++){
											document.getElementById(winConditions[i][j]).style.color = (turn == "X") ? "blue" : "red";
											$(".tic").off('click');
											setTimeout(function(){
												$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
												$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
												$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
												$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
												$(".screen").fadeOut(1000, function(){
													$(this).remove();
													$(".game").append("<div class= 'screen'></div>");
													$(".screen").html();
													$(".screen").hide().html('<p id= "question" style= "font-size: 3em">Player ' + "'" + turn + "'"+ ' won</p>').fadeIn(1000);
												});
											}, 2000);
										}
									}
								}
								for(var i = 0; i<origBoard.length; i++){
									if(typeof origBoard[i] == 'number'){
										break;
									}
									else if(i == 8){
										$(".tic").off('click');
										setTimeout(function(){
											$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
											$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
											$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
											$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
											$(".screen").fadeOut(1000, function(){
												$(this).remove();
												$(".game").append("<div class= 'screen'></div>");
												$(".screen").html();
												$(".screen").hide().html('<p id= "question" style= "font-size: 3em">It' + "'" + 's' + ' a tie</p>').fadeIn(1000);
											});
										}, 2000);	
									}
								}
							});
						});
					}
					else if(sign == "O"){
						$(".screen").fadeOut(1000, function(){
							$(this).remove();
							$(".game").append("<div class= 'screen'></div>");
							$(".screen").html();
							$(".screen").prepend('<div class= "row"><div class= "col-md-4"><div class= "tic" id= "0"></div></div><div class= "col-md-4"><div class= "tic" id= "1"></div></div><div class= "col-md-4"><div class= "tic" id= "2"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "3"></div></div><div class= "col-md-4"><div class= "tic" id= "4"></div></div><div class= "col-md-4"><div class= "tic" id= "5"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "6"></div></div><div class= "col-md-4"><div class= "tic" id= "7"></div></div><div class= "col-md-4"><div class= "tic" id= "8"></div></div></div>');
							$("#line1").fadeIn(1000).removeClass(".line1").addClass(".line5");
							$("#line2").fadeIn(1000).removeClass(".line2").addClass(".line6");
							$("#line3").fadeIn(1000).removeClass(".line3").addClass(".line7");
							$("#line4").fadeIn(1000).removeClass(".line4").addClass(".line8");
							$("#reset").fadeIn(1000).removeClass(".reset").addClass(".reset1");
							var turn = sign;
							var bool = true;
							$(".tic").on('click', function(){
								var slot = $(this).attr('id');
								if(bool == false){
									turn = "X";
									bool = true;
								}
								else if(bool == true){
									turn = sign;
									bool = false;
								}
								if($("#" + slot + ":contains('X')").length == 0 && $("#" + slot + ":contains('O')").length == 0){
									$("#" + slot).text(turn).fadeIn(1000);
								}
								origBoard[slot] = turn;
								var plays = origBoard.reduce((a, e, i) => (e == turn) ? a.concat(i) : a, []);
								for(var i = 0; i<winConditions.length; i++){
									if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
										for(var j = 0; j<winConditions[i].length; j++){
											document.getElementById(winConditions[i][j]).style.color = (turn == "X") ? "blue" : "red";
											$(".tic").off('click');
											setTimeout(function(){
												$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
												$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
												$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
												$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
												$(".screen").fadeOut(1000, function(){
													$(this).remove();
													$(".game").append("<div class= 'screen'></div>");
													$(".screen").html();
													$(".screen").hide().html('<p id= "question" style= "font-size: 3em">Player ' + "'" + turn + "'"+ ' won</p>').fadeIn(1000);
												});
											}, 2000);
										}
									}
								}
								for(var i = 0; i<origBoard.length; i++){
									if(typeof origBoard[i] == 'number'){
										break;
									}
									else if(i == 8){
										$(".tic").off('click');
										setTimeout(function(){
											$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
											$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
											$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
											$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
											$(".screen").fadeOut(1000, function(){
												$(this).remove();
												$(".game").append("<div class= 'screen'></div>");
												$(".screen").html();
												$(".screen").hide().html('<p id= "question" style= "font-size: 3em">It' + "'" + 's' + ' a tie</p>').fadeIn(1000);
											});
										}, 2000);	
									}
								}
							});
						});
					}
				});
			});
		}
	});
	$(".reset").on('click', function(){
		var origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		$(this).fadeOut(1000).removeClass(".reset1").addClass(".reset");
		$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
		$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
		$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
		$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");
		$(".screen").fadeOut(1000, function(){
			$(this).remove();
			$(".game").append("<div class= 'screen'></div>");
			$(".screen").html();
			$(".screen").hide().html('<p id= "question" style= "font-size: 2em">How do you want to play?</p><p class= "player" id= "one" style= "font-size: 2em"><span>One Player<span></p><p class= "player" id= "two" style= "font-size: 2em"><span>Two Players<span></p>').fadeIn(1000);
			$(".player").on('click', function(){
				var player = $(this).attr('id');
				if(player == "one"){
					$(".screen").fadeOut(1000, function(){
						$(this).remove();
						$(".game").append("<div class= 'screen'></div>");
						$(".screen").hide().html('<p style= "font-size: 2em; padding-top: 100px">Would you like to be X or O?</p><p class = "sign" style= "font-size: 4em" id= "X"><span>X</span></p><p class = "sign" style= "font-size: 4em" id= "O"><span>O</span></p>').fadeIn(1000);
						$(".sign").on('click', function(){
							sign = $(this).attr('id');
							if(sign == "X"){
								$(".screen").fadeOut(1000, function(){
									$(this).remove();
									$(".game").append("<div class= 'screen'></div>");
									$(".screen").html();
									$(".screen").prepend('<div class= "row"><div class= "col-md-4"><div class= "tic" id= "0"></div></div><div class= "col-md-4"><div class= "tic" id= "1"></div></div><div class= "col-md-4"><div class= "tic" id= "2"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "3"></div></div><div class= "col-md-4"><div class= "tic" id= "4"></div></div><div class= "col-md-4"><div class= "tic" id= "5"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "6"></div></div><div class= "col-md-4"><div class= "tic" id= "7"></div></div><div class= "col-md-4"><div class= "tic" id= "8"></div></div></div>');
									$("#line1").fadeIn(1000).removeClass(".line1").addClass(".line5");
									$("#line2").fadeIn(1000).removeClass(".line2").addClass(".line6");
									$("#line3").fadeIn(1000).removeClass(".line3").addClass(".line7");
									$("#line4").fadeIn(1000).removeClass(".line4").addClass(".line8");
									$("#reset").fadeIn(1000).removeClass(".reset").addClass(".reset1");
									$(".tic").on('click', function(){
										var flag = false;
									 	ai = "O";
										var slot = $(this).attr('id');
										if($("#" + slot + ":contains('X')").length == 0 && $("#" + slot + ":contains('O')").length == 0){
											$("#" + slot).text(sign).fadeIn(1000);
										}
										origBoard[slot] = sign;
										var plays = origBoard.reduce((a, e, i) => (e == sign) ? a.concat(i) : a, []);
										for(var i = 0; i<winConditions.length; i++){
											if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
												for(var j = 0; j<winConditions[i].length; j++){
													document.getElementById(winConditions[i][j]).style.color = (sign == "X") ? "blue" : "red";
													$(".tic").off('click');
													setTimeout(function(){
														$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
														$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
														$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
														$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
														$(".screen").fadeOut(1000, function(){
															$(this).remove();
															$(".game").append("<div class= 'screen'></div>");
															$(".screen").html();
															$(".screen").hide().html('<p id= "question" style= "font-size: 3em">Player ' + "'" + sign + "'"+ ' won</p>').fadeIn(1000);
														});
													}, 2000);
												}
												flag = true;
											}
										}
										if(flag == false){
											var aislot = minimax(origBoard, ai).index;
											setTimeout(function(){
												$("#" + aislot).text(ai).fadeIn(1000);
												origBoard[aislot] = ai;
												var plays = origBoard.reduce((a, e, i) => (e == ai) ? a.concat(i) : a, []);
												for(var i = 0; i<winConditions.length; i++){
													if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
														for(var j = 0; j<winConditions[i].length; j++){
															document.getElementById(winConditions[i][j]).style.color = (ai == "O") ? "red" : "blue";
															$(".tic").off('click');
															setTimeout(function(){
																$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
																$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
																$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
																$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
																$(".screen").fadeOut(1000, function(){
																	$(this).remove();
																	$(".game").append("<div class= 'screen'></div>");
																	$(".screen").html();
																	$(".screen").hide().html('<p id= "question" style= "font-size: 3em">Player ' + "'" + ai + "'"+ ' won</p>').fadeIn(1000);
																});
															}, 2000);
														}
													}
												}
											}, 1000);
										}
										for(var i = 0; i<origBoard.length; i++){
											if(typeof origBoard[i] == 'number'){
												break;
											}
											else if(i == 8){
												$(".tic").off('click');
												setTimeout(function(){
													$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
													$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
													$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
													$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
													$(".screen").fadeOut(1000, function(){
														$(this).remove();
														$(".game").append("<div class= 'screen'></div>");
														$(".screen").html();
														$(".screen").hide().html('<p id= "question" style= "font-size: 3em">It' + "'" + 's' + ' a tie</p>').fadeIn(1000);
													});
												}, 2000);	
											}
										}
									});
								});
							}
							else if(sign == "O"){
								$(".screen").fadeOut(1000, function(){
									$(this).remove();
									$(".game").append("<div class= 'screen'></div>");
									$(".screen").html();
									$(".screen").prepend('<div class= "row"><div class= "col-md-4"><div class= "tic" id= "0"></div></div><div class= "col-md-4"><div class= "tic" id= "1"></div></div><div class= "col-md-4"><div class= "tic" id= "2"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "3"></div></div><div class= "col-md-4"><div class= "tic" id= "4"></div></div><div class= "col-md-4"><div class= "tic" id= "5"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "6"></div></div><div class= "col-md-4"><div class= "tic" id= "7"></div></div><div class= "col-md-4"><div class= "tic" id= "8"></div></div></div>');
									$("#line1").fadeIn(1000).removeClass(".line1").addClass(".line5");
									$("#line2").fadeIn(1000).removeClass(".line2").addClass(".line6");
									$("#line3").fadeIn(1000).removeClass(".line3").addClass(".line7");
									$("#line4").fadeIn(1000).removeClass(".line4").addClass(".line8");
									$("#reset").fadeIn(1000).removeClass(".reset").addClass(".reset1");
									$(".tic").on('click', function(){
										var flag = false;
										ai = "X";
										var slot = $(this).attr('id');
										if($("#" + slot + ":contains('X')").length == 0 && $("#" + slot + ":contains('O')").length == 0){
											$("#" + slot).text(sign).fadeIn(1000);
										}
										origBoard[slot] = sign;
										var plays = origBoard.reduce((a, e, i) => (e == sign) ? a.concat(i) : a, []);
										for(var i = 0; i<winConditions.length; i++){
											if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
												for(var j = 0; j<winConditions[i].length; j++){
													document.getElementById(winConditions[i][j]).style.color = (sign == "O") ? "red" : "blue";
													$(".tic").off('click');
													setTimeout(function(){
														$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
														$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
														$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
														$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
														$(".screen").fadeOut(1000, function(){
															$(this).remove();
															$(".game").append("<div class= 'screen'></div>");
															$(".screen").html();
															$(".screen").hide().html('<p id= "question" style= "font-size: 3em">Player ' + "'" + sign + "'"+ ' won</p>').fadeIn(1000);
														});
													}, 2000);
												}
												flag = true;
											}
										}
										if(flag == false){
											var aislot = minimax(origBoard, ai).index;
											setTimeout(function(){
												$("#" + aislot).text(ai).fadeIn(1000);
												origBoard[aislot] = ai;
												var plays = origBoard.reduce((a, e, i) => (e == ai) ? a.concat(i) : a, []);
												for(var i = 0; i<winConditions.length; i++){
													if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
														for(var j = 0; j<winConditions[i].length; j++){
															document.getElementById(winConditions[i][j]).style.color = (ai == "X") ? "blue" : "red";
															$(".tic").off('click');
															setTimeout(function(){
																$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
																$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
																$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
																$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
																$(".screen").fadeOut(1000, function(){
																	$(this).remove();
																	$(".game").append("<div class= 'screen'></div>");
																	$(".screen").html();
																	$(".screen").hide().html('<p id= "question" style= "font-size: 3em">Player ' + "'" + ai + "'"+ ' won</p>').fadeIn(1000);
																});
															}, 2000);
														}
													}
												}
											}, 1000);
										}
										for(var i = 0; i<origBoard.length; i++){
											if(typeof origBoard[i] == 'number'){
												break;
											}
											else if(i == 8){
												$(".tic").off('click');
												setTimeout(function(){
													$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
													$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
													$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
													$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
													$(".screen").fadeOut(1000, function(){
														$(this).remove();
														$(".game").append("<div class= 'screen'></div>");
														$(".screen").html();
														$(".screen").hide().html('<p id= "question" style= "font-size: 3em">It' + "'" + 's' + ' a tie</p>').fadeIn(1000);
													});
												}, 2000);	
											}
										}
									});
								});
							}
						});
					});
				}
				else if(player == "two"){
					$(".screen").fadeOut(1000, function(){
						$(this).remove();
						$(".game").append("<div class= 'screen'></div>");
						$(".screen").hide().html('<p style= "font-size: 2em; padding-top: 100px">Would Player 1 like to be X or O?</p><p class = "sign" style= "font-size: 4em" id= "X"><span>X</span></p><p class = "sign" style= "font-size: 4em" id= "O"><span>O</span></p>').fadeIn(1000);
						$(".sign").on('click', function(){
							sign = $(this).attr('id');
							if(sign == "X"){
								$(".screen").fadeOut(1000, function(){
									$(this).remove();
									$(".game").append("<div class= 'screen'></div>");
									$(".screen").html();
									$(".screen").prepend('<div class= "row"><div class= "col-md-4"><div class= "tic" id= "0"></div></div><div class= "col-md-4"><div class= "tic" id= "1"></div></div><div class= "col-md-4"><div class= "tic" id= "2"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "3"></div></div><div class= "col-md-4"><div class= "tic" id= "4"></div></div><div class= "col-md-4"><div class= "tic" id= "5"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "6"></div></div><div class= "col-md-4"><div class= "tic" id= "7"></div></div><div class= "col-md-4"><div class= "tic" id= "8"></div></div></div>');
									$("#line1").fadeIn(1000).removeClass(".line1").addClass(".line5");
									$("#line2").fadeIn(1000).removeClass(".line2").addClass(".line6");
									$("#line3").fadeIn(1000).removeClass(".line3").addClass(".line7");
									$("#line4").fadeIn(1000).removeClass(".line4").addClass(".line8");
									$("#reset").fadeIn(1000).removeClass(".reset").addClass(".reset1");
									var turn = sign;
									var bool = true;
									$(".tic").on('click', function(){
										var slot = $(this).attr('id');
										if(bool == false){
											turn = "O";
											bool = true;
										}
										else if(bool == true){
											turn = sign;
											bool = false;
										}
										if($("#" + slot + ":contains('X')").length == 0 && $("#" + slot + ":contains('O')").length == 0){
											$("#" + slot).text(turn).fadeIn(1000);
										}
										origBoard[slot] = turn;
										var plays = origBoard.reduce((a, e, i) => (e == turn) ? a.concat(i) : a, []);										
										for(var i = 0; i<winConditions.length; i++){
											if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
												for(var j = 0; j<winConditions[i].length; j++){
													document.getElementById(winConditions[i][j]).style.color = (turn == "X") ? "blue" : "red";
													$(".tic").off('click');
													setTimeout(function(){
														$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
														$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
														$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
														$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
														$(".screen").fadeOut(1000, function(){
															$(this).remove();
															$(".game").append("<div class= 'screen'></div>");
															$(".screen").html();
															$(".screen").hide().html('<p id= "question" style= "font-size: 3em">Player ' + "'" + turn + "'"+ ' won</p>').fadeIn(1000);
														});
													}, 2000);
												}
											}
										}
										for(var i = 0; i<origBoard.length; i++){
											if(typeof origBoard[i] == 'number'){
												break;
											}
											else if(i == 8){
												$(".tic").off('click');
												setTimeout(function(){
													$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
													$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
													$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
													$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
													$(".screen").fadeOut(1000, function(){
														$(this).remove();
														$(".game").append("<div class= 'screen'></div>");
														$(".screen").html();
														$(".screen").hide().html('<p id= "question" style= "font-size: 3em">It' + "'" + 's' + ' a tie</p>').fadeIn(1000);
													});
												}, 2000);	
											}
										}
									});
								});
							}
							else if(sign == "O"){
								$(".screen").fadeOut(1000, function(){
									$(this).remove();
									$(".game").append("<div class= 'screen'></div>");
									$(".screen").html();
									$(".screen").prepend('<div class= "row"><div class= "col-md-4"><div class= "tic" id= "0"></div></div><div class= "col-md-4"><div class= "tic" id= "1"></div></div><div class= "col-md-4"><div class= "tic" id= "2"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "3"></div></div><div class= "col-md-4"><div class= "tic" id= "4"></div></div><div class= "col-md-4"><div class= "tic" id= "5"></div></div></div><div class= "row"><div class= "col-md-4"><div class= "tic" id= "6"></div></div><div class= "col-md-4"><div class= "tic" id= "7"></div></div><div class= "col-md-4"><div class= "tic" id= "8"></div></div></div>');
									$("#line1").fadeIn(1000).removeClass(".line1").addClass(".line5");
									$("#line2").fadeIn(1000).removeClass(".line2").addClass(".line6");
									$("#line3").fadeIn(1000).removeClass(".line3").addClass(".line7");
									$("#line4").fadeIn(1000).removeClass(".line4").addClass(".line8")
									$("#reset").fadeIn(1000).removeClass(".reset").addClass(".reset1");
									var turn = sign;
									var bool = true;
									$(".tic").on('click', function(){
										var slot = $(this).attr('id');
										if(bool == false){
											turn = "X";
											bool = true;
										}
										else if(bool == true){
											turn = sign;
											bool = false;
										}
										if($("#" + slot + ":contains('X')").length == 0 && $("#" + slot + ":contains('O')").length == 0){
											$("#" + slot).text(turn).fadeIn(1000);
										}
										origBoard[slot] = turn;
										var plays = origBoard.reduce((a, e, i) => (e == turn) ? a.concat(i) : a, []);
										for(var i = 0; i<winConditions.length; i++){
											if(winConditions[i].every(elem => plays.indexOf(elem) > -1)){
												for(var j = 0; j<winConditions[i].length; j++){
													document.getElementById(winConditions[i][j]).style.color = (turn == "X") ? "blue" : "red";
													$(".tic").off('click');
													setTimeout(function(){
														$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
														$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
														$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
														$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
														$(".screen").fadeOut(1000, function(){
															$(this).remove();
															$(".game").append("<div class= 'screen'></div>");
															$(".screen").html();
															$(".screen").hide().html('<p id= "question" style= "font-size: 3em">Player ' + "'" + turn + "'"+ ' won</p>').fadeIn(1000);
														});
													}, 2000);
												}
											}
										}
										for(var i = 0; i<origBoard.length; i++){
											if(typeof origBoard[i] == 'number'){
												break;
											}
											else if(i == 8){
												$(".tic").off('click');
												setTimeout(function(){
													$("#line1").fadeOut(1000).removeClass(".line5").addClass(".line1");
													$("#line2").fadeOut(1000).removeClass(".line6").addClass(".line2");
													$("#line3").fadeOut(1000).removeClass(".line7").addClass(".line3");
													$("#line4").fadeOut(1000).removeClass(".line8").addClass(".line4");	
													$(".screen").fadeOut(1000, function(){
														$(this).remove();
														$(".game").append("<div class= 'screen'></div>");
														$(".screen").html();
														$(".screen").hide().html('<p id= "question" style= "font-size: 3em">It' + "'" + 's' + ' a tie</p>').fadeIn(1000);
													});
												}, 2000);	
											}
										}
									});
								});
							}
						});
					});
				}
			});
		});
	});
	function minimax(newBoard, player){
		var availSpots = newBoard.filter(s => typeof s == 'number');
		if(sign == 'O' && ai == 'X'){
			var plays1 = newBoard.reduce((a, e, i) => (e == sign) ? a.concat(i) : a, []);
			for(var i = 0; i<winConditions.length; i++){
				if(winConditions[i].every(elem => plays1.indexOf(elem) > -1)){
					return {score: -10};
				}
			}
			var plays2 = newBoard.reduce((a, e, i) => (e == ai) ? a.concat(i) : a, []);
			for(var i = 0; i<winConditions.length; i++){
				if(winConditions[i].every(elem => plays2.indexOf(elem) > -1)){
					return {score: 10};
				}
			}
			if(availSpots.length == 0){
				return {score: 0};
			}
			var moves = [];
			for(var i = 0; i<availSpots.length; i++){
				var move = {};
				move.index = newBoard[availSpots[i]];
				newBoard[availSpots[i]] = player;
				if(player == ai){
					var result = minimax(newBoard, sign);
					console.log(result);
					move.score = result.score;
				}
				else{
					var result = minimax(newBoard, ai);
					console.log(result);
					move.score = result.score;
				}
				newBoard[availSpots[i]] = move.index;
				moves.push(move);
			}
			var bestMove;
			if(player == ai){
				var bestScore = -10000;
				for(var i = 0; i<moves.length; i++){
					if(moves[i].score > bestScore){
						bestScore = moves[i].score;
						bestMove = i;
					}
				}
			}
			else{
				var bestScore = 10000;
				for(var i = 0; i<moves.length; i++){
					if(moves[i].score < bestScore){
						bestScore = moves[i].score;
						bestMove = i;
					}
				}
			}
			return moves[bestMove];
		}
		else if(sign == 'X' && ai == 'O'){
			var plays3 = newBoard.reduce((a, e, i) => (e == sign) ? a.concat(i) : a, []);
			for(var i = 0; i<winConditions.length; i++){
				if(winConditions[i].every(elem => plays3.indexOf(elem) > -1)){
					return {score: -10};
				}
			}
			var plays4 = newBoard.reduce((a, e, i) => (e == ai) ? a.concat(i) : a, []);
			for(var i = 0; i<winConditions.length; i++){
				if(winConditions[i].every(elem => plays4.indexOf(elem) > -1)){
					return {score: 10};
				}
			}
			if(availSpots.length == 0){
				return {score: 0};
			}
			var moves = [];
			for(var i = 0; i<availSpots.length; i++){
				var move = {};
				move.index = newBoard[availSpots[i]];
				newBoard[availSpots[i]] = player;
				if(player == ai){
					var result = minimax(newBoard, sign);
					move.score = result.score;
				}
				else{
					var result = minimax(newBoard, ai);
					move.score = result.score;
				}

				newBoard[availSpots[i]] = move.index;
				moves.push(move);
			}
			var bestMove;
			if(player == ai){
				var bestScore = -10000;
				for(var i = 0;i<moves.length;i++){
					if(moves[i].score > bestScore){
						bestScore = moves[i].score;
						bestMove = i;
					}
				}
			}
			else{
				var bestScore = 10000;
				for(var i = 0;i<moves.length;i++){
					if(moves[i].score < bestScore){
						bestScore = moves[i].score;
						bestMove = i;
					}
				}
			}
			return moves[bestMove];
		}
	}
});