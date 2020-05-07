// specify the columns
const columnDefs = [
  { headerName: 'Player', field: 'playerName', sortable: true, filter: true },
  { headerName: 'POS', field: 'position', sortable: true, filter: true, width: 90 },
  { headerName: 'Team', field: 'team', sortable: true, filter: true, width: 90 },
  { headerName: 'GP', field: 'gamesPlayed', sortable: true, filter: true, width: 90 },
  { headerName: 'G', field: 'goals', sortable: true, filter: true, width: 90 },
  { headerName: 'A', field: 'assists', sortable: true, filter: true, width: 90 },
  { headerName: 'P', field: 'points', sortable: true, filter: true, width: 90 },
  { headerName: '+/-', field: 'plusMinus', sortable: true, filter: true, width: 90 },
  { headerName: 'PPP', field: 'ppp', sortable: true, filter: true, width: 90 },
  { headerName: 'SOG', field: 'sog', sortable: true, filter: true, width: 90 },
  { headerName: 'Hits', field: 'hits', sortable: true, filter: true, width: 90 },
  { headerName: 'ToIPG', field: 'toipg', sortable: true, filter: true, width: 90 },
  { headerName: 'ToI', field: 'toi', sortable: true, filter: true, width: 90 },
];

// specify the data
const rowData = [];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
};

// lookup the container we want the Grid to use
const eGridDiv = document.querySelector('#myGrid');

// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(eGridDiv, gridOptions);
