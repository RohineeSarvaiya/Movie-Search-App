var api_key ='733dae5df0070a3460088f1c0f6ff318';
var img_url='https://image.tmdb.org/t/p/w500';


function generateurl(path)
{
    var url=`https://api.themoviedb.org/3${path}?api_key=733dae5df0070a3460088f1c0f6ff318`;
    return url;

}

function requestMovie(url, onComplete, onError)
{
    fetch(url)
    .then((res) => (res.json()))
    .then(onComplete)
    .catch(onError);
    
}

function searchMovie(value)
{
    var path="/search/movie";
    var url=generateurl(path)+"&query="+value;
    requestMovie(url,renderSearchmovies,handleError);
}

function getUpcomingMovie()
{
    var path="/movie/upcoming";
    var url=generateurl(path);

    var rend=renderMovies.bind({title : "UpComing Movies"});
    requestMovie(url,rend,handleError);
}

function getpopularMovie()
{
    var path="/movie/popular";
    var url=generateurl(path);
    var rend=renderMovies.bind({title : "Popular Movies"});
    requestMovie(url,rend,handleError);
}

function gettopratedMovie()
{
    var path="/movie/top_rated";
    var url=generateurl(path);
    var rend=renderMovies.bind({title : "Top-rated Movies"});
    requestMovie(url,rend,handleError);
}