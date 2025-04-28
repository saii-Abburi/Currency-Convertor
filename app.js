const Base_Url = "https://api.frankfurter.app/latest?";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let country in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = country;
    newOption.value = country;
    if (select.name === "from" && country === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && country === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    changeFlag(evt.target);
    defaultvalue(fromCurr.value, toCurr.value, 1);
  });
}

const changeFlag = (Element) => {
  let countryCode = countryList[Element.value];
  let newFlag = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let flag = Element.parentElement.querySelector("img");
  flag.src = newFlag;
};

const defaultvalue = async (from, to , amtVal) => {
  const data = await fetchAmount(amtVal);
  msg.innerHTML = `${amtVal} ${fromCurr.value} = ${data} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  defaultvalue(fromCurr.value , toCurr.value , amtVal);
});
const fetchAmount = async (amtVal) => {
  const url = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  let response = await fetch(url);
  const data =await response.json()
  console.log(data.rates[toCurr.value]);
  return data.rates[toCurr.value];
};

