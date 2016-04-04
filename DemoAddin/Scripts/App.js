'use strict';

var Colegas = window.Colegas || {};

//Colegas.App = function () {

var personasList;
var personas;
var context;

function init() {
    context = SP.ClientContext.get_current();
    getAllPersonas();
}

var getAllPersonas = function () {
    personasList = context.get_web().get_lists().getByTitle("Personas");
    personas = personasList.getItems(new SP.CamlQuery());
    context.load(personas);
    context.executeQueryAsync(onPersonasSuccess, onPersonasFail);
};
var onPersonasSuccess = function (sender, args) {
    var html = "<ul>";
    var personasEnum = personas.getEnumerator();

    while (personasEnum.moveNext()) {
        var actual = personasEnum.get_current();

        html += "<li>" + actual.get_item("Nombre") + " " +
            actual.get_item("Edad") + "</li>";
    }
    html += "</ul>";
    $("#lista").html(html);
};
var onPersonasFail = function (sender, args) {
    alert("Error:" + args.get_message());
};

var crearPersona = function () {
    var itemCreateInfo = new SP.ListItemCreationInformation();
    var actual = personasList.addItem(itemCreateInfo);
    actual.set_item("Nombre", $("#input-nombre").val());
    actual.set_item("Edad", $("#input-edad").val());
    actual.update();
    context.load(actual);
    context.executeQueryAsync(onCreateSuccess, onPersonasFail);
};
var onCreateSuccess = function (sender, args) {
    getAllPersonas();
};
/* return {
     getPersonas: getAllPersonas,
     createPersona: crearPersona,
     init: init
 }*/
//}
$(document).ready(function () {
    $("#btn-add").bind("click", crearPersona);
    ExecuteOrDelayUntilScriptLoaded(
        function () {
            init();
        }
        , "sp.js");
});

//'use strict';

//var Amix = window.Personas || {}; //creo un objeto personas (no tiene nada que ver con la lista) y el objeto personas me lo recuperas del objeto windows.personas, 
//                                     //si existe lo recupero si no existe me lo creas (esto lo hace al poner las llaves vacias).


////Esto seria como una especie de clase
////Amix.App = function () {
   
//    //objetos publicos a nivel de app
//    var personasList;
//    var personas;
//    var context;

//    var init = function () {//lo meto en una funcion para estar convencido que el context, se carga correctamente.
//        context = SP.ClientContext.get_current();
//        getAllPersonas();

//    };

//    var onPersonasSuccess = function (sender, args) {//sender objeto que genera la llamada al evento, args argumentos que vamos a manejar en la peticion
//        var html = "<ul>";
//        var personasEnum = personas.getEnumerator(); //enumeracion de todos los items

//        while (personasEnum.moveNext()) {
//            var actual = personasEnum.get_current();

//            html += "<li>" + actual.get_item("Nombre") + " " + actual.get_item("edad") + "</li>";
//        }
//        html += "</ul>";
//        $("#lista").html(html);
//    };

//    var onPersonasFail = function (sender, args) {
//        alert("Error" + args.get_message());
//    };


//    //funcion que me devuelve todas las personas de la lista
//    var getAllPersonas = function () {
//        personasList = context.get_web().get_lists().getByTitle("Personas");//get_web detalles de la aplicacion web, get_lists me da el conjutno de listas de la aplicacion, 
//                                                                           //getbytitle me das la lista personas
//        personas = personasList.getItems(new SP.CamlQuery());
//        context.load(personas);//le dice al contexto que meta esa peticion al context para la siguiente query.
//        context.executeQueryAsync(onPersonasSuccess, onPersonasFail);// y ahora vete y haz la peticion a la api para devolverme los datos. si todo va bien va por el success, si no por onpersonasfail

//    };

   
    
//    var crearPersona = function () {
//        var itemCreateInfo = new SP.ListItemCreationInformation();
//        var actual = personasList.addItem(itemCreateInfo);
//        actual.set_item("Nombre", $("#input-nombre").val());
//        actual.set_item("Edad", $("#input-edad").val());
//        actual.update();
//        context.load(actual);
//        context.executeQueryAsync(onCreateSuccess, onPersonasFail);
//    };

//    var onCreateSuccess = function (sender, args) {
//        getAllPersonas();
//    };

//    //return {//devuelvo un objeto json defino los elementos privados a publicos
//    //    //getpersonas:nombre funcion / getAllpersonas: 
//    //    getPersonas: getAllPersonas,
//    //    createpersona: crearPersona,
//    //    init: init
//    //};
////};

//$(document).ready(function () {
//    $("#btn-add").bind("click", crearPersona);
//    ExecuteOrDelayUntilScriptLoaded(
//        function(){
//           init();
//        }
//        , "sp.js");
//});





//function initializePage()
//{
//    var context = SP.ClientContext.get_current();
//    var user = context.get_web().get_currentUser();

//     This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
//    $(document).ready(function () {
//        getUserName();
//    });

//     This function prepares, loads, and then executes a SharePoint query to get the current users information
//    function getUserName() {
//        context.load(user);
//        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
//    }

//     This function is executed if the above call is successful
//     It replaces the contents of the 'message' element with the user name
//    function onGetUserNameSuccess() {
//        $('#message').text('Hello ' + user.get_title());
//    }

//     This function is executed if the above call fails
//    function onGetUserNameFail(sender, args) {
//        alert('Failed to get user name. Error:' + args.get_message());
//    }
//}
