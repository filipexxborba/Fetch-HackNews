const requestTopPub = fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
const loader = '<div class="loader"></div>'

function requestTop(){
    requestTopPub
    .then(result => result.json())
    .then(body => {
        if(document.getElementsByClassName('loader').length)document.querySelector('.loader').outerHTML = "";
        body.splice(10,500);
        body.forEach((item) => {
            let requestPub = fetch("https://hacker-news.firebaseio.com/v0/item/" + item + ".json?print=pretty");
            requestPub
            .then(result => result.json())
            .then(body => {
                componentBuilder(body.title, body.url, body.by);
            })
        })
    });
}

requestTop();

function componentBuilder(title, url, autor){
    let constructor = '<div class="card"><h1>' + title + '</h1><p>' + autor + '</p><a href="' + url + '" target="blank">Continue</a></div>';
    let body = document.querySelector('.conteudos');
    body.insertAdjacentHTML('afterbegin', constructor);
}
