
// ====================== Pruebas base - Setear un texto en DOM =========================

const colorMuestra = "darkgoldenrod";

const cssRoot = document.styleSheets[0].cssRules[0].style;
const colorOculta = cssRoot.getPropertyValue('--main-color');  // oculta pintando del mismo color que main.


function DisplayPalabra(palabra){
    let espacioPalabra = document.getElementById("palabra");
    espacioPalabra.textContent = palabra;   
}


function MostrarOcultarHombre(muestra){
    DibujoCabeza(muestra);
    DibujoTronco(muestra);
    DibujoBrazoIzq(muestra);
    DibujoBrazoDer(muestra);
    DibujoPiernaIzq(muestra);
    DibujoPiernaDer(muestra);
}

function DibujoCabeza(muestra){
    let dibujo = document.getElementById("cabeza");
    MostrarOcultar(dibujo, muestra)
}

function DibujoTronco(muestra){
    let dibujo = document.getElementById("cuerpo");
    MostrarOcultar(dibujo, muestra)
}

function DibujoBrazoIzq(muestra){
    let dibujo = document.getElementById("brazoIzq");
    MostrarOcultar(dibujo, muestra)
}

function DibujoBrazoDer(muestra){
    let dibujo = document.getElementById("brazoDer");
    MostrarOcultar(dibujo, muestra)
}

function DibujoPiernaIzq(muestra){
    let dibujo = document.getElementById("piernaIzq");
    MostrarOcultar(dibujo, muestra)
}

function DibujoPiernaDer(muestra){
    let dibujo = document.getElementById("piernaDer");
    MostrarOcultar(dibujo, muestra)
}

function MostrarOcultar(parte, muestra){
    if (muestra) {
        parte.style.backgroundColor = colorMuestra;
    }else{
        parte.style.backgroundColor = colorOculta;
    }
}

function TextoFin(estado){
    let resultado = document.getElementById("resultado");
    if (estado === 2){
        resultado.textContent = "G A N A S T E !!!";
    }else if(estado === 1){
        resultado.textContent = "Perdiste... la palabra era: " + palabraElegida;
    }else{
        resultado.textContent = "";
    }
}

function SetFocusOnLetra(){
    document.getElementById("letraInput").focus();
}

function BorraLetra(){
    let letra = document.getElementById("letraInput"); 
    letra.value="";
}