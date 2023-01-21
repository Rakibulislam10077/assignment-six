const allPhones = (searching, dataLimitation) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searching}`;
    fetch(`${url}`)
        .then(res => res.json())
        .then(data => showPhoneDisplay(data.data, dataLimitation))
};
allPhones('a')
const showPhoneDisplay = (phones, dataLimitation) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = ``;

    const nophones = document.getElementById('emptyMessage');
    if (dataLimitation, phones.length === 0) {
        nophones.classList.remove('d-none');
    }
    else {
        nophones.classList.add('d-none');
    }

    phones.forEach(phone => {
        const creatCardCon = document.createElement('div');
        creatCardCon.classList.add('col')
        creatCardCon.innerHTML = `
         <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional
                    content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-dark shadow-none" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(creatCardCon)
    });
    toggleSpinner(false);
}
const showAll = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchFieldvalue = searchField.value;
    allPhones(searchFieldvalue, dataLimit);
}


document.getElementById('search-btn').addEventListener('click', function () {
    showAll(10);
})

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loadSpinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(`${url}`)
        .then(res => res.json())
        .then(data => loadDetails(data.data))

}
const loadDetails = detail => {
    console.log(detail)
    const modalTitl = document.getElementById('phoneDetailModalLabel');
    modalTitl.innerText = detail.name;
    const phoneDetaile = document.getElementById('phone-details');
    phoneDetaile.innerHTML = `
    <img src="${detail.image}">
    <h5>brand: ${detail.brand}</h5>
    <p>MainFeatures: ${detail.mainFeatures.chipSet} 
    ${detail.mainFeatures.displaySize} 
    ${detail.mainFeatures.memory}</p>
    <p>Sensor: ${detail.mainFeatures.sensors[0]}</P>
    <p>ReleaseDate:${detail.releaseDate}</p>
    <p>Slug: ${detail.slug}</p>
    `;

}
