//global settings for Chart.js
Chart.defaults.font.family = "Open Sans";

//variables to store population per state
const johor_population = 3794200;
const kedah_population = 2193600;
const kelantan_population = 1928900;
const melaka_population = 937800;
const nsembilan_population = 1128900;
const pahang_population = 1684700;
const perak_population = 2509000;
const perlis_population = 255500;
const ppinang_population = 1774200;
const sabah_population = 3832500;
const sarawak_population = 2824700;
const selangor_population = 6555100;
const terengganu_population = 1275200;
const kl_population = 1746600;
const labuan_population = 100100;
const putrajaya_population = 116100;

//get data from csv file
async function getVaxMYData() {
  const data = await fetch("vax_malaysia.csv").then((response) =>
    response.text()
  );

  var daily_administration = 0;
  var daily_firstdose = 0;
  var daily_seconddose = 0;
  var daily_booster = 0;
  var total_administration = 0;
  var total_firstdose = 0;
  var total_seconddose = 0;
  var total_booster = 0;
  // get the last 7 columns (recent 7 days of records)
  table = data.split("\n").slice(-2).slice(0, 1);
  //console.log(table);
  table.forEach((row) => {
    columns = row.split(",");
    daily_administration = columns[4]
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    daily_firstdose = columns[1]
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    daily_seconddose = columns[2]
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    daily_booster = columns[3]
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    total_administration = columns[12]
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    total_firstdose = columns[9]
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    total_seconddose = columns[10]
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    total_booster = columns[11]
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    //console.log(daily_firstdose);
  });

  //console.log(table[1]);

  console.log(daily_administration);
  return {
    daily_administration,
    daily_firstdose,
    daily_seconddose,
    daily_booster,
    total_administration,
    total_firstdose,
    total_seconddose,
    total_booster,
  };
}

async function getData(filename) {
  const xs = [];
  const ys = [];
  const dates = [];
  const dict = {};
  const johor = {
    cases_new: [],
    cases_import: [],
    cases_recovered: [],
    cases_active: [],
    cases_cluster: [],
    cases_unvax: [],
    cases_pvax: [],
    cases_fvax: [],
    cases_boost: [],
    cases_child: [],
    cases_adolescent: [],
    cases_adult: [],
    cases_elderly: [],
  };
  const kedah = {};

  const states_cases = await fetch(filename).then((response) =>
    response.text()
  );
  const table = states_cases.split("\n").splice(1);
  table.forEach((row) => {
    columns = row.split(",");
    dates.push(columns[0]);
    //state
    if (columns[1] == "Johor") {
      johor.cases_new.push(columns[2]);
      johor.cases_import.push(columns[3]);
      johor.cases_recovered.push(columns[4]);
      johor.cases_active.push(columns[5]);
      johor.cases_cluster.push(columns[6]);
      johor.cases_unvax.push(columns[7]);
      johor.cases_pvax.push(columns[8]);
      johor.cases_fvax.push(columns[9]);
      johor.cases_boost.push(columns[10]);
      johor.cases_child.push(columns[11]);
      johor.cases_adolescent.push(columns[12]);
      johor.cases_adult.push(columns[13]);
      johor.cases_elderly.push(columns[14]);
    } /*else if (columns[1] == "Kedah") {
                            } else if (columns[1] == "Kelantan") {
                            } else if (columns[1] == "Melaka") {
                            } else if (columns[1] == "Negeri Sembilan") {
                            } else if (columns[1] == "Pahang") {
                            } else if (columns[1] == "Perak") {
                            } else if (columns[1] == "Perlis") {
                            } else if (columns[1] == "Pulau Pinang") {
                            } else if (columns[1] == "Sabah") {
                            } else if (columns[1] == "Sarawak") {
                            } else if (columns[1] == "Selangor") {
                            } else if (columns[1] == "Terengganu") {
                            } else if (columns[1] == "W.P. Kuala Lumpur") {
                            } else if (columns[1] == "W.P. Labuan") {
                            } else if (columns[1] == "W.P. Putrajaya") {
                            }*/
  });
  //console.log(johor);
  // remove duplicates from dates
  const unique_dates = Array.from(new Set(dates));
  //console.log(unique_dates);
  return { unique_dates, johor };
}

async function getVaxData(statename) {
  const stateData = {
    Partial: 0,
    Full: 0,
    Booster: 0,
    accum: 0,
  };
  //the last 16 rows (16states)
  const data = await fetch(
    "covid19-public-main/vaccination/vax_state.csv"
  ).then((response) => response.text());
  //console.log(data);

  table = data.split("\n").slice(-16);
  console.log(table);
  table.forEach((row) => {
    columns = row.split(",");
    if (columns[1] == statename) {
      //console.log(row);
      console.log(columns[10]);
      stateData.Partial = columns[10];
      stateData.Full = columns[11];
      stateData.Booster = columns[12];
      stateData.accum = columns[13];
    }
  });
  //Data as of 23/02/2022
  //Source: https://www.dosm.gov.my/v1/index.php?r=columnnew/populationclock
  if (statename == "Johor") {
    //1 million
    data["Not Vaccinated"] =
      3806079 - stateData.accum < 0 ? 0 : johor_population - stateData.accum;
  } else if (statename == "Kedah") {
    data["Not Vaccinated"] =
      2200646 - stateData.accum < 0 ? 0 : kedah_population - stateData.accum;
  } else if (statename == "Kelantan") {
    data["Not Vaccinated"] =
      1942371 - stateData.accum < 0 ? 0 : kelantan_population - stateData.accum;
  } else if (statename == "Melaka") {
    data["Not Vaccinated"] =
      940706 - stateData.accum < 0 ? 0 : melaka_population - stateData.accum;
  } else if (statename == "Negeri Sembilan") {
    data["Not Vaccinated"] =
      1130353 - stateData.accum < 0
        ? 0
        : nsembilan_population - stateData.accum;
  } else if (statename == "Pahang") {
    data["Not Vaccinated"] =
      1689033 - stateData.accum < 0 ? 0 : pahang_population - stateData.accum;
  } else if (statename == "Perak") {
    data["Not Vaccinated"] =
      2509578 - stateData.accum < 0 ? 0 : perak_population - stateData.accum;
  } else if (statename == "Perlis") {
    data["Not Vaccinated"] =
      255847 - stateData.accum < 0 ? 0 : perlis_population - stateData.accum;
  } else if (statename == "Pulau Pinang") {
    data["Not Vaccinated"] =
      1777092 - stateData.accum < 0 ? 0 : ppinang_population - stateData.accum;
  } else if (statename == "Sabah") {
    data["Not Vaccinated"] =
      3811994 - stateData.accum < 0 ? 0 : sabah_population - stateData.accum;
  } else if (statename == "Sarawak") {
    data["Not Vaccinated"] =
      2827540 - stateData.accum < 0 ? 0 : sarawak_population - stateData.accum;
  } else if (statename == "Selangor") {
    data["Not Vaccinated"] =
      6573575 - stateData.accum < 0 ? 0 : selangor_population - stateData.accum;
  } else if (statename == "Terengganu") {
    data["Not Vaccinated"] =
      1284534 - stateData.accum < 0
        ? 0
        : terengganu_population - stateData.accum;
  } else if (statename == "W.P. Kuala Lumpur") {
    data["Not Vaccinated"] =
      1738314 - stateData.accum < 0 ? 0 : kl_population - stateData.accum;
  } else if (statename == "W.P. Labuan") {
    data["Not Vaccinated"] =
      100461 - stateData.accum < 0 ? 0 : labuan_population - stateData.accum;
  } else if (statename == "W.P. Putrajaya") {
    data["Not Vaccinated"] =
      119596 - stateData.accum < 0 ? 0 : putrajaya_population - stateData.accum;
  }

  delete stateData.accum; // we do not want to show total accumulation on vaccination in chart
  if (stateData["Not Vaccinated"] == 0) {
    // if all are vaccinated, remove the data from being plotted
    delete stateData["Not Vaccinated"];
  }

  return stateData;
}
getVaxData();

/* Function to plot Chart using Chart.js */
async function drawLineChart(dates, state) {
  const data = await getData("covid19-public-main/epidemic/cases_state.csv");
  const ctx = document.getElementById("chart1").getContext("2d");
  //console.log(data.unique_dates);
  //console.log(data.johor);
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.unique_dates,
      datasets: [
        {
          label: "New cases",
          data: data.johor.cases_new,
          borderColor: "#001234",
          backgroundColor: "#001234",
        },
        {
          label: "Import Cases",
          data: data.johor.cases_import,
          borderColor: "#0c51ff",
          backgroundColor: "#0c51ff",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "timeseries",
          time: {
            unit: "month",
          },
          ticks: {
            score: "data",
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },

      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (item) =>
            item.dataset.label +
            ": " +
            this.originalValues[item.datasetIndex].data[item.dataIndex],
        },
      },
      hover: {
        mode: "index",
        intersect: false,
      },
    },
  });
}

async function drawPolarChart(statename) {
  const data = await getVaxData(statename);
  const ctx1 = document.getElementById("polarchart").getContext("2d");
  console.log(data);

  const myChart = new Chart(ctx1, {
    type: "polarArea",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    },

    options: {
      plugins: {
        title: {
          display: true,
          text: `Number of Vaccinated Citizens in ${statename}`,
          padding: {
            top: 10,
            bottom: 10,
          },
        },
      },
    },
  });
}

async function drawStackedBar() {
  const labels = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "N. Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "P. Pinang",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "KL",
    "Labuan",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "First Dose",
        data: [
          1234, 111, 999, 1233, 122, 2345, 9090, 1234, 111, 999, 1233, 122,
          2345, 9090, 111111,
        ],
        backgroundColor: "#a29bfe",
      },
      {
        label: "Second Dose",
        data: [
          1234, 111, 999, 1233, 122, 2345, 9090, 1234, 111, 999, 1233, 122,
          2345, 9090, 111111,
        ],
        backgroundColor: "#74b9ff",
      },
      {
        label: "Booster",
        data: [
          1234, 111, 999, 1233, 122, 2345, 9090, 1234, 111, 999, 1233, 122,
          2345, 9090, 111111,
        ],
        backgroundColor: "#81ecec",
      },
    ],
  };
  const ctx1 = document.getElementById("stackedBar").getContext("2d");
  const mystackedBarChart = new Chart(ctx1, {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
      plugins: {
        title: {
          display: true,
          text: "Total Vaccination Administration across Malaysia States",
        },
        legend: {
          labels: {
            font: {
              size: 10,
            },
          },
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
        yAxes: [
          {
            ticks: {
              fontSize: 10,
            },
          },
        ],
      },
    },
  });
}
