const grid = document.querySelector('.js-grid');
// array of html elements representing cards
let cards = null;
let isProcessingMatch = false;

/**
 * Card component
 *
 * @return     {string}  Return the string representaton of the HTML Card component
 */
let Card = ({ value }) => {
	return `
		<div class="card" data-value="${value}">
			<section class="card_front"></section>
			<section class="card_back">${value}</section>
		</div>
	`;
};

let state = {
	// will hold maximum two cards [card1, card2]
	selectedCards: [],
	clearSelectedCards() {
		this.selectedCards = [];
	},

	// state for matched count
	matchedCount: 0,
	maximumMatchedCount: 18,

	incrementMatchCount() {
		this.matchedCount += 1;
	},

	allMatched() {
		return this.matchedCount === this.maximumMatchedCount;
	},

	restart() {
		this.matchedCount = 0;
	}
};

let uniqueMatches = [
	'🎟',
	'🌻',
	'🏈',
	'🎈',
	'😼',
	'🎨',
	'🍼',
	'💓',
	'🍺',
	'🚓',
	'🏭',
	'🎤',
	'💍',
	'🍐',
	'💩',
	'🌙',
	'👨',
	'👩'
];

function startGame() {
	let html = generateCardsHtml();
	grid.innerHTML = html;

	cards = grid.querySelectorAll('.card');
	cards.forEach(card => {
		card.addEventListener('click', handleCardClick);
	});
}

/**
 * Return string HTML represantation of cards.
 *
 * @return     {string}  the string html representation
 */
function generateCardsHtml() {
	let mathces = [...uniqueMatches, ...uniqueMatches];

	function shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}
	shuffle(mathces);

	return mathces.map(value => Card({ value })).join('');
}

startGame();

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
			state.incrementMatchCount();
			state.selectedCards.forEach(card => {
				card.classList.add('matched');
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
	if (state.allMatched()) {
		// it did end
		// show a modal
		modalEl.classList.add('open');

		// cound down to 0
		// and restart game
		let countDown = 6;
		let interval = setInterval(() => {
			countDown--;
			timePlaceholder.textContent = `${countDown}`;
			if (countDown === 0) {
				// restart the game
				modalEl.classList.remove('open');
				timePlaceholder.textContent = `...`;
				startGame();
				clearInterval(interval);
			}
		}, 1000);

		state.restart();
	}
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(() => {
		console.log('Service worker is registered');
	});
}
