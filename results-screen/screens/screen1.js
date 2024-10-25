import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Screen 1</h1>

        <section id="results-screen">
        <h2>Resultados</h2>
        </section>

        <section id="players-scores">
        <h2>Puntuaciones</h2>
        </section>
    `;

	const resultsScreen = document.getElementById('results-screen');
	const playersScores = document.getElementById('players-scores');

	socket.on('updateScores', (players) => {
		playersScores.innerHTML = ''; // Limpiar la tabla de puntuaciones

		players.forEach((player) => {
			const scoreRow = document.createElement('p');
			scoreRow.innerHTML = `${player.nickname}: ${player.score} puntos`;
			playersScores.appendChild(scoreRow);
		});

		resultsScreen.style.display = 'flex'; // Mostrar la pantalla de resultados
	});

	socket.on('notifyGameOver', (data) => {
		gameGround.style.display = 'none';
		gameOverText.innerHTML = data.message;

		if (data.winner) {
			// Mostrar la pantalla de resultados
			resultsScreen.style.display = 'flex';
		} else {
			// Mostrar la pantalla normal de juego
			gameOverScreen.style.display = 'flex';
		}
	});

	socket.on('updateScores', (players) => {
		playersScores.innerHTML = ''; // Limpiar la tabla de puntuaciones

		players
			.sort((a, b) => b.score - a.score) // Ordenar jugadores por puntuación
			.forEach((player, index) => {
				const scoreRow = document.createElement('p');
				scoreRow.innerHTML = `${index + 1}. ${player.nickname}: ${player.score} puntos`;
				playersScores.appendChild(scoreRow);
			});

		resultsScreen.style.display = 'flex'; // Mostrar la pantalla de resultados
	});

	socket.on('navigateToScreen2', (players) => {
		console.log('Redirigiendo a Screen 2 con jugadores:', players);
		router.navigateTo('/screen2', players); // Pasa los jugadores como argumento
	});

	socket.on('eventListenerExample', (data) => {});
}