export default function renderScreen2(players) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>¡Tenemos un ganador!</h1>
    <section id="winner-info"></section>
    <section id="ranking-scores">
      <h2>Ranking de Jugadores</h2>
      <ul id="players-list"></ul>
    </section>
  `;

  const playersList = document.getElementById('players-list');

  // Mostrar la lista de jugadores con sus puntuaciones ordenadas
  players
    .sort((a, b) => b.score - a.score)
    .forEach((player, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${index + 1}. ${player.nickname} (${player.score} puntos)`;
      playersList.appendChild(listItem);
    });

  // Mostrar el ganador
  const winner = players[0];
  const winnerInfo = document.getElementById('winner-info');
  winnerInfo.innerHTML = `<p>¡Felicidades ${winner.nickname}, has ganado con ${winner.score} puntos!</p>`;
}
