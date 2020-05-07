// specify the columns
const columnDefs = [
  { headerName: 'Player Name', field: 'playerName', sortable: true, filter: true },
  { headerName: 'GP', field: 'gamesPlayed', sortable: true, filter: true },
  { headerName: 'G', field: 'goals', sortable: true, filter: true },
  { headerName: 'A', field: 'assists', sortable: true, filter: true },
  { headerName: 'P', field: 'points', sortable: true, filter: true },
  { headerName: '+/-', field: 'plusMinus', sortable: true, filter: true },
  { headerName: 'PPP', field: 'ppp', sortable: true, filter: true },
  { headerName: 'SOG', field: 'sog', sortable: true, filter: true },
  { headerName: 'Hits', field: 'hits', sortable: true, filter: true },
  { headerName: 'ToI', field: 'toi', sortable: true, filter: true },
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
