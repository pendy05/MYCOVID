<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>COVID-19 Status in Malaysia Based on State</title>

    <script src="function.js"></script>
    <!--Chart.js CDN (Content Delivery Network) -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <!--Chart.js Date Adapter CDN (Content Delivery Network) -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js">
    </script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.js"></script
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>>-->
    <!--Link to CSS file-->

    <link rel="stylesheet" href="css/style.css" />
</head>

<body>
    <?php
    
        date_default_timezone_set('Asia/Kuala_Lumpur');//set timezone to Malaysia timezone
        echo date('H:i:s');
        if(date('H:i:s') == "00:00:00"){ //update at 12:00am
            file_put_contents("data/cases_state.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv"));
            file_put_contents("data/deaths_state.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/deaths_state.csv"));
            file_put_contents("data/hospital.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/hospital.csv"));
            file_put_contents("data/vax_state.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/vaccination/vax_state.csv"));
            file_put_contents("data/vax_malaysia.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/vaccination/vax_malaysia.csv"));
        } 

    ?>
    <!--Nav bar section starts here-->
    <div class="parent">
        <nav id="navbar">
            <div class="logo">
                <a href="#Home"><img src="images/logo.png" alt="Web Logo" class="image-responsive" /></a>
            </div>
            <a href="#Home">Home</a>
            <a href="#Vaccination">Vaccination</a>
            <a href="#Summary">Summary</a>
            <div class="animation start-home"></div>
        </nav>
    </div>

    <!--Nav bar section ends here-->
    <div class="container"><br /><br /></div>
    <!--Header section starts here-->
    <section class="header" id="Home">
        <div class="container">
            <div style="display: inline-block">
                <h1>MYCOVID-19</h1>
            </div>
            <div style="
            display: inline-block;
            vertical-align: middle;
            text-align: right;
            width: 85%;
          ">
                <img src="images/malaysia-flag.png" alt="Web Logo" style="width: 5%; height: 5%" />
            </div>
            <h4>
                Website for data and insights on COVID-19 situation in Malaysia.
            </h4>
        </div>
    </section>
    <!--Header section ends here-->

    <!--Overview section starts here-->

    <section class="overview">

        <div class="container" id="Vaccination">
            <div class="container-95">
                <div class="container-100">
                    <div class="container60">
                        <div style="display: inline-block">
                            <h4>Vaccinated Population</h4>
                        </div>
                        <div style="display: inline-block; vertical-align: middle">
                            <img src="images/vaccine.png" alt="vaccine logo" style="width: 5%; height: 5%" />
                        </div>
                        <p style="font-size: small">Malaysia</p>
                    </div>
                    <div class="container33">
                        <p style="font-size: small; text-align: right" id="overview-date"></p>
                    </div>
                    <div class="clearfix"></div>
                </div>


                <div class="container60">
                    <br /><br />
                    <table class="nth-table" id="overview-table" width="90%">
                        <tr>
                            <td>Daily - Administration</td>
                            <td>Total - Administration</td>
                        </tr>
                        <tr class="spaceUnder">
                            <td>
                                <h3 id="daily_a">+</h3>
                            </td>
                            <td>
                                <h3 id="total_a">+6000</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>Daily - First Dose</td>
                            <td>Total - First Dose</td>
                        </tr>
                        <tr class="spaceUnder">
                            <td>
                                <h3 id="daily_f">+6000</h3>
                            </td>
                            <td>
                                <h3 id="total_f">+6000</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>Daily - Second Dose</td>
                            <td>Total - Second Dose</td>
                        </tr>
                        <tr class="spaceUnder">
                            <td>
                                <h3 id="daily_s">+6000</h3>
                            </td>
                            <td>
                                <h3 id="total_s">+6000</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>Daily - Booster</td>
                            <td>Total - Booster</td>
                        </tr>
                        <tr class="spaceUnder">
                            <td>
                                <h3 id="daily_b">+ 6,000</h3>
                            </td>
                            <td>
                                <h3 id="total_b">+ 6,000</h3>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="container33">
                    <canvas id="stackedBar" width="100" height="100"></canvas>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>

        </div>

    </section>
    <!--Overview section ends here-->

    <!--Summary section starts here-->
    <section class="summary" id="Summary">

        <div class="container">
            <div class="container-95">
                <div class="container-100">

                    <div class="container60">
                        <div style="display: inline-block">
                            <h4>Summary</h4>
                        </div>
                        <div style="display: inline-block; vertical-align: middle">
                            <img src="images/report.png" alt="Web Logo" style="width: 5%; height: 5%" />
                        </div>
                        <p style="font-size: small">At A Glance</p>
                    </div>
                    <div class="container33">
                        <p style="font-size: small; text-align: right" id="summary-date"></p>
                    </div>
                    <div class="clearfix"></div>

                    <br>
                    <div class="clearfix"></div>
                    <div style="width: 99%; margin-left: auto; margin-right: auto">
                        <table width="100%" border="1px" style="border-collapse:collapse;">
                            <tr>
                                <th class="width-lg">
                                    <div style="display: inline">States</div>
                                    <div style="display: inline; vertical-align: middle">
                                        <img src="images/states-1.png" alt="Web Logo" style="width: 18%; height: 18%" />
                                    </div>
                                </th>
                                <th class="text-right">
                                    Cases
                                    <p style="font-weight: lighter; font-size: smaller">
                                        7 days average
                                    </p>
                                </th>
                                <th class="text-right">
                                    Trend
                                    <p style="font-weight: lighter; font-size: smaller">
                                        Past 7 days
                                    </p>
                                </th>
                                <th class="text-right">
                                    Hospital <br />Admission
                                    <p style="font-weight: lighter; font-size: smaller">
                                        7 days average
                                    </p>
                                </th>
                                <th class="text-right">
                                    Trend
                                    <p style="font-weight: lighter; font-size: smaller">
                                        Past 7 days
                                    </p>
                                </th>
                                <th class="text-right">
                                    Recovered<br />
                                    Case
                                    <p style="font-weight: lighter; font-size: smaller">
                                        7 days average
                                    </p>
                                </th>
                                <th class="text-right">
                                    Trend
                                    <p style="font-weight: lighter; font-size: smaller">
                                        Past 7 days
                                    </p>
                                </th>
                                <th class="text-right">
                                    Deaths
                                    <p style="font-weight: lighter; font-size: smaller">
                                        7 days average
                                    </p>
                                </th>
                                <th class="text-right">
                                    Trend
                                    <p style="font-weight: lighter; font-size: smaller">
                                        Past 7 days
                                    </p>
                                </th>
                            </tr>
                            <tr>
                                <td>Johor</td>
                                <td class="text-right" id="johor-cases"></td>
                                <td class="text-right" id="johor-caseT"></td>
                                <td class="text-right" id="johor-hospitalA"></td>
                                <td class="text-right" id="johor-hospitalT"></td>
                                <td class="text-right" id="johor-recovered"></td>
                                <td class="text-right" id="johor-recoveredT"></td>
                                <td class="text-right" id="johor-deaths"></td>
                                <td class="text-right" id="johor-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Kedah</td>
                                <td class="text-right" id="kedah-cases"></td>
                                <td class="text-right" id="kedah-caseT"></td>
                                <td class="text-right" id="kedah-hospitalA"></td>
                                <td class="text-right" id="kedah-hospitalT"></td>
                                <td class="text-right" id="kedah-recovered"></td>
                                <td class="text-right" id="kedah-recoveredT"></td>
                                <td class="text-right" id="kedah-deaths"></td>
                                <td class="text-right" id="kedah-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Kelantan</td>
                                <td class="text-right" id="kltn-cases"></td>
                                <td class="text-right" id="kltn-caseT"></td>
                                <td class="text-right" id="kltn-hospitalA"></td>
                                <td class="text-right" id="kltn-hospitalT"></td>
                                <td class="text-right" id="kltn-recovered"></td>
                                <td class="text-right" id="kltn-recoveredT"></td>
                                <td class="text-right" id="kltn-deaths"></td>
                                <td class="text-right" id="kltn-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Melaka</td>
                                <td class="text-right" id="mlk-cases"></td>
                                <td class="text-right" id="mlk-caseT"></td>
                                <td class="text-right" id="mlk-hospitalA"></td>
                                <td class="text-right" id="mlk-hospitalT"></td>
                                <td class="text-right" id="mlk-recovered"></td>
                                <td class="text-right" id="mlk-recoveredT"></td>
                                <td class="text-right" id="mlk-deaths"></td>
                                <td class="text-right" id="mlk-deathsT"></td>
                            </tr>
                            <tr>
                                <td>N. Sembilan</td>
                                <td class="text-right" id="n9-cases"></td>
                                <td class="text-right" id="n9-caseT"></td>
                                <td class="text-right" id="n9-hospitalA"></td>
                                <td class="text-right" id="n9-hospitalT"></td>
                                <td class="text-right" id="n9-recovered"></td>
                                <td class="text-right" id="n9-recoveredT"></td>
                                <td class="text-right" id="n9-deaths"></td>
                                <td class="text-right" id="n9-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Pahang</td>
                                <td class="text-right" id="pahang-cases"></td>
                                <td class="text-right" id="pahang-caseT"></td>
                                <td class="text-right" id="pahang-hospitalA"></td>
                                <td class="text-right" id="pahang-hospitalT"></td>
                                <td class="text-right" id="pahang-recovered"></td>
                                <td class="text-right" id="pahang-recoveredT"></td>
                                <td class="text-right" id="pahang-deaths"></td>
                                <td class="text-right" id="pahang-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Perak</td>
                                <td class="text-right" id="perak-cases"></td>
                                <td class="text-right" id="perak-caseT"></td>
                                <td class="text-right" id="perak-hospitalA"></td>
                                <td class="text-right" id="perak-hospitalT"></td>
                                <td class="text-right" id="perak-recovered"></td>
                                <td class="text-right" id="perak-recoveredT"></td>
                                <td class="text-right" id="perak-deaths"></td>
                                <td class="text-right" id="perak-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Perlis</td>
                                <td class="text-right" id="perlis-cases"></td>
                                <td class="text-right" id="perlis-caseT"></td>
                                <td class="text-right" id="perlis-hospitalA"></td>
                                <td class="text-right" id="perlis-hospitalT"></td>
                                <td class="text-right" id="perlis-recovered"></td>
                                <td class="text-right" id="perlis-recoveredT"></td>
                                <td class="text-right" id="perlis-deaths"></td>
                                <td class="text-right" id="perlis-deathsT"></td>
                            </tr>
                            <tr>
                                <td>P. Pinang</td>
                                <td class="text-right" id="ppinang-cases"></td>
                                <td class="text-right" id="ppinang-caseT"></td>
                                <td class="text-right" id="ppinang-hospitalA"></td>
                                <td class="text-right" id="ppinang-hospitalT"></td>
                                <td class="text-right" id="ppinang-recovered"></td>
                                <td class="text-right" id="ppinang-recoveredT"></td>
                                <td class="text-right" id="ppinang-deaths"></td>
                                <td class="text-right" id="ppinang-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Sabah</td>
                                <td class="text-right" id="sabah-cases"></td>
                                <td class="text-right" id="sabah-caseT"></td>
                                <td class="text-right" id="sabah-hospitalA"></td>
                                <td class="text-right" id="sabah-hospitalT"></td>
                                <td class="text-right" id="sabah-recovered"></td>
                                <td class="text-right" id="sabah-recoveredT"></td>
                                <td class="text-right" id="sabah-deaths"></td>
                                <td class="text-right" id="sabah-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Sarawak</td>
                                <td class="text-right" id="srwk-cases"></td>
                                <td class="text-right" id="srwk-caseT"></td>
                                <td class="text-right" id="srwk-hospitalA"></td>
                                <td class="text-right" id="srwk-hospitalT"></td>
                                <td class="text-right" id="srwk-recovered"></td>
                                <td class="text-right" id="srwk-recoveredT"></td>
                                <td class="text-right" id="srwk-deaths"></td>
                                <td class="text-right" id="srwk-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Selangor</td>
                                <td class="text-right" id="slngr-cases"></td>
                                <td class="text-right" id="slngr-caseT"></td>
                                <td class="text-right" id="slngr-hospitalA"></td>
                                <td class="text-right" id="slngr-hospitalT"></td>
                                <td class="text-right" id="slngr-recovered"></td>
                                <td class="text-right" id="slngr-recoveredT"></td>
                                <td class="text-right" id="slngr-deaths"></td>
                                <td class="text-right" id="slngr-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Terengganu</td>
                                <td class="text-right" id="trg-cases"></td>
                                <td class="text-right" id="trg-caseT"></td>
                                <td class="text-right" id="trg-hospitalA"></td>
                                <td class="text-right" id="trg-hospitalT"></td>
                                <td class="text-right" id="trg-recovered"></td>
                                <td class="text-right" id="trg-recoveredT"></td>
                                <td class="text-right" id="trg-deaths"></td>
                                <td class="text-right" id="trg-deathsT"></td>
                            </tr>
                            <tr>
                                <td>KL</td>
                                <td class="text-right" id="kl-cases"></td>
                                <td class="text-right" id="kl-caseT"></td>
                                <td class="text-right" id="kl-hospitalA"></td>
                                <td class="text-right" id="kl-hospitalT"></td>
                                <td class="text-right" id="kl-recovered"></td>
                                <td class="text-right" id="kl-recoveredT"></td>
                                <td class="text-right" id="kl-deaths"></td>
                                <td class="text-right" id="kl-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Labuan</td>
                                <td class="text-right" id="labuan-cases"></td>
                                <td class="text-right" id="labuan-caseT"></td>
                                <td class="text-right" id="labuan-hospitalA"></td>
                                <td class="text-right" id="labuan-hospitalT"></td>
                                <td class="text-right" id="labuan-recovered"></td>
                                <td class="text-right" id="labuan-recoveredT"></td>
                                <td class="text-right" id="labuan-deaths"></td>
                                <td class="text-right" id="labuan-deathsT"></td>
                            </tr>
                            <tr>
                                <td>Putrajaya</td>
                                <td class="text-right" id="ptjy-cases"></td>
                                <td class="text-right" id="ptjy-caseT"></td>
                                <td class="text-right" id="ptjy-hospitalA"></td>
                                <td class="text-right" id="ptjy-hospitalT"></td>
                                <td class="text-right" id="ptjy-recovered"></td>
                                <td class="text-right" id="ptjy-recoveredT"></td>
                                <td class="text-right" id="ptjy-deaths"></td>
                                <td class="text-right" id="ptjy-deathsT"></td>
                            </tr>
                        </table>
                        <br>
                    </div>
                </div>
            </div>
    </section>
    <!--TimeLine graphs section ends here-->

    <!--Footer section starts here-->
    <section class="footer">
        <div class="text-center">
            <p>
                &copy; All Rights Reserved. Designed and Developed by Pendy Tok
                (1181101110)
            </p>
        </div>
    </section>
    <!--Footer section ends here-->

    <script>
    //retrieve today date
    const today = new Date();
    document.getElementById("overview-date").innerHTML =
        "Data as of " +
        today.getDate() +
        " " +
        today.toLocaleString("default", {
            month: "long"
        }) +
        " " +
        today.getFullYear() +
        "  12:00am";
    document.getElementById("summary-date").innerHTML =
        "Data as of " +
        today.getDate() +
        " " +
        today.toLocaleString("default", {
            month: "long"
        }) +
        " " +
        today.getFullYear() +
        "  12:00am";
    //console.log(today.getFullYear());
    //console.log(today.toLocaleString("default", { month: "long" }));
    //console.log(today.getDate());
    /*vaccination data per state*/
    drawStackedBar();

    /*vaccination overview data*/
    (async () => {
        const {
            daily_administration,
            daily_firstdose,
            daily_seconddose,
            daily_booster,
            total_administration,
            total_firstdose,
            total_seconddose,
            total_booster,
        } = await getVaxMYData();
        //console.log(daily_booster);
        document.getElementById("daily_a").innerHTML =
            "+ " + daily_administration;
        document.getElementById("daily_f").innerHTML = "+ " + daily_firstdose;
        document.getElementById("daily_s").innerHTML = "+ " + daily_seconddose;
        document.getElementById("daily_b").innerHTML = "+ " + daily_booster;
        document.getElementById("total_a").innerHTML = total_administration;
        document.getElementById("total_f").innerHTML = total_firstdose;
        document.getElementById("total_s").innerHTML = total_seconddose;
        document.getElementById("total_b").innerHTML = total_booster;
    })();

    /*summary table*/
    (async () => {
        const stateData = await getSummaryData();
        statenicknames = [
            "johor",
            "kedah",
            "kltn",
            "mlk",
            "n9",
            "pahang",
            "perak",
            "perlis",
            "ppinang",
            "sabah",
            "srwk",
            "slngr",
            "trg",
            "kl",
            "labuan",
            "ptjy",
        ];
        statenames = [
            "Johor",
            "Kedah",
            "Kelantan",
            "Melaka",
            "Negeri Sembilan",
            "Pahang",
            "Perak",
            "Perlis",
            "Pulau Pinang",
            "Sabah",
            "Sarawak",
            "Selangor",
            "Terengganu",
            "W.P. Kuala Lumpur",
            "W.P. Labuan",
            "W.P. Putrajaya",
        ];
        statenames.forEach((state, index) => {
            const nickname = statenicknames[index];
            //console.log(state, nickname);
            document.getElementById(nickname + "-cases").innerHTML = stateData[
                    state
                ].avgCases
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            document.getElementById(nickname + "-caseT").innerHTML =
                stateData[state].newCasesTrend;
            document.getElementById(nickname + "-hospitalA").innerHTML =
                stateData[state].avghospitalAdmission
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            document.getElementById(nickname + "-hospitalT").innerHTML =
                stateData[state].hospitalAdmissionTrend;
            document.getElementById(nickname + "-recovered").innerHTML =
                stateData[state].avgRecoveredCases
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            document.getElementById(nickname + "-recoveredT").innerHTML =
                stateData[state].recoveredCasesTrend;
            document.getElementById(nickname + "-deaths").innerHTML = stateData[
                    state
                ].avgDeaths
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            document.getElementById(nickname + "-deathsT").innerHTML =
                stateData[state].newDeathsTrend;
        });
    })();
    //console.log(vaxData);
    // let { baz, foo } = (function () {
    //   let foo = 0;
    //   var baz = 0;
    //   for (let i = 0; i <= 0; i++) {
    //     foo = 3;
    //     baz = 40;
    //   }
    //   console.log(baz);
    //   return { foo, baz };
    // })();
    // console.log(baz);

    //getVaxStatesData();
    </script>
</body>

</html>