const count = 10;
const API_KEY = config.API_KEY_ID;
const targetURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

//fetch api

async function getPhotos(){

  try{
    const response = await fetch(targetURL);
    const data = await response.json();
    console.log(data);
  }catch(err){

  }
}


getPhotos();