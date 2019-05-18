let baseURL = 'https://api.spacexdata.com/v3/launches/next';
// let img = document.querySelector('img.wallpaper');
// let img = document.querySelector('div.view');
let numDays = document.querySelector('div.num-days');
let numHours = document.querySelector('div.num-hours');
let numMins = document.querySelector('div.num-mins');
let numSec = document.querySelector('div.num-secs');
let headingDiv = document.querySelector('div.heading');
let missionName;
let newName;
let about = document.querySelector('div.about-content');
let launchDateUnix;
let countdown;
let liveVideo;
let rocketImage;
let upcomingLaunchInfo;
let endTime;

fetch(baseURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        console.log(json)
        displayResults(json);
    })

function displayResults(json) {
    upcomingLaunchInfo = json;
    //ABOUT PARAGRAPH
    let details = upcomingLaunchInfo.details;
    let cont = document.createElement('div');
    cont.textContent = details;
    about.appendChild(cont)
    //MISSION NAME 
    missionName = upcomingLaunchInfo.mission_name;
    newName = missionName.slice(0, -7)
    let title = document.createElement('div');
    title.textContent = newName;
    headingDiv.appendChild(title);
    //COUNTDOWN UNIX TIMER
    launchDateUnix = upcomingLaunchInfo.launch_date_unix;
    timer(launchDateUnix);
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