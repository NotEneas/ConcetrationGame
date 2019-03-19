const grid = document.querySelector('.js-grid');
const cards = grid.querySelectorAll('.card');

let state = {
	selectedCards: []
};

cards.forEach(card => {
	card.addEventListener('click', handleCardClick);
});

function handleCardClick(e) {
	const cardEl = e.currentTarget;
	// console.log('click', cardEl);

	// ignore if you clicke this card already
	if (cardEl.classList.contains('open')) return;
	// console.log('click', cardEl);

	// if not open it
	cardEl.classList.add('open');
	state.selectedCards.push(cardEl);

	if (state.selectedCards.length === 2) {
		console.log('match the cards');
		matchCards();
		return;
	}
}

function matchCards() {
	let [cardA, cardB] = state.selectedCards;
	console.log(cardA, cardB);

	let valueA = cardA.dataset.value;
	let valueB = cardB.dataset.value;

	if (valueA === valueB) {
		console.log('they match');
	} else {
		console.log('they dont match');
		state.selectedCards.forEach(card => {
			card.classList.remove('open');
		});
	}

	// clear the state
	state.selectedCards = [];
}
