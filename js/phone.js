const loadPhone = async (inpText, isShow) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inpText}`);
    const data = await res.json();
    const phone = data.data;
    phones(phone, isShow)
    // console.log(phone)

}
const phones = (phone, isShow) => {
    const showAll = document.getElementById("showAll")
    if (phone.length > 20 && !isShow === true) {
        showAll.classList.remove("hidden")
    }
    else {
        showAll.classList.add("hidden")
    }
    if
        (!isShow === true) {
        phone = phone.slice(1, 20)
    }

    const cardHolder = document.getElementById("cardHolder")
    cardHolder.innerText = ""
    phone.forEach((element) => {
        const newDiv = document.createElement("div");
        newDiv.classList = `card bg-base-100 shadow-xl`;
        newDiv.innerHTML = `
                <figure class="px-10 pt-10">
                    <img src="${element.image}" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${element.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                        <button onclick="showDetail('${element.slug}')" id="${element.slug}" class="btn btn-primary">Show Details</button>
                    </div>
                </div>
                `;
        cardHolder.appendChild(newDiv)
    })
    loader(false)
}
function handler(isShow) {
    loader(true)
    const inpField = document.getElementById("inpField").value;
    loadPhone(inpField, isShow)
}
function loader(isLoad) {
    const loader = document.getElementById("loader");
    if (isLoad === true) {
        loader.classList.remove("hidden")
    }
    else {
        loader.classList.add("hidden")
    }
}
function showAllBtn() {
    handler(true)
}

const showDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const finalData = data.data;
    showModal(finalData)
}

const showModal = (singlePhoneData) => {
    console.log(singlePhoneData)
    const phoneName = document.getElementById("modalPhoneName");
    const PhoneStorage = document.getElementById("modalStorage");
    phoneName.innerText = singlePhoneData.name;
    PhoneStorage.innerText = `Storage: ${singlePhoneData.mainFeatures.storage}`;
    my_modal_5.showModal()
}