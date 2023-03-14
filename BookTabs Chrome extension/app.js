let myLeads = [];
let inputBtn = document.querySelector('#input-btn');
const inputEl = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-el');
const deleteBtn = document.querySelector('#delete-btn');
const tabBtn = document.querySelector('#tab-btn');
//Getting the items from localStorage and parsing it (to arrays again) 
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads);
}


//Listening for clicks on tabBtn. to log out the url on tabs

tabBtn.addEventListener('click', () => {
    //console.log(tabs[0].url);
    
    //Grabing the url of the chrome/browser extension
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads',JSON.stringify(myLeads));
        render(myLeads);

    })
    
    
})


function render(leads) {
    let listItems = '';
    for (let i = 0; i < leads.length; i++){
       listItems += `
       <li>
       <a href='${leads[i]}' target='_blank' > ${leads[i]} </a>
       </li>`;
    }
    
    ulEl.innerHTML = listItems;
    
}


deleteBtn.addEventListener('dblclick', () => {
    console.log('double ckicked')
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

//1.checking if leadFromLocalStorage is truthy,
//2. If so, set myLeads to its value and call renderLeads()

inputBtn.addEventListener('click', () => {

    myLeads.push(inputEl.value);
    inputEl.value = ''
    
    localStorage.setItem('myLeads',JSON.stringify(myLeads))
    console.log(localStorage.getItem('myLeads'))
    render(myLeads);
})
