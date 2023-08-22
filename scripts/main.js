// Grab a couple of things
const section = document.querySelector('section');
const playerMovesCount = document.querySelector('span');
let playerMoves = 20;

// Link text 
playerMovesCount.textContent = playerMoves;

// Generate the data
const getData = () => [
  { imgSrc: './images/elephant_redcharlie-redcharlie1-Y--zr3CPaPs-unsplash.jpg', name: 'elephant' },
  { imgSrc: './images/horse_waldemar-iHdzCFJG1j4-unsplash.jpg', name: 'horse' },
  { imgSrc: './images/koala_daniel-norris-Q_8-ZXGDxbU-unsplash.jpg', name: 'koala' },
  { imgSrc: './images/lion_francesco-uDrs_Def4vA-unsplash.jpg', name: 'lion' },
  { imgSrc: './images/monkey_su-fu-N-6mnzmVljA-unsplash.jpg', name: 'monkey' },
  { imgSrc: './images/wolf_marc-olivier-jodoin-tauPAnOIGvE-unsplash.jpg', name: 'wolf' },
  { imgSrc: './images/giraffe_saad-khan-kW0ZHLLFSbk-unsplash.jpg', name: 'giraffe' },
  { imgSrc: './images/panda_kerry-hu-qgpLJ1T8KeA-unsplash.jpg', name: 'panda' },
  { imgSrc: './images/elephant_redcharlie-redcharlie1-Y--zr3CPaPs-unsplash.jpg', name: 'elephant' },
  { imgSrc: './images/horse_waldemar-iHdzCFJG1j4-unsplash.jpg', name: 'horse' },
  { imgSrc: './images/koala_daniel-norris-Q_8-ZXGDxbU-unsplash.jpg', name: 'koala' },
  { imgSrc: './images/lion_francesco-uDrs_Def4vA-unsplash.jpg', name: 'lion' },
  { imgSrc: './images/monkey_su-fu-N-6mnzmVljA-unsplash.jpg', name: 'monkey' },
  { imgSrc: './images/wolf_marc-olivier-jodoin-tauPAnOIGvE-unsplash.jpg', name: 'wolf' },
  { imgSrc: './images/giraffe_saad-khan-kW0ZHLLFSbk-unsplash.jpg', name: 'giraffe' },
  { imgSrc: './images/panda_kerry-hu-qgpLJ1T8KeA-unsplash.jpg', name: 'panda' },
]

// Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
}

// Card generator function
const cardGenerator = () => {
  const cardData = randomize();

  //Generate the HTML

  cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    // Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    // Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      checkCards(e);
    })
  })
}

// Check cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');  
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');
  // Logic
  if(flippedCards.length === 2) {
    if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
      console.log('match');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none'; 
      })
    } else {
      console.log('wrong')
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);
        playerMoves--;
        playerMovesCount.textContent = playerMoves;
        if(playerMoves === 0) {
          restart('You lost! Try again!');
        }
      })
    }
  }
  // Run a check to see if we won the game
  if (toggleCard.length === 16) {
    setTimeout(() => {
      restart('Congratulations! You won!');
    }, 1000)
  }
}

// Restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');
    // Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);  
      section.style.pointerEvents = 'all';
    }, 1000)
  });
  playerMoves = 20;
  playerMovesCount.textContent = playerMoves;
  setTimeout(() => window.alert(text), 100);
}

cardGenerator();