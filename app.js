const Base_Url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";
const dropdowns = document.querySelectorAll(".dropdown select")
for(let select of dropdowns){
    for(let country in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        if(select.name === "from" && country === "USD"){
            newOption.selected = "selected";
        }
        if(select.name==="to" && country === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt)=>{
        changeFlag(evt.target);
    });
}

const changeFlag = (Element)=>{
    let countryCode = countryList[Element.value];
    let newFlag = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flag = Element.parentElement.querySelector("img");
    flag.src = newFlag;
    
};