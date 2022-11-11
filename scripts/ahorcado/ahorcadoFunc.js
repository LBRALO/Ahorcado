const listaPalabrasBasicas = ["murcielago", "marsupial", "helicoptero", "automata", "hiperbola", "legumbre", "uniforme", "entrepiso"];
const listaPlanetasStarWars = [];
let planetasDisponibles = false;
GetPlanetasData();


let palabraElegida;
let letrasAcertadas = [];

const MAX_ERRORES = 6;
let errores = 0;

function ResetAhorcado(){
    MostrarOcultarHombre(false);
    TextoFin(0);
    errores = 0;

    palabraElegida = ElegirPalabra();
    letrasAcertadas = InicializarLetrasAcertadas(); 
    
    DisplayPalabra(PalabraVisible()); 
    SetFocusOnLetra(); 
}

function LetraRecibida(letra){
    BorraLetra();
    acertada = ValidarLetraIngresada(letra);
    if(acertada === 0){
        MostrarHorca(errores); 
        errores++;
    }else{
        DisplayPalabra(PalabraVisible());
    }
    if(errores >= MAX_ERRORES || acertada === 2){
        TextoFin(acertada === 2 ? 2 : 1);
    }
}


function MostrarHorca(errores){
    switch (errores) {
        case 0:
            DibujoCabeza(true);
            break;
        case 1:
            DibujoTronco(true);
            break;
        case 2:
            DibujoBrazoIzq(true);
            break;
        case 3:
            DibujoBrazoDer(true);
            break;
        case 4:
            DibujoPiernaIzq(true);
            break;
        case 5:
            DibujoPiernaDer(true);
            break;
        default:
            break;
    }
}

function ValidarLetraIngresada(letra){
    // devuelve:  0 si no encontro la letra
    //            1 si encontro la letra
    //            2 si encontro la letra pero ademas termino de acertar la palabra
    let acertada = 0;
    for(let i = 0; i < palabraElegida.length; i++){
        if(letra.toUpperCase() === palabraElegida[i].toUpperCase()){          
            letrasAcertadas[i] = true;
            acertada = 1; 
        }
    }
    if (PalabraCompleta()){
        acertada = 2;  
    }
    return acertada;
}

function PalabraCompleta(){
    resultado = true;
    for(let i = 0; i < letrasAcertadas.length; i++){
        if(letrasAcertadas[i] === false){
            resultado = false;
        }
    }
    return resultado;
}

function InicializarLetrasAcertadas(){
    letrasAcertadas = [];
    for(let i = 1; i <= palabraElegida.length; i++){
        letrasAcertadas.push(false);
    }
    return letrasAcertadas; 
}

function PalabraVisible(){
    let resultado = "";
    for(let i = 0; i < palabraElegida.length; i++){
        if(letrasAcertadas[i]){
            resultado += palabraElegida[i];
        }else{
            resultado += "_";
        }
        if(i < palabraElegida.length){
            resultado += " ";
        }
    }
    return resultado;
}

function ElegirPalabra(){
    listaPalabrasPosibles = [...listaPalabrasBasicas];
    if (planetasDisponibles) {
        let incluir = document.querySelector("#chkboxPlanetas").checked;
        console.log("incluir:", incluir);
        if (incluir) listaPalabrasPosibles.push(...listaPlanetasStarWars);
    }

    return listaPalabrasPosibles[getRndInteger(0, listaPalabrasPosibles.length)];
}



function GetPlanetasData(){
    fetch("http://swapi.dev/api/planets/")
          .then((response) => response.json())
          .then((jsonPlanetas => CargaListaPlanetas(jsonPlanetas)))
    
    
    function CargaListaPlanetas(jsonPlanetas){
        for (let i =0; i < jsonPlanetas.results.length; i++){
            let nombrePlaneta = jsonPlanetas.results[i].name;
            if (!nombrePlaneta.includes(" "))
                listaPlanetasStarWars.push(nombrePlaneta);  // Solo planetas de una sola palabra
        }
        HabilitaPlanetas();     
    }
}

function HabilitaPlanetas(){
    // solo cuando estan cargados los planetas permito seleccionar si se incluyen o no
    // mientras tanto puede jugar con las palabras basicas

    planetasDisponibles = true;
    
    const checks = document.createElement("span");
    checks.innerHTML = `<h3 id="incluye" class="incluye">Incluir</h3>`;
    const checkPlanetas = document.createElement("span");
    checkPlanetas.innerHTML = `<label for= "chkboxPlanetas"> <input type="checkbox" id="chkboxPlanetas" value="first_checkbox"> Planetas StarWars </label>`;
    
    incluir = document.querySelector(".espacioIncluye");  
    incluir.append(checks);
    incluir.append(checkPlanetas); 
}