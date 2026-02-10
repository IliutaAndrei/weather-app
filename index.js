const searchBox = document.querySelector("#search");
const descriptionResponse = document.querySelector("#description");
const temperatureResponse = document.querySelector("#temperature");
const icon = document.querySelector("img");


const searchImage = async (name) => {
    return await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=${name}`
    );
};

const searchLocation = async (location) => {
    const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=3YWB3SEFW97AN3E3A9A48UN3G`
    );
    const data = await response.json();
    const imageResponse = await searchImage(data.days[0].icon);
    const imageData = await imageResponse.json();

    descriptionResponse.textContent = data.description;
    temperatureResponse.textContent = "Now:  " + Math.round((data.days[0].temp - 32) / 1.8 * 100) / 100 + " ℃";

    icon.src = imageData.data.images.original.url;
};


searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchLocation(searchBox.value);
        icon.style.visibility = "visible";
    }
});





