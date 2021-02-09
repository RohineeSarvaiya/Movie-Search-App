


var buttonElement=document.querySelector("#searchbtn");
var inputElement=document.querySelector("#inputtype");
var movieSearchable=document.querySelector("#movie-searchable");
var movieContainer=document.querySelector("#movie-container");




function movieSection(movies){
    return movies.map((movie) => {
        if(movie.poster_path){
        return `<img src=${img_url+movie.poster_path} data-movie-id=${movie.id}/>`;}
    })

}


function createMoviecontainer(movies, title='') {
    var movieElement= document.createElement('div');
    movieElement.setAttribute('class','movie');

    var movieTemplate =`
        <h2>${title}</h2>
        <section class="section">
            ${ 
                movieSection(movies)
            }
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML=movieTemplate
    return movieElement;

}
function renderMovies(data){
    
        var movies=data.results;
        var movieBlock = createMoviecontainer(movies, this.title);
        movieContainer.appendChild(movieBlock);
}


function renderSearchmovies(data){
    
    movieSearchable.innerHTML='';
    var movies=data.results;
    var movieBlock = createMoviecontainer(movies);
    movieSearchable.appendChild(movieBlock);
     console.log('Data : ', data);
 

}



function handleError(error){
    console.log('Error :', error);
}

buttonElement.onclick =function(event){
    event.preventDefault();
    var value=inputElement.value;

    searchMovie(value);
     
    inputElement.value='';     
         
    console.log("value : ", value);
}


function createIframe(video){
    var iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${video.key}`;
    iframe.width=360;
    iframe.height=315;
    iframe.allowFullscreentrue;

    return iframe;

}

function createVideoTemplate(data,content)
{
    content.innerHTML='<p id="content-close" class=>X</p>'

    console.log('Videos :',data);

    var videos=data.results;
    var length =videos.length > 4 ? 4 : videos.length;
    var iframeContainer=document.createElement('div');


    for(let i=0 ; i< length ; i++)
    {
        var video=videos[i];
        var iframe=createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
 }

document.onclick = function(event){
    var target=event.target;
    if(target.tagName.toLowerCase()=='img')
    {
        console.log('Event :', event);
        var movieId=target.dataset.movieId;
        console.log('Movie Id :',movieId);
        var section=event.target.parentElement;
        var content=section.nextElementSibling;
        content.classList.add('content-display');
        console.log('Hello world');

                                                                                                    
        var path=`/movie/${movieId}videos`;
        var url=generateurl(path);

        fetch(url)
         .then((res) => (res.json()))
         .then((data) =>createVideoTemplate(data,content))
         .catch((error)=>{
             console.log('Error :', error);
         });
    }

    if(target.id=='content-close')
    {
        var content=target.parentElement;
        content.classList.remove('content-display');
    }
}

searchMovie('Batman');
getUpcomingMovie();
getpopularMovie();
gettopratedMovie();
  