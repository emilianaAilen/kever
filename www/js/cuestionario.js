//cuestionario A

var respuestasB = []
var genresTv = []
var testB = 0
var pos = 0
var chA, chB, chC, chD, chE, chF, question, noGenres, choices = 0;
var preguntas = [
  ["¿Cuales de estos generos te gusta más?", "Comedia", "Drama", "Ciencia ficción", "Animación", "Acción", "Crimen"],
  ["¿Con quien o quienes vas a mirar la serie?", "Pareja", "Amigos/as", "Hijos, sobrinos, hermanos pequeños, etc", "Mejor solo que mal acompañado"],
  ["¿Cuál es tu rango de edad?", "5-13", "13-18", "18-30", "+30"],
  ["Elige país/es de origen", "Estados Unidos", "Brasil y Portugal", "España y Latinoámerica", "Japón"]
];


function _(x){
    return document.getElementById(x);
}


function renderQuestionB(){ 
testB = _("testB");
question = preguntas [pos] [0];
chA = preguntas[pos] [1];
chB = preguntas [pos] [2];
chC = preguntas [pos] [3];
chD = preguntas [pos] [4];
chE = preguntas [pos] [5];
chF = preguntas [pos] [6];
testB.innerHTML = "<h3 class= 'pregunta'>" + question + "</h3>";
testB.innerHTML += "<input type='radio' name='choicesB' value= 'A' class= 'respuesta'>" + chA + "<br>";
testB.innerHTML += "<input type='radio' name='choicesB' value= 'B' class= 'respuesta'>" + chB+ "<br>";
testB.innerHTML += "<input type='radio' name='choicesB' value= 'C' class= 'respuesta'>" + chC+ "<br>";
testB.innerHTML += "<input type='radio' name='choicesB' value= 'D' class= 'respuesta'>" + chD+ "<br>";
opcionEsiHay()
opcionFsiHay()
if(pos == 0){
  testB.innerHTML += "<button onclick ='saveAnswerB()'> Siguiente </button>"
    }
else if(pos == 3){
  testB.innerHTML += "<div class='botones-cuest'><button onclick ='regresarAnterior()'> Anterior </button><button onclick ='finalizar()'> Terminar </button></div>"
    } 
else{
  testB.innerHTML += "<div class='botones-cuest'><button onclick ='regresarAnterior()'> Anterior </button><button onclick ='saveAnswerB()'> Siguiente </button></div>"
    }
}

function saveAnswerB(){
choices = document.getElementsByName('choicesB');
for(var i = 0; i < choices.length; i++){
    if(choices[i].checked){
        choice = choices[i].value;
    }
}
respuestasB.push(choice) /*guarda opcion elegida en el array respuestas*/
pos++; /*pasa a la siguiente pregunta*/
renderQuestionB();
}
renderQuestionB();


function opcionEsiHay(){
    if(preguntas[pos].length == 6){
      testB.innerHTML += "<input type='radio' name='choicesB' value= 'E' class= 'respuesta'>" + chE + "<br>";
    }
  }
  function opcionFsiHay(){
    if(preguntas[pos].length == 7){
      testB.innerHTML += "<input type='radio' name='choicesB' value= 'E' class= 'respuesta'>" + chE + "<br>";
      testB.innerHTML += "<input type='radio' name='choicesB' value= 'F' class= 'respuesta'>" + chF + "<br>";
    }
  }
  
  //funciones para volver a la anterior pregunta
  function regresarAnterior(){
    respuestasB.pop(); 
    pos = pos - 1;
    renderQuestionB();
  }

  function finalizar(){
    choices = document.getElementsByName('choicesB');
    for(var i = 0; i < choices.length; i++){
    if(choices[i].checked){
        choice = choices[i].value;
    }
}
respuestasB.push(choice)
    comprobarEdad()
    comprobarGenero()
    comprobarCompañia()
    filtrar()
    if(respuestasB[3] == "C"){
      var p = 'es';
    }
    else if(respuestasB[3] == "A"){
      p = 'en';
    }
    else if(respuestasB[3] == "B"){
      p = 'pt';
    }
    else{
      p = 'ja';
    }
    
    testB.innerHTML = "<button onclick='recargar()'>Volver a intentar</button>";
    //llamo api
    fetch('https://api.themoviedb.org/3/discover/tv?api_key=12c6e1405056db13448e019bb1d0f4e9&language=es&sort_by=popularity.desc&page=1&with_genres=' + genresTv + '&include_null_first_air_dates=false'+'&without_genres=' + noGenres+ '&with_original_language='+ p)
  .then(function(resultado) {
    return resultado.json();
  })
  .then(function(prueba) {
    console.log(prueba);
    /* me devuelve un array de objetos, cada objeto es una pelicula con su data*/
    var path= prueba.results[0].poster_path
    path = path.slice(0, -4);
    testB.innerHTML += "<h3 class='titulo-respuesta'>"+ prueba.results[0].name +"</h3>";
      testB.innerHTML += "<p class='text-peli'>"+ prueba.results[0].overview +"</p>";
      testB.innerHTML += "<img src='https://image.tmdb.org/t/p/w500"+path+".jpg' class='portadaPeli'></img>";
    for(var i = 1; i < 3; i++){
      var path= prueba.results[i].poster_path
      path = path.slice(0, -4); //para sacarle el .jpg a la url
      testB.innerHTML += "<h3 class='titulo-respuesta'>"+ prueba.results[i].name +"</h3>";
      testB.innerHTML += "<p class='text-peli'>"+ prueba.results[i].overview +"</p>";
      testB.innerHTML += "<img src='https://image.tmdb.org/t/p/w500"+path+".jpg' class='portadaPeli'></img>";
   }
  });
  }


  
  
  
  function recargar(){
    respuestasB = [];
    genresTv = [];
    pos = 0;
    renderQuestionB();
  }
  function comprobarEdad(){
    if(respuestasB[2] == "A"){
      genresTv.push(10762);// agrega el id para series con genero kids
    }
  }

  function comprobarGenero(){ 
    var generos = 0//variable Local
    switch(respuestasB[0]){
      case "A": 
      generos = 35;
      break;
      case "B": 
      generos = 18;
      break;
      case "C": 
      generos = 10765;
      break;
      case "D": 
      generos = 16;
      break;
      case "E":
      generos = 10759;
      break;
      case "F":
      generos = 80;
      break;
    }
    genresTv.push(generos);
  }
  
  function comprobarCompañia(){
    switch(respuestasB[1]){
      case "C":
      genresTv.push(10751);
      break;// agrega el id para peliculas con clasificacion familia
    }
  }
  function filtrar(){
    if(respuestasB[0] == "A"){
      noGenres= 16;
    }
    else{
      noGenres = 0;
    }
  }