var field = [],
    whoStart;
    fieldCounter = 1;
    field[0] = document.getElementById('sheet'); 
	field[0].innerHTML = '<button type="button" onmouseover = "ChangeSize(this)"  onmouseout = "ReturnSize(this)" onclick="Start(AI,0)" id="AI"> Начинает компьютер </button></br><button id="HU" onmouseover = "ChangeSize(this)"  onmouseout = "ReturnSize(this)" onclick="Start(HU,0)"> Начинает игрок </button>';
    
	var AI_win = 0;
	var HU_win = 0;
	var DRAW = 0;
    var AI = 'AI';
    var HU = 'HU';

    var checkFld = new Array(10);
    for (var i = 1; i < 10; i++) {
        checkFld[i] = { val: undefined, mark: undefined };
    }

function ChangeSize(element){
	element.style.fontSize = '50px';	
}

function ReturnSize(element){
	element.style.fontSize = '40px';	
} 

function rand(limit) {
    var res;
    do{
        res = Math.floor((Math.random()*150)+50);
    }while(res%20)
    return res;
}

function RandCornerOrCenter() {
    var move;
    do {
        move = Math.floor((Math.random() * 9) + 1);
    } while (move % 2 == 0);
    return move;
}

function OppositeCorner(index) {
    if (index % 2) {
        switch (index) {
            case 1:
                index = 9;
                break;
            case 3:
                index = 7;
                break;
            case 7:
                index = 3;
                break;
            case 9:
                index = 1;
                break;                
        }
    }
    else {
        switch (index) {
            case 2:
                index = 1;
                break;
            case 4:
                index = 7;
                break;
            case 6:
                index = 3;
                break;
            case 8:
                index = 9;
                break;
        }

    }
    return index;
}

function VictoryCheck(fld) {
    for (var i = 1, x = 2; i < 10; i += 3, x*=2) {
        if (fld[i].mark == fld[i + 1].mark && fld[i + 1].mark == fld[i + 2].mark && fld[i].mark != undefined)	 // �������������� ��������
			if (i > 1)
				return fld[x];
			else
				return fld[i];
    }

    for (var i = 1 ; i <= 3; i++) {
        if (fld[i].mark == fld[i + 3].mark && fld[i + 3].mark == fld[i + 6].mark && fld[i].mark != undefined)	 // ������������ ��������
			if (i == 1)
				return fld[7];
			else
				return fld[i];
    }

    if (fld[1].mark == fld[5].mark && fld[5].mark == fld[9].mark && fld[5].mark != undefined)	    // ������������ ��������
		return fld[9];
		
    if (fld[3].mark == fld[5].mark && fld[5].mark == fld[7].mark && fld[5].mark != undefined)	    // ������������ ��������
	    return fld[5];

    for (var i = 1 ; i < 10; i++) {
        if (fld[i].mark == undefined)	 // �������� �� ������� ������ �����
            return fld[i];
    }
    return 0;
}

field.drawMark = function (index) { 
    for (var i = 1; i < field[index].length ; ++i) {
        if (field[index][i].mark == "X") {
            if (field[index][i].player == "AI")
                document.getElementById("cell" + index + ' ' + i).style.backgroundImage = 'url("images/k_r.svg")';
            else
                document.getElementById("cell" + index + ' ' + i).style.backgroundImage = 'url("images/k_b.svg")';
        }
        else if (field[index][i].mark == "O") {
            if (field[index][i].player == "AI")
                document.getElementById("cell" + index + ' ' + i).style.backgroundImage = 'url("images/c_r.svg")';
            else
                document.getElementById("cell" + index + ' '+ i).style.backgroundImage = 'url("images/c_b.svg")';
        }
    }
}

field.createField = function (index) {
		field[index] = [];		
		var newField = document.createElement('DIV');
		var att = document.createAttribute('id');
		att.value = 'field' + fieldCounter;
		newField.setAttributeNode(att);
		
		field[0].appendChild(newField);
		
		var newFieldProperties = 

        field[index].createGrid = function () {
            this[0] = 0;
			var cellCreationText="";
            for (var i = 1; i < 10; i++) {
                this[i] = { id: i, player: undefined, mark: undefined };
            }
            var X = 0, Y = 0, coordDelta = 80;
            for (var i = 1; i < this.length; i++) {
                cellCreationText += '<div id="cell' + index + ' ' + i + '"></div>';
            }
            cellCreationText += "</div>";
            newField.innerHTML = cellCreationText;
            for (var i = 1; i < this.length ; ++i) {
                var cell = document.getElementById("cell" + index + ' ' + i);
                cell.style.top = Y + "px";
                cell.style.left = X + "px";
                cell.onclick = function () {
                    var name = this.id;
                    var arr = name.split(' ');
                    var x = arr[1];
                    if (field[fieldCounter][x].player == undefined) {
                        field[fieldCounter][x].player = "HU";
						Start('HU', 1);
                    }                      // ��� ������� ������ �-�� Start
                }; 
                X += coordDelta;
                if (i % 3 == 0) {
                    X = 0;
                    Y += coordDelta;
                }
            }
        };
        field[index].createGrid();
        var element = document.getElementById("field" + index);
        if (index % 2) {
            element.style.top = (index - 1) * 200 + rand(20) + "px";
            element.style.left = 0 + rand(20) + "px"
        }
        else {
            element.style.top = (index - 2) * 200 + rand(20) + "px";
            element.style.left = 600 + rand(20) + "px";
        }
        element.style.width = 240 + "px";
        element.style.height = 300 + "px"; 
        element.style.backgroundImage = 'url("images/grid.svg")';
        element.style.backgroundRepeat = "no-repeat";
}

function isAdjustmentCorner(cell, mark) {
    if (field[fieldCounter][cell].mark == mark || cell > 9 || cell < 1)
        alert("isAdjustmentCorner() - error");
    switch (cell) {
        case 1:
        case 9:
            if (field[fieldCounter][3].mark == mark || field[fieldCounter][7].mark == mark)
                return true;
            break;
        case 3:
        case 7:
            if (field[fieldCounter][1].mark == mark || field[fieldCounter][9].mark == mark)
                return true;
            break;
        default:
            return false;
            break;
    }
}

function isAdjustmentSide(cell, mark) {
    if (field[fieldCounter][cell].mark == mark || cell > 9 || cell < 1)
        alert("isAdjustmentSide() - error");
    switch (cell) {
        case 5:
            for (var i = 2; i < field[fieldCounter].length ; i += 2) {
                if (field[fieldCounter][i].mark == mark) {
                    return i;
                }
                else {
                    return 0;
                }
            }
            break;
        case 1: 
            if (field[fieldCounter][2].mark == mark)
                return 2;
            else if (field[fieldCounter][4].mark == mark)
                return 4;
            else
                return 0;
            break;
        case 3:
            if (field[fieldCounter][2].mark == mark)
                return 2;
            else if (field[fieldCounter][6].mark == mark)
                return 6;
            else
                return 0;
            break;
        case 7:
            if (field[fieldCounter][8].mark == mark)
                return 8;
            else if (field[fieldCounter][4].mark == mark)
                return 4;
            else
                return 0;
            break;
        case 9:
            if (field[fieldCounter][8].mark == mark)
                return 8;
            else if (field[fieldCounter][6].mark == mark)
                return 6;
            else
                return 0;
            break;
        default:
            return 0;
            break 
    }
}

function toAdjustmentCorner(cell, mark) {
    if (field[fieldCounter][cell].mark == mark || cell > 9 || cell < 1)
        alert("toAdjustmentCorner - error");
    switch (cell) {
        case 2:
            return 1;
            break;
        case 4:
            return 7;
            break;
        case 6: 
            return 3;
            break;
        case 8:
            return 9; 
            break;
        default:
            alert("toAdjustmentCorner - error" + cell);
            break
    }
}

function toOppositeCornerOfAdjustmentSide(cell, mark) {
    if (field[fieldCounter][cell].mark == mark || cell > 9 || cell < 1)
        alert("CornerStepOppToAdjSide  - error");
    switch (cell) {
        case 2:
            if (field[fieldCounter][1].mark == mark)
                return 7;
            else if (field[fieldCounter][3].mark == mark)
                return 9;
            break;
        case 4:
            if (field[fieldCounter][1].mark == mark)
                return 3;
            else if (field[fieldCounter][7].mark == mark)
                return 9;
            break;
        case 6:
            if (field[fieldCounter][3].mark == mark)
                return 1;
            else if (field[fieldCounter][9].mark == mark)
                return 7;
            break;
        case 8:
            if (field[fieldCounter][7].mark == mark)
                return 1;
            else if (field[fieldCounter][9].mark == mark)
                return 3;
            break
        default:
            break;
    }
    alert("CornerStepOppToAdjSide  - error" + cell);
}

function AI_Move(index) {
    var move;
    switch (field[index][0])	
    {
        case 1:                                                       // ��� 1 ���� �������� ����������� ������ ��� ������� ������          
                move =  RandCornerOrCenter();
                field[index][move].player = "AI";
                field[index][move].mark = "X";
                break;
        case 2:
            if (field[index][5].player == undefined) {					// 2 ��� ���� ����������� ������ �������� ����� � ���
                field[index][5].player = "AI";
                field[index][5].mark = "O";
            }
            else {                                                          // 2 ��� ���� ����������� ������ ������ ����� � ����
                do {
                    move = Math.floor((Math.random() * 9) + 1);
                } while (move % 2 == 0 || move == 5);
                field[index][move].player = "AI";
                field[index][move].mark = "O";
            }
            break;
        case 3:
            if (field[index][5].player == undefined) {					// 3 ��� ���� ����������� ������ �������� ��������� ��� �� ��� ���������� � ������� ����
                for (var i = 1; i < field[fieldCounter].length ; ++i) {
                    if (field[fieldCounter][i].mark == 'X') {
                        move = i;
                        break;
                    }
                }
                if (isAdjustmentCorner(move, 'O'))
                    move = OppositeCorner(move);                        // ��� � ��������������� ����
                else
                    move = 5;                                           // ��� � �����
                field[index][move].player = "AI";
                field[index][move].mark = "X";
            }
            else if (field[index][5].player == "HU")				    	// 3 ���  ���� ����������� ������ ������ ����������� ��������� ��� ��� ������� ���
            {
                for (var i = 1; i < field[index].length ; ++i) {
                    if (field[index][i].player == "AI") {
                        move = i;
                        break;
                    }
                }
                move = OppositeCorner(move);                                // ��� � ��������������� ����
                field[index][move].player = "AI";
                field[index][move].mark = "X";
            }
            else if (field[index][5].player == "AI")    			    	// 3 ���  ���� ����������� ������ ������ ����������� ��������� ��� ��� ������� ��� ����������
            {
                for (var i = 1; i < field[index].length ; ++i) {           // ��� � ��������������� ���� ��� ������� ����
                    if (field[index][i].player == "HU") {
                        move = OppositeCorner(i);
                        break;
					}
                }
             } 
                field[index][move].player = "AI";
                field[index][move].mark = "X";    
             break;
        case 4:
            CheckFieldCreation('O', 'AI')
            PrintCheckField();
	    	if (CheckIfHUWinInOneMove('X')) {
            	move = moveMaker('O');
            	field[index][move].player = "AI";
            	field[index][move].mark = "O";
	    	}
	    	else {
				do {
					move = Math.floor((Math.random() * 9) + 1);
				} while (field[index][move].mark != undefined) 
				field[index][move].player = "AI";
				field[index][move].mark = "O";
			}
            break;
        case 5:  
        	if (CheckFieldCreation('X', 'AI')) {
        		PrintCheckField();                 // �������� � ����� ����
                if (CheckIfHUWinInOneMove('O')) {
					move = moveMaker('X');
           	    	field[index][move].player = "AI";
          	    	field[index][move].mark = "X";
				}
				else {
	            	if (field[fieldCounter][5].mark == 'X') {
    	            	for (var i = 1; i < field[fieldCounter].length ; i += 2) {
        	            	if (i!=5 && field[fieldCounter][i].mark == 'X') {
            	            	move = isAdjustmentSide(i, 'O');
            	          		move = toOppositeCornerOfAdjustmentSide(move, 'X');
            	           		field[index][move].player = "AI";
			                	field[index][move].mark = "X";
                	        	break;
                    		}
               	 		}
           			}				
				}
        	}
			break;
        case 6:
            if (CheckFieldCreation('O', 'AI')) {
                PrintCheckField();
                move = moveMaker('O');
                field[index][move].player = "AI";
                field[index][move].mark = "O";
            }
            break;
        case 7:
            if (CheckFieldCreation('X', 'AI')) {
                PrintCheckField();
                move = moveMaker('X');
                field[index][move].player = "AI";
                field[index][move].mark = "X";
            }
            break;
        case 8:
            if (CheckFieldCreation('O', 'AI')) {
                PrintCheckField();
                move = moveMaker('O');
                field[index][move].player = "AI";
                field[index][move].mark = "O";
            }
            break;
        case 9:
            if (CheckFieldCreation('X', 'AI')) {
                PrintCheckField();
                move = moveMaker('X');
                field[index][move].player = "AI";
                field[index][move].mark = "X";
            }
            break;
    }
}

function CheckFieldCreation(marker, player) {
    var oppositeMarker;
    if (marker == 'X')
        oppositeMarker = 'O';
    else
        oppositeMarker = 'X';
    for (var i = 1; i < 10; i++) {
        if (field[fieldCounter][i].mark == undefined) {
            field[fieldCounter][i].mark = marker;
            checkFld[0] = VictoryCheck(field[fieldCounter]);
            if (checkFld[0].mark == marker) {
                move = i;
                field[fieldCounter][move].player = player;
                for (var j = 1; j < 10; j++) {
                    checkFld[j].val = undefined;
                    checkFld[j].mark = undefined;
                }
                return false;
                break;
            }
            checkFld[0] = null;
            checkFld[i] = Recurcia(field[fieldCounter], oppositeMarker, 1);
            field[fieldCounter][i].mark = undefined;
        }
    }
    return true;
}

function Recurcia(fld, marker, counter) {
        var tempField = Array(10)

        for (var i = 1; i < 10; i++) {
            tempField[i] = { id: undefined, player: undefined, mark: undefined };
            tempField[i].id = fld[i].id;
            tempField[i].mark = fld[i].mark;
            tempField[i].player = fld[i].player;
        }
        var tempCounter = { val: undefined, mark: undefined };
        var result;
        var oppositeMarker;
        var minPath = { val: undefined, mark: undefined };

        tempCounter.val = counter;

        if (marker == 'X')
            oppositeMarker = 'O';
        else
            oppositeMarker = 'X';

        result = VictoryCheck(tempField);
        if (result) {
            if (result.mark != undefined) {
                tempCounter.val = counter - 1;
                tempCounter.mark = result.mark;
                return tempCounter;
            }
        }
        else {
            tempCounter.val = counter - 1;
            tempCounter.mark = "DRAW";
            return tempCounter;
        }


        for (var i = 1 ; i < 10; i++) {
            if (tempField[i].mark == undefined) {	 // �������� �� ������� ������ ����� � ��� � ���������
                tempField[i].mark = marker;
                result = VictoryCheck(tempField);
                if (result) {
                    if (result.mark == undefined) {
                        tempCounter = Recurcia(tempField, oppositeMarker, tempCounter.val + 1);
                        if (minPath.val == undefined || minPath.val > tempCounter.val) {
                            minPath.val = tempCounter.val;
                            minPath.mark = tempCounter.mark;
                        }
                        tempField[i].mark = undefined;
                    }
                    else {
                        tempCounter.val = counter;
                        tempCounter.mark = result.mark;
                        return tempCounter;
                    }
                }
                else {
                    tempCounter.val = counter;
                    tempCounter.mark = "DRAW";
                    return tempCounter;
                }
            }
        }
        return minPath;
    }

function PrintCheckField() {
   var text = "";
    for (var i = 1 ; i < 10; i++) {
        if (field[fieldCounter][i].mark != undefined) {
            checkFld[i].mark = "_";
            checkFld[i].val = "_";
        }
    }

       for (var i = 1 ; i < 10; i++) {
        if (i == 4 || i == 7)
            text += "\n\n";
        text += checkFld[i].mark + "_" + checkFld[i].val + "   ";

    }

 //   draft.innerHTML =  "<pre>" + text + "<\pre>" ;

}

function moveMaker(marker) {
    var nearestWin = { val: 10, number: undefined };
    var latestLoss = { val: 0, number: undefined };
    var draw = { val: 10, number: undefined };
    var oppositeMarker;

    if (marker == 'X')
        oppositeMarker = 'O';
    else
        oppositeMarker = 'X';

    for (var i = 1; i < 10; i++) {
        if (checkFld[i].mark == oppositeMarker && checkFld[i].val > latestLoss.val) {
            latestLoss.val = checkFld[i].val;
            latestLoss.number = i;
        }
        if (checkFld[i].mark == marker && checkFld[i].val < nearestWin.val) {
            nearestWin.val = checkFld[i].val;
            nearestWin.number = i;
        }
        if (checkFld[i].mark == 'DRAW') {
            draw.val = checkFld[i].val;
            draw.number = i;
        }
    }

    if (nearestWin.val == 10) {
        if (draw.val == 10) {
            return latestLoss.number;
            alert("latestLoss = " + latestLoss.number);
        }
        else
            return draw.number;
    }
    else
        return nearestWin.number;

}

function CheckIfHUWinInOneMove(marker) {
    for (var i = 1; i < 10; i++) {
        if (checkFld[i].mark == marker && checkFld[i].val == 1) {
			return true;
        }
    }
    return false;
}

function Start(firstStep, moveNumber) {
    var setEnd;
    if (!moveNumber) {
        if (fieldCounter == 1) 
            field[0].innerHTML = "";
        whoStart = firstStep;
        document.getElementById('RESTART').style.display = 'initial';
        field.createField(fieldCounter);
        }

        if (firstStep == "AI") {                    // �������� ��� �����. ���� ���������, �� ��������� �������  AI_Move
                field[fieldCounter][0]++;       // ���������� �������� ����
                AI_Move(fieldCounter);
                setTimeout(function () { field.drawMark(fieldCounter); }, 500); 
            }
        else if (firstStep == "HU" && moveNumber) {
                field[fieldCounter][0]++;      		// ���������� �������� ����
										           //������ ��� � ��������� ��� ����������.
                for (var i = 1; i < field[fieldCounter].length ; ++i) { 
                    if (field[fieldCounter][i].player == "HU" && field[fieldCounter][i].mark == undefined) { 
                        if (whoStart == "AI") {
                            field[fieldCounter][i].mark = 'O';
                        }
                        else if (whoStart == "HU") {
                            field[fieldCounter][i].mark = 'X';
                        }
                        break;
                    }
                }
				
				field.drawMark(fieldCounter);
				
				if (field[fieldCounter][0] > 4) {
				    checkFld[0] = VictoryCheck(field[fieldCounter]);
				    if (EndGameSet('HU'))
				        return true;
				}
				
                

                field[fieldCounter][0]++;
				AI_Move(fieldCounter); 
                setTimeout(function () { field.drawMark(fieldCounter); }, 500);                
				
				if (field[fieldCounter][0] > 4)
			    	if (EndGameSet('AI'))
				        return true;
        }
}

function EndGameSet(player) {
    if (checkFld[0] && checkFld[0].player == player) {
        for (var i = 1; i < 10; ++i) {
            document.getElementById("cell" + fieldCounter + ' ' + i).onclick = function () { }
        }
        field.drawMark(fieldCounter);
        DrawEndGameText(player);
        DrawEndGameLine(player);     
        

        if (whoStart == 'AI')
            whoStart = 'HU';
        else
            whoStart = 'AI';

        fieldCounter++;
        checkFld[0] = null;
        Start(whoStart, 0);
        return true;
    }
    else if (field[fieldCounter][0] >= 9) {
        field.drawMark(fieldCounter);
        DrawEndGameText('DRAW');
    
        if (whoStart == 'AI')
            whoStart = 'HU';
        else
            whoStart = 'AI';

        fieldCounter++;
        checkFld[0] = null;
        Start(whoStart, 0);
        return true;
    }
    else
        return false;
}

function DrawEndGameText(player) {
    var text = player;
    var text1 = '.';
    var text2 = '.';
    var text3 = '.';
    var Div = document.createElement('DIV');

    switch (player) {
        case 'AI':
            text = "Победил компьютер.";
            AI_win++;
            break;
        case 'HU':
            text = "Поздравляю!\nВы победили.";
            HU_win++;
            break;
        case 'DRAW':
            text = "Ничья.";
            DRAW++;
            break;
    }

    Div.style.bottom = "30px";
    Div.style.left = "0px";
    Div.style.height = "15px";
    Div.style.width = "320px";
    Div.style.fontFamily = "cursive";
    Div.style.fontSize = "30px";
    Div.style.color = "rgb(32, 50, 184)";
    Div.innerText = text;
    document.getElementById('field' + fieldCounter).appendChild(Div);

    if (HU_win > 1)
        text1 = 'а.';
    if (AI_win > 1)
        text2 = 'а.';
    if (DRAW > 1)
        text3 = 'а.';
    
    document.getElementById('draft').innerHTML = '<pre>Игрок победил ' + HU_win + ' раз' + text1 + '\nКомпьютер победил ' + AI_win + ' раз' + text2 + '\nНичья ' + DRAW + ' раз' + text3 + '<\pre>';
}

function DrawEndGameLine(player) {
    if (player == "DRAW")
        return false;
    var svg = document.createElement("DIV");
    document.getElementById('field' + fieldCounter).appendChild(svg);
    var x1, x2, y1, y2, color;
    if (player == 'AI') {
        color = 'red';
    }
    else {
        color = 'green';
    }
    switch (checkFld[0].id) {
        case 1:
            x1 = 0;
            y1 = 40;
            x2 = 240;
            y2 = 40;
            break;
        case 2:
            x1 = 120;
            y1 = 0;
            x2 = 120;
            y2 = 240;
            break;
        case 3:
            x1 = 200;
            y1 = 0;
            x2 = 200;
            y2 = 240;
            break;
        case 4:
            x1 = 0;
            y1 = 120;
            x2 = 240;
            y2 = 120;
            break;
        case 5:
            x1 = 240;
            y1 = 0;
            x2 = 0;
            y2 = 240;
            break;
        case 7:
            x1 = 40;
            y1 = 0;
            x2 = 40;
            y2 = 240;
            break;
        case 8:
            x1 = 0;
            y1 = 200;
            x2 = 240;
            y2 = 200;
            break;
        case 9:
            x1 = 0;
            y1 = 0;
            x2 = 240;
            y2 = 240;
            break;
        default:
            alert("ERROR - Line");
            break;

    }
    svg.innerHTML = '<svg height="240" width="240"><line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" style="stroke:' + color + ';stroke-width:10" /></svg>';
}


function Restart() {
    location.reload();
    window.scrollTo(0, 0);
}