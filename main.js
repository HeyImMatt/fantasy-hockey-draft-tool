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

async function fetchRosters() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      `https://statsapi.web.nhl.com/api/v1/teams/${nhlTeams[25].id}/roster`, //need to make the 28 dynamic to get all teams
    );
    const teamData = responseData;
    for (const player of teamData.roster) {
      if (
        player.position.type === 'Forward' ||
        player.position.type === 'Defenseman'
      )
        await fetchPlayerStats(
          player.person.fullName,
          nhlTeams[25].team,
          player.position.abbreviation,
          player.person.id,
        );
    }
  } catch (error) {
    alert(error.message);
  }
}

// https://statsapi.web.nhl.com/api/v1/people/8476459/stats?stats=statsSingleSeason&season=20182019

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
    alert(error.message);
  }
}

fetchRosters().then(() => {
  gridOptions.api.setRowData(rowData);
});
