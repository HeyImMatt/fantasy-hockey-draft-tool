let fileName = {
  fileName: '20192020.csv',
};

function sendHttpRequest(method, url) {
  return fetch(url, {
    method: method,
  }).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return response.json().then((errData) => {
        console.log(errData);
        throw new Error(errData);
      });
    }
  });
}

async function fetchRosters(nhlTeam) {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      `https://statsapi.web.nhl.com/api/v1/teams/${nhlTeam.id}/roster`,
    );
    const teamData = responseData;
    console.log(teamData);
    for (const player of teamData.roster) {
      if (
        player.position.type === 'Forward' ||
        player.position.type === 'Defenseman'
      )
        await fetchPlayerStats(
          player.person.fullName,
          nhlTeam.team,
          player.position.abbreviation,
          player.person.id,
        );
    }
  } catch (error) {
    console.log(`fetchRosters ${error.message}`);
  }
}

async function fetchPlayerStats(playerName, team, pos, id) {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=statsSingleSeason&season=20192020`,
    );
    const data = responseData;
    const {
      games,
      goals,
      assists,
      points,
      plusMinus,
      powerPlayPoints,
      shots,
      hits,
      timeOnIcePerGame,
      timeOnIce,
    } = data.stats[0].splits[0].stat;
    rowData.push({
      playerName: playerName,
      position: pos,
      team: team,
      gamesPlayed: games,
      goals: goals,
      assists: assists,
      points: points,
      plusMinus: plusMinus,
      ppp: powerPlayPoints,
      sog: shots,
      hits: hits,
      toipg: timeOnIcePerGame,
      toi: timeOnIce,
    });
  } catch (error) {
    console.log(`fetchPlayerStats ${error.message} ${team} ${playerName} ${id} has no stats`);
  }
}

nhlTeams.forEach((nhlTeam) => {
  new Promise(function (resolve, reject) {
    resolve(fetchRosters(nhlTeam));
    reject(console.log(error));
  }).then(() => {
    gridOptions.api.setRowData(rowData);
  });
});

document.querySelector('button').addEventListener('click', () => {
  gridOptions.api.exportDataAsCsv(fileName);
});
