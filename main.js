let baseURL = 'https://api.spacexdata.com/v3/launches/next';
let numDays = document.querySelector('div.num-days');
let numHours = document.querySelector('div.num-hours');
let numMins = document.querySelector('div.num-mins');
let numSec = document.querySelector('div.num-secs');
let headingDiv = document.querySelector('div.heading');
let about = document.querySelector('div.about-content');
let rocketId = document.querySelector('div.rock-id');
let rocketType = document.querySelector('div.rock-type');
let rocketRecov = document.querySelector('div.rock-recov');
let rocketReuse = document.querySelector('div.rock-reuse')
let liveVideo = document.querySelector('iframe.live');
let payType = document.querySelector('div.pay-type');
let payMass = document.querySelector('div.pay-mass');
let payOrb = document.querySelector('div.pay-orb')
let payOrbType = document.querySelector('div.pay-orb-type')
let missionName;
let newName;
let launchDateUnix;
let lbs = ' lbs';

fetch(baseURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        // console.log(json)
        displayResults(json);
    })

function displayResults(json) {
    //ABOUT PARAGRAPH
    let details = json.details;
    let cont = document.createElement('div');
    cont.textContent = details;
    about.appendChild(cont)

    //MISSION NAME 
    missionName = json.mission_name;
    newName = missionName.slice(0, -7)
    let title = document.createElement('div');
    title.textContent = newName;
    headingDiv.appendChild(title);

    //COUNTDOWN UNIX TIMER
    launchDateUnix = json.launch_date_unix;
    timer(launchDateUnix);

    //ROCKET ID
    let id = json.rocket.rocket_id;
    rocketId.textContent = id;

    //ROCKET TYPE
    let type = json.rocket.rocket_type;
    rocketType.textContent = type;

    //ROCKET RECOVERY
    let recov = json.rocket.fairings.recovery_attempt;
    rocketRecov.textContent = recov;

    //ROCKET REUSE
    let reuse = json.rocket.fairings.reused;
    rocketReuse.textContent = reuse;

    //LIVE VIDEO
    let live = json.links.video_link;
    liveVideo.src = live;

    //PAYLOAD TYPE
    let pType = json.rocket.second_stage.payloads[0].payload_type;
    payType.textContent = pType;

    //PAYLOAD MASS
    let mass = json.rocket.second_stage.payloads[0].payload_mass_lbs;
    payMass.textContent = mass + lbs;

    //PAYLOAD ORBIT
    let orbit = json.rocket.second_stage.payloads[0].orbit_params.reference_system;
    payOrb.textContent = orbit;

    //PAYLOAD ORBIT TYPE
    let orbitType = json.rocket.second_stage.payloads[0].orbit
    payOrbType.textContent = orbitType;
}

function timer() {
    var deadline = new Date("June 1, 2019 15:37:25").getTime();

    var x = setInterval(function () {

        var now = new Date().getTime();
        var t = deadline - now;
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        numDays.textContent = days;
        numHours.textContent = hours;
        numMins.textContent = minutes;
        numSec.textContent = seconds;
        if (t < 0) {
            // clearInterval(x);
        }
    }, );

}

$("nav").find("a").click(function (e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    });
});