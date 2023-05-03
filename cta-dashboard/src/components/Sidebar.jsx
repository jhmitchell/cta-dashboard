import './Sidebar.css';
import { useState } from 'react';

export default function Sidebar() {

	const [buses, setBuses] = useState(['red', 'blue', 'green', 'yellow', 'orange']);
	const [favorites, setFavorites] = useState([]);

	function toggleFavorite(value) {
		console.log("Toggling!");
		if (favorites.includes(value)) {
			setFavorites((prev) => {
				return prev.filter((val) => val !== value);
			});
		} else {
			setFavorites((prev) => {
				const newArr = [...prev];
				newArr.push(value);
				return newArr;
			});
		}
	}

	function getFavorites() {
		if (favorites.length) {
			return favorites.map((value, index) => {
				return (
					<li key={index}>
						<a href={"#" + value}>{value}</a>
					</li>
				);
			});
		} else {
			return (
				<li>No favorites yet. Try adding one!</li>
			)
		}
	}

	function getBuses() {
		if (buses.length) {
			return buses.map((value, index) => {
				return (
					<li key={index}>
						<a href={'#' + value}>{value}</a>
						<button onClick={() => toggleFavorite(value)}>Fav</button>
					</li>
				)
			});
		}
	}

	return (
		<div className="nav">
			<h1>CTA Bus Tracker</h1>
			<h2>Favorites</h2>
			<ul className='favoritesList'>
				{getFavorites()}
			</ul>
			<h2>All Buses</h2>
			<ul className='busList'>
				{getBuses()}
			</ul>
		</div>
	);
}