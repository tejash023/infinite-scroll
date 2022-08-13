const loader = document.querySelector('.loader');
const imageContainer = document.querySelector('.image-container');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];


const count = 11;
const API_KEY = config.API_KEY_ID;
const targetURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

//check if all images are loaded
function imageLoaded(){
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
}
//helper function for set Attributes
function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  
  //run function for each element in an array
  photosArray.forEach((photo) => {
  //create <a> tag for target img
  const item = document.createElement('a');
  // item.setAttribute('href',photo.links.html);
  // item.setAttribute('target','_blank');

  setAttributes(item,{
    href : photo.links.html,
    target: '_blank',
  });

  //create img tag for images
  const img = document.createElement('img');
  

  setAttributes(img, {
    src:  photo.urls.regular,
    alt:  photo.alt_description,
    title:photo.description,
  });

  //event listener load check when each is finished loading
  img.addEventListener('load', imageLoaded);

  //append img tag to a
  item.appendChild(img);
  imageContainer.appendChild(item);



  })
}

//fetch api

async function getPhotos(){

  try{
    const response = await fetch(targetURL);
    photosArray = await response.json();
    displayPhotos();
  }catch(err){

  }
}

//implement infinite scroll
window.addEventListener('scroll', () =>{
  
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
    
  }

});

//onload
getPhotos();
