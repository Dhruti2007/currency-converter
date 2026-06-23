const BASE_URL = "https://open.er-api.com/v6/latest/USD";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// for (let code in countryList){
//     console.log(code);
// }


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value =  currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";

        }
        select.append(newOption);
    }


select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; 
    let img =  element.parentElement.querySelector("img");
    img.src = newSrc;
};

// btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtValue = amount.value;
//     console.log(amtValue);
//     if(amtValue === "" || amtValue < 1){
//         amtValue =1;
//         amount.value = "1";
//     }

//     // console.log(fromCurr.value, toCurr.value);
//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     console.log(data);
//     let rate =
// });




btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;

    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }

    try {
        let response = await fetch(BASE_URL);
        let data = await response.json();

        console.log(data); // Show full API response

        let fromRate = data.rates[fromCurr.value];
        let toRate = data.rates[toCurr.value];

        let convertedAmount = (amtValue / fromRate) * toRate;

        console.log(
            `${amtValue} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`
        );

        document.querySelector(".msg").innerText =
            `${amtValue} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`;

    } catch (error) {
        console.log("Error:", error);
    }
});

