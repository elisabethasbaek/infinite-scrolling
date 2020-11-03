var offset = 0;
var count;


function catchEmAll(offset){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + offset)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            //console.log(data);

            let template = document.querySelector("#character"); //template-tag
            let characterList = document.querySelector(".characterList"); //ul-tag
            count = data.count;

            data.results.forEach(function(result) {
                let clone = template.content.cloneNode(true);

                clone.querySelector(".character").innerText = result.name; //li-tag
                characterList.appendChild(clone);
            });

            var lastChild = document.querySelector(".characterList li:last-child");
            observer.observe(lastChild);
        })
};


var observer = new IntersectionObserver(function(entries){
    if(entries[0].intersectionRatio <= 0) return;

    observer.unobserve(entries[0].target);
    offset = offset + 10;

    if(offset > count) return;

    catchEmAll(offset);
    
}, { threshold: 1 });


catchEmAll(offset);









/* function callback(entries){
    //console.log(entries);
    
    let {target, intersectionRatio} = entries[0];
    
    if(intersectionRatio >= 1){
        target
    }
}; */

/* let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector(".characterList li:last-child")); */
