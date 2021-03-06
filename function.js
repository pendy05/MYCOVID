//global settings for Chart.js
Chart.defaults.font.family = "Open Sans";

//get vaccination data from MY states csv file
async function getVaxStatesData() {
  const data = await fetch("data/vax_state.csv").then((response) =>
    response.text()
  );

  const stateData = {
    Johor: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Kedah: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Kelantan: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Melaka: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    "Negeri Sembilan": {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Pahang: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Perak: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Perlis: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    "Pulau Pinang": {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Sabah: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Sarawak: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Selangor: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    Terengganu: {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    "W.P. Kuala Lumpur": {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    "W.P. Labuan": {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
    "W.P. Putrajaya": {
      Partial: 0,
      Full: 0,
      Booster: 0,
    },
  };
  // get the last 16 columns (last day record for 16 states)
  table = data.split("\n").slice(-17).splice(0, 16);
  table.forEach((row) => {
    columns = row.split(",");
    for (var statename in stateData) {
      //console.log(statename);
      //console.log(columns[1]);
      if (columns[1] == statename) {
        //console.log(row);
        var value = stateData[statename];
        //console.log(columns[10]);
        value.Partial = columns[10];
        value.Full = columns[11];
        value.Booster = columns[12];
        break;
      }
    }
  });
  //console.log(stateData);
  return stateData;
}

//get MY vaccination data from csv file
async function getVaxMYData() {
  const data = await fetch("data/vax_malaysia.csv").then((response) =>
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
  // get the last columns (last day record)
  table = data.split("\n").slice(-2).slice(0, 1);

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
  });

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

//get cases per state data
async function getSummaryData() {
  const stateCasesData = await fetch("data/cases_state.csv").then((response) =>
    response.text()
  );
  const stateDeathData = await fetch("data/deaths_state.csv").then((response) =>
    response.text()
  );

  const stateHospitalData = await fetch("data/hospital.csv").then((response) =>
    response.text()
  );

  const dates = [];
  const stateData = {
    Johor: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: "",
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Kedah: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Kelantan: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Melaka: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    "Negeri Sembilan": {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Pahang: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Perak: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Perlis: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    "Pulau Pinang": {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Sabah: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Sarawak: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Selangor: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    Terengganu: {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    "W.P. Kuala Lumpur": {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    "W.P. Labuan": {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
    "W.P. Putrajaya": {
      newCases: [],
      newCasesTrend: "", //percent
      avgCases: 0,
      recoveredCases: [],
      recoveredCasesTrend: "", //percent
      avgRecoveredCases: 0,
      newDeaths: [],
      newDeathsTrend: [],
      avgDeaths: 0,
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: "", //percent
      avghospitalAdmission: 0,
    },
  };

  /*
  extract the basic info from the 3 different csv files across past 7 days
  - new cases
  - recovered cases
  - death cases
  - hospital admission case
  - number of COVID-19 bed available

  and to be modified variables
  - avgCases
  - avgRecoveredCases
  - avgDeaths
  - avghospitalAdmission

  yet to have value variables
  - newCasesTrend
  - recoveredCasesTrend
  - newDeathsTrend
  - hospitalAdmissionTrend
  */
  const casesTable = stateCasesData.split("\n").splice(-113).splice(0, 112);
  casesTable.forEach((row) => {
    columns = row.split(",");
    for (var statename in stateData) {
      if (columns[1] == statename) {
        var value = stateData[statename];
        value.newCases.push(columns[2]);
        value.recoveredCases.push(columns[4]);
        value.avgCases = value.avgCases + columns[2];
        value.avgRecoveredCases = value.avgRecoveredCases + columns[4];
      }
    }
    dates.push(columns[0]);
  });
  const hospitalTable = stateHospitalData
    .split("\n")
    .splice(-113)
    .splice(0, 112);
  hospitalTable.forEach((row) => {
    columns = row.split(",");
    for (var statename in stateData) {
      if (columns[1] == statename) {
        var value = stateData[statename];
        //value.beds_covid.push(columns[3]);
        value.hospitalAdmission.push(columns[6]);
        value.avghospitalAdmission = value.avghospitalAdmission + columns[6];
      }
    }
  });
  const deathTable = stateDeathData.split("\n").splice(-113).splice(0, 112);

  deathTable.forEach((row) => {
    columns = row.split(",");
    for (var statename in stateData) {
      if (columns[1] == statename) {
        var value = stateData[statename];
        value.newDeaths.push(columns[3]);
        value.avgDeaths = value.avgDeaths + columns[3];
      }
    }
  });

  /*Calculate average and trend of cases, deaths, hopsital admission and recovered case*/
  for (var statename in stateData) {
    var value = stateData[statename];

    value.newCasesTrend =
      value.newCases[0] == 0
        ? "+" + value.newCases[6] + "%"
        : value.newCases[6] - value.newCases[0] < 0
        ? "-" +
          Math.floor(
            (value.newCases[6] - value.newCases[0]) / value.newCases[0]
          ) *
            -100 +
          "%"
        : value.newCases[6] - value.newCases[0] > 0
        ? "+" +
          Math.floor(
            (value.newCases[6] - value.newCases[0]) / value.newCases[0]
          ) *
            100 +
          "%"
        : "0%";
    value.avgCases = Math.floor(
      (value.avgCases[0] +
        value.avgCases[1] +
        value.avgCases[2] +
        value.avgCases[3] +
        value.avgCases[4] +
        value.avgCases[5] +
        value.avgCases[6]) /
        7
    );
    value.recoveredCasesTrend =
      value.recoveredCases[0] == 0
        ? "+" + value.recoveredCases[6] + "%"
        : value.recoveredCases[6] - value.recoveredCases[0] < 0
        ? "-" +
          Math.floor(
            (value.recoveredCases[6] - value.recoveredCases[0]) /
              value.recoveredCases[0]
          ) *
            -100 +
          "%"
        : value.recoveredCases[6] - value.recoveredCases[0] > 0
        ? "+" +
          Math.floor(
            (value.recoveredCases[6] - value.recoveredCases[0]) /
              value.recoveredCases[0]
          ) *
            100 +
          "%"
        : "0%";
    value.avgRecoveredCases = Math.floor(
      (value.avgRecoveredCases[0] +
        value.avgRecoveredCases[1] +
        value.avgRecoveredCases[2] +
        value.avgRecoveredCases[3] +
        value.avgRecoveredCases[4] +
        value.avgRecoveredCases[5] +
        value.avgRecoveredCases[6]) /
        7
    );
    value.newDeathsTrend =
      value.newDeaths[0] == 0
        ? "+" + value.newDeaths[6] + "%"
        : value.newDeaths[6] - value.newDeaths[0] < 0
        ? "-" +
          Math.floor(
            (value.newDeaths[6] - value.newDeaths[0]) / value.newDeaths[0]
          ) *
            -100 +
          "%"
        : value.newDeaths[6] - value.newDeaths[0] > 0
        ? "+" +
          Math.floor(
            (value.newDeaths[6] - value.newDeaths[0]) / value.newDeaths[0]
          ) *
            100 +
          "%"
        : "0%";
    value.avgDeaths = Math.floor(
      (value.avgDeaths[0] +
        value.avgDeaths[1] +
        value.avgDeaths[2] +
        value.avgDeaths[3] +
        value.avgDeaths[4] +
        value.avgDeaths[5] +
        value.avgDeaths[6]) /
        7
    );
    value.hospitalAdmissionTrend =
      value.hospitalAdmission[0] == 0
        ? "+" + value.hospitalAdmission[6] + "%"
        : value.hospitalAdmission[6] - value.hospitalAdmission[0] < 0
        ? "-" +
          Math.floor(
            ((value.hospitalAdmission[6] - value.hospitalAdmission[0]) /
              value.hospitalAdmission[0]) *
              -100
          ) +
          "%"
        : value.hospitalAdmission[6] - value.hospitalAdmission[0] > 0
        ? "+" +
          Math.floor(
            (value.hospitalAdmission[6] - value.hospitalAdmission[0]) /
              value.hospitalAdmission[0]
          ) *
            100 +
          "%"
        : "0%";
    value.avghospitalAdmission = Math.floor(
      (value.avghospitalAdmission[0] +
        value.avghospitalAdmission[1] +
        value.avghospitalAdmission[2] +
        value.avghospitalAdmission[3] +
        value.avghospitalAdmission[4] +
        value.avghospitalAdmission[5] +
        value.avghospitalAdmission[6]) /
        7
    );
  }

  return stateData;
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
    "Putrajaya",
  ];

  //get states vaccination data
  const stateData = await getVaxStatesData();
  //store states data based on type of vaccination
  firstDoseData = [];
  secondDoseData = [];
  boosterData = [];
  for (var statename in stateData) {
    var value = stateData[statename];
    //console.log(value);
    firstDoseData.push(value.Partial);
    secondDoseData.push(value.Full);
    boosterData.push(value.Booster);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "First Dose",
        data: firstDoseData,
        backgroundColor: "#a29bfe",
      },
      {
        label: "Second Dose",
        data: secondDoseData,
        backgroundColor: "#74b9ff",
      },
      {
        label: "Booster",
        data: boosterData,
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
