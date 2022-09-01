const loadPhone = async(searchText, dataLimite) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimite)
}

const displayPhone = (getPhone, dataLimite) =>{
    // console.log(getPhone)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    //show 10 phone 
    const showAll = document.getElementById('show-all');
    if(dataLimite && getPhone.length > 10){
        getPhone = getPhone.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

    // display no found massage
    const noFound = document.getElementById('no-found-massage');
    if(getPhone.length === 0){
      noFound.classList.remove('d-none')
    }
    else{
      noFound.classList.add('d-none')
    }

    for(const phone of getPhone){
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML =`
        
                <div class="card p-4">
                  <img src="${phone.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.slug}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" href='#' class = "btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detais</button>
                  </div>
                </div>             
        `;
        phoneContainer.appendChild(phoneDiv)
    };
    // stop loder 
        toggleSpinner(false)
}

const proccess = (dataLimite) =>{
    // star loder
    toggleSpinner(true); 
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhone(searchFieldValue, dataLimite)
}

document.getElementById('btn-search').addEventListener('click', function(){
    proccess(10)
});

// show phone with Enter Key press
document.getElementById('search-field').addEventListener('keypress', function (e){
    // console.log(e.key)
    if(e.key === 'Enter'){
      proccess(10)
    }
})

const toggleSpinner = isLoding =>{
    const loderSection = document.getElementById('loder');
    if(isLoding){
        loderSection.classList.remove('d-none')
    }
    else{
        loderSection.classList.add('d-none')
    }
};

document.getElementById('btn-show-all').addEventListener('click', function(){
    proccess();
});


const loadPhoneDetails =async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
};

const displayPhoneDetails = phone =>{
  console.log(phone)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Relaise Date : ${phone.releaseDate ? phone.releaseDate : 'no data found'}</p>
        <p>Memory : ${phone.mainFeatures ? phone.mainFeatures.memory : 'no data found'}</p>
    `;
}

loadPhone('apple')