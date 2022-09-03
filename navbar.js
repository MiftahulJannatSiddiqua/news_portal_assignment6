const loadNavBar=() =>{
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data=> displayNavBars(data.data.news_category));
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
        fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data=>dataStore(data.data));
    }
    
  const  dataStore= data =>{
    const navContainer = document.getElementById('chokinar-ma');
    console.log(data);
    data.forEach(storeTheData=>{
        const newsDiv=document.createElement('div')
        navPharagraph.innerHTML=`
        <div id="green"></div> 
        <div id="news-details"></div>
        `;
    })
  }