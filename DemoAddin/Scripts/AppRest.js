//obtener un elemento de la lista
var getLista = function () {
    //Saber cual es la url del servicio web
    var url = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('Personas')/items";
    //?$filter=Nombre eq 'Luis' and edad lt 40;
    $.ajax({
        url: url,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success:function(res) {
            var html = "<ul>";
            $.each(res.d.results, function (i, result) {
                html += "<li>" + result.Nombre + " " + result.Edad + "</li>";
            });
            html+="</ul>"
            $("#lista").html(html);
        },
        error:function(err) {
            alert(JSON.stringify(err));
        }
    });
}
var guardaItem=function() {
    var url = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('Personas')/items";
    
    //Firma generada de forma dinamicda y mantiene un token de autenticacion.Esto esta dentro de la aplicacion de sharepoint
    var digest = $("#__REQUESTDIGEST").val();

    //Creo el objeto que voy a enviar
    var obj = {
        '__metadata': { 'type': 'SP.Data.PersonasListItem' },
        'Nombre': $("#input-nombre").val(),
        'Edad': parseInt($('#input-edad').val())
    };

    //peticion ajax
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(obj),//siempre lo que se manda por ajax hay que transformarlo a texto con el stringify
        headers: {
            'accpet':'application/json;odata=verbose',
            'content-type':'application/json;odata=verbose',
            'X-RequestDigest':digest
        },
        success:function() {
            getLista();
        },
        error:function(err) {
            alert(JSON.stringify(err));
        }
    });
}
$(document).ready(function() {
    $("#btn-add").click(function() {
        guardaItem();
        //Vaciar las cajar cuando se pulsa el boton de guardar
        $("#input-nombre").val("");
        $("#input-edad").val("");
    });
    getLista();
});