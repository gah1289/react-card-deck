import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import './CardDeck.css';

function CardDeck({ id }) {
	const [
		cards,
		setCards
	] = useState([]);

	const [
		position,
		setPosition
	] = useState(0);

	const [
		isDrawing,
		setIsDrawing
	] = useState(false);

	// Part 1: pulls random card when button is clicked
	const drawCard = () => {
		axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`).then(function(cardData) {
			if (cardData.data.remaining === 0) {
				alert('Error: no cards remaining!');
			}
			else {
				setCards((cards) => [
					...cards,
					cardData.data.cards[0]
				]);
			}
		});
	};

	// pulls 1 card every second after being clicked

	useEffect(
		function setCardsAutoDraw() {
			if (isDrawing) {
				const interval = setInterval(() => {
					drawCard();
					setPosition((p) => p + 10);
					console.log(position);
				}, 1000);

				return function cleanUpAutoDraw() {
					clearInterval(interval);
				};
			}
			else {
				return;
			}
		},
		[
			isDrawing
		]
	);

	function toggle(evt) {
		setIsDrawing((isDrawing) => !isDrawing);
	}

	return (
		<div className="CardDeck">
			<button className={`ToggleButton ${isDrawing ? 'Drawing' : ''}`} onClick={toggle}>
				{' '}
				{!isDrawing ? 'Start Drawing' : 'Stop Drawing'}
			</button>

			<div className="Cards">{cards.map((card) => <Card key={card.code} card={card} />)} </div>
		</div>
	);
}

export default CardDeck;
