let url = new URLSearchParams(window.location.search);

let offset = 0;

var options = {
    threshold: [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1]
};

fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
    .then(res => res.json())
    .then(function(data) {
        console.log(data);

        let character = document.querySelector("#character"); //template
        let characterList = document.querySelector(".characterList"); //ul

        data.results.forEach(function(result) {
            let clone = character.content.cloneNode(true);
            clone.querySelector(".character").innerText = result.name;

            characterList.appendChild(clone);
        })

        function callback(entries){
            var {target, intersectionRatio, isIntersecting} = entries[0];

            console.log(entries);

            if(intersectionRatio >= 1){
                target
            }
        };

        var intersectionObserver = new IntersectionObserver(callback, options);

        intersectionObserver.observe(document.querySelector(".characterList li:last-child"));
    })