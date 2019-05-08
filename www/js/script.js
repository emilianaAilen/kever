
/*ventana inico sesion*/
$("#activarLogin").click(function(){
    $("#login").css("display", "block");
    $(".ventana").css("display", "block");
    $(".container-titulo").css("position", "initial");
    $(".container-titulo h1").css("position", "initial");
    $(".boton-principal").css("position", "initial");
    $('header').css('position', 'initial');
});
$('#cerrar').click(function(){
    location.reload();
})
/*menu*/

$('#btn-menu').click(function(){
    if($('#btn-menu').attr('class') == 'icon-list'){
        $('#btn-menu').removeClass('icon-list').addClass('icon-cross'); //* va un icono de cierre*/
        $('.navegacion ul').css({'left': '0%'});
        $(".ventana").css("display", "block");
        $(".container-titulo h1").css("position", "initial");
        $(".boton-principal").css("position", "initial");
    } else{
        $('#btn-menu').removeClass('icon-cross').addClass('icon-list'); /*hace los mismo al reves*/
        $('.navegacion ul').css({'left': '-70%'});
        $(".ventana").css("display", "none");
        $(".container-titulo h1").css("position", "relative");
      $(".boton-principal").css("position", "relative");
    }
});




/*cuestionarioB*/
var respuestas = [];
var pos = 0, test, test_status, question, choice, chA, pClave, chB, chC, año, chD = 0;
var questions = [
    ["¿Cuales de estos generos preferis hoy?", "comedia", "drama", "romance", "terror"],
    ["¿Con quien o quienes te encontras hoy?", "pareja", "amigos/as", "Hijos, sobrinos, hermanos pequeños, etc", "mejor solo que mal acompañado"],
    ["¿Cuál es tu rango de edad?", "5-13", "13-18", "18-30", "+30"],
    ["¿Cómo te sentis?", "De buen humor", "triste", "de mal humor", "aburrido"]
];

function _(x){
    return document.getElementById(x);
}

function renderQuestion(){ /*permite que se vea la pregunta en el documento*/
    test = _("test");
    question = questions [pos] [0];
    chA = questions [pos] [1];
    chB = questions [pos] [2];
    chC = questions [pos] [3];
    chD = questions [pos] [4];
    test.innerHTML = "<h3 class= 'pregunta'>" + question + "</h3>";
    test.innerHTML += "<input type='radio' name='choices' value= 'A' class= 'respuesta'>" + chA + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value= 'B' class= 'respuesta'>" + chB+ "<br>";
    test.innerHTML += "<input type='radio' name='choices' value= 'C' class= 'respuesta'>" + chC+ "<br>";
    test.innerHTML += "<input type='radio' name='choices' value= 'D' class= 'respuesta'>" + chD+ "<br><br>";
    if(pos < 3){
        test.innerHTML += "<button onclick ='saveAnswer()'> Siguiente </button>";
        }
        else{
          test.innerHTML += "<button onclick ='saveAnswerAndContinue()'> Siguiente </button>";
        }
}

function saveAnswerAndContinue(){
    choices = document.getElementsByName('choices');
    for(var i = 0; i < choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
      }
    }
    respuestas.push(choice);
    test.innerHTML = "<h3 class= 'pregunta'>" + "seleccione un año" + "</h3>";
    test.innerHTML ="<input type=number id='añoPeli'>"
    test.innerHTML += "<button onclick ='saveAnswerandFinalizar()'> Terminar </button>";
    
  }

  function saveAnswerandFinalizar(){
    año = document.getElementById('añoPeli').value;
    respuestas.push(año);
    finalizar()
    
    //test.innerHTML = "<h3 class= 'pregunta'>" + "Ingresa una palabra o frase clave" + "</h3>";
    //test.innerHTML += "<input type=text id='barra-texto'>"
    //test.innerHTML += "<button onclick = 'finalizar()'> Terminar </button>"; //en la ultima pregunta se ejecuta otra funcion
  }
  
  function finalizar(){
    //var pClave = document.getElementById('barra-texto').value;
    //respuestas.push(pClave);
    comprobarEdad()
    comprobarGenero()
    comprobarCompañia()
   // comprobarIdiomaOriginal() defnir que el usuario elija el idioma original
    //llamo api
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=12c6e1405056db13448e019bb1d0f4e9&sort_by=popularity.desc&include_adult='+ adultos + '&include_video=false&page=1&primary_release_year='+ año +'&vote_average.gte=5&with_genres='+ genreIds+ '&language=es'+ '&with_original_language=en')
  .then(function(resultado) {
    return resultado.json();
  })
  .then(function(prueba) {
    /* me devuelve un array de objetos, cada objeto es una pelicula con su data*/
    var path= prueba.results[0].poster_path
    path = path.slice(0, -4);
    test.innerHTML = "<h3 class='titulo-respuesta'>"+ prueba.results[0].title +"</h3>";
      test.innerHTML += "<p class='text-peli'>"+ prueba.results[0].overview +"</p>";
      test.innerHTML += "<img src='https://image.tmdb.org/t/p/w500"+path+".jpg' class='portadaPeli'></img>";
    for(var i = 1; i < 3; i++){
      var path= prueba.results[i].poster_path
      path = path.slice(0, -4); //para sacarle el .jpg a la url
      test.innerHTML += "<h3 class='titulo-respuesta'>"+ prueba.results[i].title +"</h3>";
      test.innerHTML += "<p class='text-peli'>"+ prueba.results[i].overview +"</p>";
      test.innerHTML += "<img src='https://image.tmdb.org/t/p/w500"+path+".jpg' class='portadaPeli'></img>";
   }
  });
  }

  function saveAnswer(){
    choices = document.getElementsByName('choices');
    for(var i = 0; i < choices.length; i++){
        if(choices[i].checked){
            choice = choices[i].value;
        }
    }
    respuestas.push(choice) /*guada opcion elegida en el array respuestas*/
    pos++; /*pasa a la siguiente pregunta*/
    renderQuestion();
}
renderQuestion();



/*api key 12c6e1405056db13448e019bb1d0f4e9*/

//quiero hacer una barra de años y que el usuario filtre por año en especifico
var genreIds = []; // array de generos
var adultos = comprobarEdad();


function comprobarEdad(){
  if(respuestas[2] == "A"){
    adultos= false
    genreIds.push(10751) // agrega el id para peliculas con clasificacion familia
  }
  else{
    adultos=true
  }
}
function comprobarGenero(){ //refinar para adultos y niños, very bad things para chicos de 5-13? media pila
  var genero = 0//variable Local
  switch(respuestas[0]){
    case "A": 
    genero = 35;
    break;
    case "B": 
    genero = 18;
    break;
    case "C": 
    genero = 10749;
    break;
    case "D": 
    genero = 27;
    break;
  }
  genreIds.push(genero)
}

function comprobarCompañia(){
  if(respuestas[1]){
    genreIds.push(10751) // agrega el id para peliculas con clasificacion familia
  }
}

  

 

