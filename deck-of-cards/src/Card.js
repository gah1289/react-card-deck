import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ card }) {
	const { image } = card;
	return (
		<div className="Card">
			{' '}
			<img src={image} />
		</div>
	);
}

export default Card;
