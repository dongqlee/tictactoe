//사용자입력을 받아서 유효성, 로직 검사

function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;
  //+'1'은 숫자 1로 인식 
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = 'none';
  backdropElement.style.display = 'none';
  formElement.firstElementChild.classList.remove('error');
  errorsOutputElement.textContent ='';
  formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get('playername').trim(); //글 양쪽 공백 제거

  if(!enteredPlayername) {  // enteredPlayername === '' 과 동일
    event.target.firstElementChild.classList.add('error');
    errorsOutputElement.textContent = 'Please enter a valid name'
    return;
  }
  
  const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  // if(editedPlayer === 1) {
  //   players[0].name = enteredPlayername;
  // } else {
  //   players[1].name = enteredPlayername;
  // }
  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
}