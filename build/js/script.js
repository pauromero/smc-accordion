
const loadJSON = (callback) => {

    const data = new XMLHttpRequest();

    data.overrideMimeType("application/json");
    data.open('GET', '../data/data.json', true);
    data.onreadystatechange = function () {

        if (data.readyState == 4 && data.status == "200")
            callback(data.responseText);
    };

    data.send(null);
}

const init = () => {

    loadJSON(function(response) {

        const dataJSON = JSON.parse(response);
        generateAccordion(dataJSON);
    });

}

init();

const generateAccordion = (data) => {

    let accordion;

    data.forEach(elem => {

        accordion = "<dt class='ComponentAccordion-title' onclick='componentClick(this)'>"
        + elem.obj.title +
        "</dt><dd class='ComponentAccordion-content'><p>"
        + elem.obj.content +
        "</p></dd>";

        document.getElementById('ComponentAccordion').innerHTML += accordion;

    });
}

const hasClass = (element, cls) => {

    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

const componentClick = (elem) => {

    const acc = document.getElementsByClassName( 'ComponentAccordion-title' );
    const titleClicked = elem;
    const contentDeployed = elem.nextElementSibling;

        //If titleClicked is clicked and have class 'is-active', close the accordion
        if ( hasClass(titleClicked, 'is-active' ) ) {

            titleClicked.classList.remove( 'is-active' );
            contentDeployed.style.maxHeight = null;

            return;
        }

      for ( var i = 0; i < acc.length; i++ ) {

          if ( hasClass( acc[i], 'is-active' )) {

              //Remove the classes so that all open accordions are hidden
              acc[i].classList.remove( 'is-active' );
              acc[i].nextElementSibling.style.maxHeight = null;
              //Add classes to show the clicked element
              titleClicked.classList.add( 'is-active' );
              contentDeployed.style.maxHeight = contentDeployed.scrollHeight + "px";

          } else {
              //Add classes to show the clicked element
              titleClicked.classList.add( 'is-active' );
              contentDeployed.style.maxHeight = contentDeployed.scrollHeight + "px";
          }
      }
}
