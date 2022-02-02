// store using ImmutableJS
let store = Immutable.Map({
//   user: Immutable.Map({ name: 'cosmonaut' }),
  // apod: '',
  selectedRover: "Curiosity",
  rovers: ['Curiosity', 'Opportunity', 'Spirit'],
  roverInfo: Immutable.Map(''),
// rovers: ["curiosity", "opportunity", "spirit"],
// roverInfo: []
});


// adds our markup to the page
const root = document.getElementById("root");


// updates Immutable store object
const updateStore = (state, newState) => {
    const store = state.merge(newState);
    render(root, store);
  };

  const render = async (root, state) => {
    root.innerHTML = App(state);
  };
  
  //  Listens for load before Javascript loads
  window.addEventListener("load", () => {
    getRoverImage(store, store.get('rovers')[0]);
    getRoverInfo(store.get("selectedRover"));
    render(root, store);
  });
  

// Dashboard components
const tabs = (store) => {
  const tabBtns = () => store.get('rovers');
  tabBtns.map((el, index) =>
    {  return    `<button class='btn-tab' onClick='displayRoverInfo(${el[index]})'>${el}</button>`;
    }).join('');
    
};

// function changeIndex(selectedRover)
// button for each rover- displays info in sidebar and main section onclick. displayRoverInfo renders sidebar

const displayRoverInfo = (store) => {
     const roverPanel = store.get('roverInfo').map(info => sidebar(info));
};

const sidebar = (store, state) => {

    const roverData = state.photo_manifest;
    // const roverBar = roverData.map(info => 
        (
            `
            <h2>${roverData.name}</h2>
            <ul>
            <li><span>Launch Date:</span> ${roverData.launch_date} </li>
            <li><span>Landing Date:</span> ${roverData.landing_date} </li>
            <li><span>Status:</span> ${roverData.status} </li>
            <li><span>Date of last image taken:</span> ${roverData.max_date} </li>
            </ul>`
        )
    // );
};


            
const dashboard = (sidebar, tabs, imageGallery) => {
    ` 
    <section>
  <aside class='sidebar green'>${sidebar}</aside>
  <article class='main-content'>
  <div class='tabs-container>
  <div class='btn-container>${tabs}</div>
  <div class='tabs-panel>
  ${imageGallery}
  </div>
  </div>
  </article>
  </section>
  `;
};



const imageGallery = (store) => {

    // picture of selected rover here
  const imageGallery = store.get("rovers").map((info) => info.latest_photos).join('');

};


// App higher order function
const App = (state) => {

    ${Greeting(store.get('user').get('name'))}
  const rovers = state.get("selectedRover");
//   const roverInfo = state.get("roverInfo");



 return dashboard(sidebar, tabs, store.get("rovers").map((info) => info.latest_photos).join(''));
};

// listening for load event because page should load before any JS is called

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.

// const roverSelection = (rover) => {
//     rover !== 'curiosity' ?  rover : 'Curiosity'
// };

// Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {

//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(apod.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());
//     if (!apod || apod.date === today.getDate() ) {
//         getImageOfTheDay(store)
//     }

//     // check if the photo of the day is actually type video!
//     if (apod.media_type === "video") {
//         return (`
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `)
//     } else {
//         return (`
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `)
//     }
// }

// Pure function that renders conditional information
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Dear ${name}, welcome to the Mars dashboard!</h1>
        `
    }
    return `
        <h1>Hello!</h1>
    `
}


// ------------------------------------------------------  API CALLS

// Example API call

// const getImageOfTheDay = (state) => {
//     let { apod } = state

//     fetch(`http://localhost:3000/apod`)
//     .then(res => res.json())
//     .then(apod => updateStore(store, { apod }))

//     return data
// }

// const roverInfo = (store, selectedRover) => {
//     if (selectedRover !== 'curiosity') {
//         updateStore(store, { selectedRover})
//     } return {
//         selectedRover === 'Curiosity'
//     }
// }

// const selectedRoverImg = (store) => {
//     const selectedRoverImg = (store).store.get('rovers').map(photo => (`<img src'=${img_src}'>`)
//     )}



// Rover api calls
const getRoverImage =  (store, rover) => {
    //   let { rovers } = store;
      const images = fetch(`http://localhost:3000/rovers/${rover}`)
        .then((res) => res.json())
        .then((rovers) => console.log(rovers))
        .then((rovers) => updateStore(store, { rovers }));
        // return roverData;
    };
 

const getRoverInfo =  ( chosenRover) => {
    const roverInfo = fetch(`http://localhost:3000/manifests/${chosenRover}`)
        .then((res) => res.json())
        .then((roverInfo) => console.log(roverInfo))
      
        .then((roverInfo) => updateStore(store, { roverInfo }));
    // return roverInfo;
  };



