const grid = document.querySelector('.js-grid');
const cards = grid.querySelectorAll('.card');

let isProcessingMatch = false;
let matchedCount = {
	current: 0,
	max: 3,

	increment() {
		this.current += 1;
	},

	allMatched() {
		return this.current === this.max;
	},

	restart() {
		current: 0;
	}
};

let state = {
	// will hold maximum two cards [card1, card2]
	selectedCards: [],
	clearSelectedCards() {
		this.selectedCards = [];
	}
};

cards.forEach(card => {
	card.addEventListener('click', handleCardClick);
});

function handleCardClick(e) {
	// return if it is processing the match
	if (isProcessingMatch) return;

	const cardEl = e.currentTarget;

	// return if you clicked this card already
	if (cardEl.classList.contains('open')) return;

	// open the card
	if (state.selectedCards.length < 2) {
		cardEl.classList.add('open');
		state.selectedCards.push(cardEl);
	}

	// match the card
	if (state.selectedCards.length === 2) {
		matchCards();
		return;
	}
}

function matchCards() {
	isProcessingMatch = true;
	let [cardA, cardB] = state.selectedCards;

	let valueA = cardA.dataset.value;
	let valueB = cardB.dataset.value;

	if (valueA === valueB) {
		// handle a match
		setTimeout(() => {
			state.selectedCards.forEach(card => {
				card.innerHTML = card.dataset.value + '(matched)';
				card.removeEventListener('click', handleCardClick);
			});
			state.clearSelectedCards();
			isProcessingMatch = false;

			didItEnd();
		}, 1000);
	} else {
		// handle don' match
		setTimeout(() => {
			state.selectedCards.forEach(card => {
				card.classList.remove('open');
			});
			state.clearSelectedCards();
			isProcessingMatch = false;
		}, 1000);
	}
}

const modalEl = document.querySelector('.js-modal');
const timePlaceholder = modalEl.querySelector('.js-modal-time');

function didItEnd() {
	matchedCount.increment();

	if (matchedCount.allMatched()) {
		modalEl.classList.add('open');
		let countDown = 6;

		let interval = setInterval(() => {
			countDown--;
			timePlaceholder.textContent = `${countDown}`;
			if (countDown === 0) {
				// restart the game
				modalEl.classList.remove('open');
				clearInterval(interval);
			}
		}, 1000);

		matchedCount.restart();
	}
}
