function resetGameStatus() {
  activePlayer = 0; //초기값
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = 
  'You Won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = 'none';

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = '';
      gameBoardItemElement.classList.remove('disabled');
      gameBoardElement.children[gameBoardIndex]
      gameBoardIndex++;
    }
  } 
}

function startNewGame() {
  if (players[0].name === '' || players[1].name ==='') {
    alert('Please set custon player names for both players!');
    return;
  } 

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = 'block';
}

//논리적인 위치
function checkForGameOver() {
  // if(gameData[0][0] === 1 && gameData[0][1] === 1 && gameData[0][2] === 1) // 불필요한 코드가 많아짐.  
  //개선사항 1. 
  /*
  if(gameData[0][0]> 0 && 
    gameData[0][0] === gameData[0][1] && 
    gameData[0][1] === gameData[0][2]) {
    return gameData[0][0]; 
  }
  if(gameData[1][0]> 0 && 
    gameData[1][0] === gameData[1][1] && 
    gameData[1][1] === gameData[1][2]) {
    return gameData[1][0]; 
  }
  if(gameData[2][0]> 0 && 
    gameData[2][0] === gameData[2][1] && 
    gameData[2][1] === gameData[2][2]) {
    return gameData[2][0]; 
  }
  */
  //개선사항 2. 반복문으로 변경해서 줄이기
  //checking the rows for equality
  for (let i = 0; i < 3; i++) {
    if(gameData[i][0]> 0 && 
      gameData[i][0] === gameData[i][1] && 
      gameData[i][1] === gameData[i][2]) {
      return gameData[i][0]; //조건 만족하는 저장된 아이디 반환
    }
  }
  //정확하게 하기 
  //첫번째행 모든 항목을 
  //두 세번째 열 모든 행 확인
  //checking the columns for the equality 
  for (let i = 0; i < 3; i++) {
    if(gameData[0][i]> 0 && 
      gameData[0][i] === gameData[1][i] && 
      gameData[0][i] === gameData[2][i]) {
      return gameData[0][i]; //조건 만족하는 저장된 아이디 반환
    }
  }
  //Diagonal : Top left to Bottom right
  if(
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] && 
    gameData[1][1] === gameData[2][2]
    ) {
      return gameData[0][0];
    }
    //Diagonal : Bottom left to top right
  if(
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] && 
    gameData[1][1] === gameData[0][0]
    ) {
      return gameData[0][0];
    }  
    //게임 라운드 
    if(currentRound === 9) {
      return -1; //무승부
    }
    return 0; // 승부가 가려지지 않음
}

function switchPlayer() {
  if(activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if(event.target.tagName !== 'LI' || gameIsOver) {
    return;
  }
  //gameIsOver 넣어서 승패 결정 후 종료

  //선택 배열
  const selectedField = event.target;
  const selectedRow = selectedField.dataset.row - 1;
  const selectedColumn = selectedField.dataset.col -1;
  //선택 필드 

  if(gameData[selectedRow][selectedColumn] > 0) {
    alert('Please select an empty field');
    return;
  } // 이미 선점한 곳 선택 제한

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add('disabled');

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver(); //승자 확인

  if(winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function endGame(winnerId) {
  gameIsOver = ture;
  gameOverElement.style.display = 'block';
  if(winnerId > 0) {
    const winnerName = players[winnerId -1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = 'it\'s a draw!'
  }
 
}