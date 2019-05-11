
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
var pos = 0, test, question, choice, chA, chB, chC, año, chD, chE, chF, año = 0;
var questions = [
    ["¿Cuales de estos generos preferis hoy?", "Comedia", "Drama", "Romance", "Terror", "Animación", "Acción"],
    ["¿Con quien o quienes te encontras hoy?", "Pareja", "Amigos/as", "Hijos, sobrinos, hermanos pequeños, etc", "Mejor solo que mal acompañado"],
    ["¿Cuál es tu rango de edad?", "5-13", "13-18", "18-30", "+30"],
    ["¿Cómo te sentis?", "De buen humor", "Triste", "De mal humor", "Aburrido"]
];

function _(x){
    return document.getElementById(x);
}

function renderQuestion(){ /*permite que se vea la pregunta y opciones en el documento*/
    test = _("test");
    question = questions [pos] [0];
    chA = questions [pos] [1];
    chB = questions [pos] [2];
    chC = questions [pos] [3];
    chD = questions [pos] [4];
    chE = questions [pos] [5];
    chF = questions [pos] [6];
    test.innerHTML = "<h3 class= 'pregunta'>" + question + "</h3>";
    test.innerHTML += "<input type='radio' name='choices' value= 'A' class= 'respuesta'>" + chA + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value= 'B' class= 'respuesta'>" + chB+ "<br>";
    test.innerHTML += "<input type='radio' name='choices' value= 'C' class= 'respuesta'>" + chC+ "<br>";
    test.innerHTML += "<input type='radio' name='choices' value= 'D' class= 'respuesta'>" + chD+ "<br>";
    opcionEsiHay()
    opcionFsiHay()
    
    if(pos == 0){
      test.innerHTML += "<button onclick ='saveAnswer()'> Siguiente </button>"
    }
    else if(pos == 3){
      test.innerHTML += "<div class='botones-cuest'><button onclick ='regresarAnterior()'> Anterior </button><button onclick ='saveAnswerAndContinue()'> Siguiente </button></div>"
    } 
    else{
      test.innerHTML += "<div class='botones-cuest'><button onclick ='regresarAnterior()'> Anterior </button><button onclick ='saveAnswer()'> Siguiente </button></div>";
    }
}

//funcion para poder agregar opciones

function opcionEsiHay(){
  if(questions[pos].length == 6){
    test.innerHTML += "<input type='radio' name='choices' value= 'E' class= 'respuesta'>" + chE + "<br>";
  }
}
function opcionFsiHay(){
  if(questions[pos].length == 7){
    test.innerHTML += "<input type='radio' name='choices' value= 'E' class= 'respuesta'>" + chE + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value= 'F' class= 'respuesta'>" + chF + "<br>";
  }
}

//funciones para volver a la anterior pregunta
function regresarAnterior(){
  respuestas.pop() 
  pos = pos - 1
  renderQuestion()
}
function regresarAnteriorB(){
  respuestas.pop() 
  pos = 3
  renderQuestion()
}
function otroRegresarAnterior(){
  respuestas.pop()
  test.innerHTML = "<h3 class= 'pregunta'>" + "Ingresé un año" + "</h3>";
  test.innerHTML += "<p>" + "Ingresar un año entre 1960 y 2019" + "</p>";
  test.innerHTML +="<input type=number id='añoPeli'>"
  test.innerHTML += "<div class='botones-cuest'><button onclick ='regresarAnteriorB()'> Anterior </button><button onclick ='saveAnswerandFinalizar()'> Siguiente </button></div>"
}

function saveAnswer(){
  choices = document.getElementsByName('choices');
  for(var i = 0; i < choices.length; i++){
      if(choices[i].checked){
          choice = choices[i].value;
      }
  }
  respuestas.push(choice) /*guarda opcion elegida en el array respuestas*/
  pos++; /*pasa a la siguiente pregunta*/
  renderQuestion();
}
renderQuestion(); //llamo a la función


function saveAnswerAndContinue(){
    choices = document.getElementsByName('choices');
    for(var i = 0; i < choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
      }
    }
    respuestas.push(choice);
    test.innerHTML = "<h3 class= 'pregunta'>" + "Ingresé un año" + "</h3>";
    test.innerHTML += "<p>" + "Ingresar un año entre 1960 y 2019" + "</p>";
    test.innerHTML +="<input type=number id='añoPeli' min='1960' max='2019'>"
    test.innerHTML += "<div class='botones-cuest'><button onclick ='regresarAnteriorB()'> Anterior </button><button onclick ='saveAnswerandFinalizar()'> Siguiente </button></div>"
    
  }

  function saveAnswerandFinalizar(){
    año = document.getElementById('añoPeli').value;
    respuestas.push(año);
    //agrego ultima "pregunta"
    test.innerHTML = "<h3 class= 'pregunta'>" + "Elegi idioma original de la pelicula" + "</h3>";
    test.innerHTML += "<p>" + "Ej. si elige ingles, obtendra peliculas cuyo pais de origen es de habla inglesa"+ "</p>"
    test.innerHTML += "<input type=radio value='A' class='respuesta' name='choices'>" + "Español" + "<br>"
    test.innerHTML += "<input type=radio value='B' class='respuesta' name='choices'>" + "Ingles" + "<br><br>"
    test.innerHTML += "<div class='botones-cuest'><button onclick ='otroRegresarAnterior()'> Anterior </button><button onclick = 'finalizar()'> Terminar </button></div>"; 
  }
  
  function finalizar(){
    //guardar ultima respuesta
    choices = document.getElementsByName('choices');
    for(var i = 0; i < choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
      }
    }
    respuestas.push(choice);
    comprobarEdad()
    comprobarGenero()
    comprobarCompañia()
    comprobarIdiomaOriginal() 
    test.innerHTML = "<button onclick='recargar()'>Volver a intentar</button>";
    //llamo api
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=12c6e1405056db13448e019bb1d0f4e9&sort_by=popularity.desc&include_adult='+ adultos + '&include_video=false&page=1&primary_release_year='+ año +'&vote_average.gte=5&with_genres='+ genreIds+ '&language=es'+ '&with_original_language=' + idiomaOrigin)
  .then(function(resultado) {
    return resultado.json();
  })
  .then(function(prueba) {
    /* me devuelve un array de objetos, cada objeto es una pelicula con su data*/
    var path= prueba.results[0].poster_path
    path = path.slice(0, -4);
    test.innerHTML += "<h3 class='titulo-respuesta'>"+ prueba.results[0].title +"</h3>";
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

  function recargar(){
    respuestas = []
    genreIds = []
    pos = 0
    renderQuestion()
  }

  



/*api key 12c6e1405056db13448e019bb1d0f4e9*/

//comprobaciones 
var genreIds = []; // array de generos
var adultos = comprobarEdad();
var idiomaOrigin = comprobarIdiomaOriginal()


function comprobarEdad(){
  if(respuestas[2] == "A"){
    adultos= false
    genreIds.push(10751) // agrega el id para peliculas con clasificacion familia
  }
  else{
    adultos=true
  }
}
function comprobarGenero(){ 
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
    case "E":
    genero = 16;
    break;
    case "F":
    genero = 28;
    break;
  }
  genreIds.push(genero)
}

function comprobarCompañia(){
  switch(respuestas[1]){
    case "C":
    genreIds.push(10751);
    break;// agrega el id para peliculas con clasificacion familia
  }
}

function comprobarIdiomaOriginal() {
  switch(respuestas[5]){
    case "A":
      idiomaOrigin = 'es';
      break;
      case "B":
      idiomaOrigin = 'en'
      break;
  }
}



