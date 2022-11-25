import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import './CardDeck.css';
import CardDeck from './CardDeck';

function CardDeckWrapper() {
	const [
		deckId,
		setDeckId
	] = useState(null);

	const newDeck = () =>
		axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(function(res) {
			setDeckId(res.data.deck_id);
		});

	window.addEventListener('load', (e) => newDeck());

	return (
		<div>
			<CardDeck id={deckId} />
		</div>
	);
}

export default CardDeckWrapper;
