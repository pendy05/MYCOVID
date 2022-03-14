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

//get vaccination data from MY states csv file
async function getVaxStatesData() {
  const data = await fetch(
    "covid19-public-main\\vaccination\\vax_state.csv"
  ).then((response) => response.text());

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
  table = data.split("\n").slice(-16);
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
  // get the last columns (last day record)
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

//get cases per state data
//
async function getData() {
  const stateCasesData = await fetch(
    "covid19-public-mainepidemiccases_state.csv"
  );
  const stateDeathData = await fetch(
    "covid19-public-mainepidemicdeaths_state.csv"
  );

  const stateHospitalData = await fetch(
    "covid19-public-mainepidemichospital.csv"
  );

  const dates = [];
  const casesData = {
    Johor: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Kedah: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Kelantan: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Melaka: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    "Negeri Sembilan": {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Pahang: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Perak: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Perlis: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    "Pulau Pinang": {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Sabah: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Sarawak: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Selangor: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    Terengganu: {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    "W.P. Kuala Lumpur": {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    "W.P. Labuan": {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
    "W.P. Putrajaya": {
      newCases: [],
      newCasesTrend: 0, //percent
      recoveredCases: [],
      recoveredCasesTrend: 0, //percent
      newDeaths: [],
      newDeathsTrend: [],
      beds_covid: 0, //later turn into percent=> bed utilization
      hospitalAdmission: [],
      hospitalAdmissionTrend: 0, //percent
    },
  };

  const casesTable = stateCasesData.split("\n").splice(113).splice(0, 112);
  const hospitalTable = stateHospitalData
    .split("\n")
    .splice(113)
    .splice(0, 112);
  const deathTable = stateDeathData.split("\n").splice(113).splice(0, 112);
  table.forEach((row) => {
    columns = row.split(",");
    dates.push(columns[0]);
    //state
  });
  //console.log(johor);
  // remove duplicates from dates
  const unique_dates = Array.from(new Set(dates));
  //console.log(unique_dates);
  return { unique_dates, johor };
}

// async function getVaxData(statename) {
//   const stateData = {
//     Partial: 0,
//     Full: 0,
//     Booster: 0,
//     accum: 0,
//   };
//   //the last 16 rows (16states)
//   const data = await fetch(
//     "covid19-public-main/vaccination/vax_state.csv"
//   ).then((response) => response.text());
//   //console.log(data);

//   table = data.split("\n").slice(-16);
//   console.log(table);
//   table.forEach((row) => {
//     columns = row.split(",");
//     if (columns[1] == statename) {
//       //console.log(row);
//       console.log(columns[10]);
//       stateData.Partial = columns[10];
//       stateData.Full = columns[11];
//       stateData.Booster = columns[12];
//       stateData.accum = columns[13];
//     }
//   });
//   //Data as of 23/02/2022
//   //Source: https://www.dosm.gov.my/v1/index.php?r=columnnew/populationclock
//   if (statename == "Johor") {
//     //1 million
//     data["Not Vaccinated"] =
//       johor_population - stateData.accum < 0
//         ? 0
//         : johor_population - stateData.accum;
//   } else if (statename == "Kedah") {
//     data["Not Vaccinated"] =
//       kedah_population - stateData.accum < 0
//         ? 0
//         : kedah_population - stateData.accum;
//   } else if (statename == "Kelantan") {
//     data["Not Vaccinated"] =
//       kelantan_population - stateData.accum < 0
//         ? 0
//         : kelantan_population - stateData.accum;
//   } else if (statename == "Melaka") {
//     data["Not Vaccinated"] =
//       melaka_population - stateData.accum < 0
//         ? 0
//         : melaka_population - stateData.accum;
//   } else if (statename == "Negeri Sembilan") {
//     data["Not Vaccinated"] =
//       nsembilan_population - stateData.accum < 0
//         ? 0
//         : nsembilan_population - stateData.accum;
//   } else if (statename == "Pahang") {
//     data["Not Vaccinated"] =
//       pahang_population - stateData.accum < 0
//         ? 0
//         : pahang_population - stateData.accum;
//   } else if (statename == "Perak") {
//     data["Not Vaccinated"] =
//       perak_population - stateData.accum < 0
//         ? 0
//         : perak_population - stateData.accum;
//   } else if (statename == "Perlis") {
//     data["Not Vaccinated"] =
//       perlis_population - stateData.accum < 0
//         ? 0
//         : perlis_population - stateData.accum;
//   } else if (statename == "Pulau Pinang") {
//     data["Not Vaccinated"] =
//       ppinang_population - stateData.accum < 0
//         ? 0
//         : ppinang_population - stateData.accum;
//   } else if (statename == "Sabah") {
//     data["Not Vaccinated"] =
//       sabah_population - stateData.accum < 0
//         ? 0
//         : sabah_population - stateData.accum;
//   } else if (statename == "Sarawak") {
//     data["Not Vaccinated"] =
//       sarawak_population - stateData.accum < 0
//         ? 0
//         : sarawak_population - stateData.accum;
//   } else if (statename == "Selangor") {
//     data["Not Vaccinated"] =
//       elangor_population - stateData.accum < 0
//         ? 0
//         : selangor_population - stateData.accum;
//   } else if (statename == "Terengganu") {
//     data["Not Vaccinated"] =
//       terengganu_population - stateData.accum < 0
//         ? 0
//         : terengganu_population - stateData.accum;
//   } else if (statename == "W.P. Kuala Lumpur") {
//     data["Not Vaccinated"] =
//       kl_population - stateData.accum < 0 ? 0 : kl_population - stateData.accum;
//   } else if (statename == "W.P. Labuan") {
//     data["Not Vaccinated"] =
//       labuan_population - stateData.accum < 0
//         ? 0
//         : labuan_population - stateData.accum;
//   } else if (statename == "W.P. Putrajaya") {
//     data["Not Vaccinated"] =
//       putrajaya_population - stateData.accum < 0
//         ? 0
//         : putrajaya_population - stateData.accum;
//   }

//   delete stateData.accum; // we do not want to show total accumulation on vaccination in chart
//   if (stateData["Not Vaccinated"] == 0) {
//     // if all are vaccinated, remove the data from being plotted
//     delete stateData["Not Vaccinated"];
//   }

//   return stateData;
// }
//getVaxData();

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
    //console.log(columns[10]);
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
