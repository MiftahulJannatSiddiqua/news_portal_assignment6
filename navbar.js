const loadNavBar = async () => {
    try{
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        displayNavBars(data.data.news_category)
    }
    catch(error){
        console.log(error);
    }

}

  const displayNavBars = navbar =>{
    // for(const navBar of navbar){
      // console.log(navbar);
    // }
    const nabBarContainer = document.getElementById('nav-bar');
    navbar.forEach( nav => {
        console.log(nav);
        const navbarUl = document.createElement('ul');
        navbarUl.classList.add('navbar');
        navbarUl.innerHTML=`
        <li onclick="loadData('${nav.category_id}')">${nav.category_name}</li>`;
        nabBarContainer.appendChild(navbarUl);
    });
 }
 loadNavBar();
 function loadData(category_id){
    const spinnerview= document.getElementById('spinner');
        spinnerview.classList.remove('d-none');
        fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data=>dataStore(data.data));
    }
    
  const  dataStore= data =>{
   // console.log(data)
   const errorMessage=document.getElementById('error-news');
    const navContainer = document.getElementById('chokinar-ma');
    if(data.length == 0){
        const allNews=document.getElementById('text-section');
        allNews.classList.add('d-none');
        errorMessage.classList.remove('d-none');
        navContainer.textContent='';
        const spinnerview= document.getElementById('spinner');
        spinnerview.classList.add('d-none');
    }
    else{
        const allNewsFound =document.getElementById('span-number');
        allNewsFound.innerText=data.length;
        const allNews=document.getElementById('text-section');
        allNews.classList.remove('d-none');
        errorMessage.classList.add('d-none');
        const navContainer = document.getElementById('chokinar-ma');
        navContainer.textContent='';
        navContainer.innerHTML=``; 
        console.log(data);
        data.forEach(storeTheData=>{
        console.log(storeTheData);
        const newsDiv=document.createElement('div')
        const niewDetails= storeTheData.details;
        const detailsContainer=niewDetails.substring(0,200)+'...'
        newsDiv.classList.add('displayFlex')
        newsDiv.innerHTML=`
        <div>
       <img src="${storeTheData.thumbnail_url}">
        </div>
        <div class="display">
            <div class="heading_paper"><h3>${storeTheData.title}</h3><p>${detailsContainer}</p></div>
            <div class="flex-display"><strong ><img class="author-img" src="${storeTheData.author.img}"</strong>
           <strong class="m-2">${storeTheData.author.name}<span class="m-2">${storeTheData.author.published_date}</span></strong>
           <strong> <i class="fa-solid fa-eye"></i>${storeTheData.total_view}</strong>
           
           <button onclick="loadNewsId('${storeTheData._id}')" style="font-size: 15px;" class="m-2 btn btn-primary bg-dark text-light p-1" data-bs-toggle="modal" data-bs-target="#exampleModal">more</button>
          
           </div>
        </div>
        
        `;
        const spinnerview= document.getElementById('spinner');
        spinnerview.classList.add('d-none');
        navContainer.appendChild(newsDiv);
    })
    }
    
  }
  loadData('03');
//===================================
  function loadNewsId(news_id){
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    .then(res => res.json())
    .then(data=>displayLoadNews(data.data));
}
const displayLoadNews=(modals)=> {
    const newsModalId=document.getElementById('modal-details');
    newsModalId.innerHTML=``;
    modals.forEach(modal => {
        const divContainer = document.createElement('div');
        divContainer.innerHTML=`
        <div>
       <img src="${modal.thumbnail_url}">
        </div>
        <div class="display">
            <div class="heading_paper"><h3>${modal.title}</h3><p>${modal.details}</p></div>
            <div class="flex-display"><div><img class="author-img" src="${modal.author.img}"</div>
           <div><h4>${modal.author.name}</h4><span>${modal.author.published_date}</span></div>
           <div>${modal.total_view}</div>        
           </div>
        </div>
        
        `;
        newsModalId.appendChild(divContainer);
        console.log(modal);
    });
   
}
loadNewsId();