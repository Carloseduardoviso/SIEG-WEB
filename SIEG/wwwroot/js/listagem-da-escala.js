$(function () {
    "use strict"

    window.ListagemDaEscala = window.ListagemDaEscala || {};


    ListagemDaEscala.Eventos = function () {
        $('.select2').select2()
        $('.select2bs4').select2({
            theme: 'bootstrap4'
        });
    };
    ListagemDaEscala.Eventos();
});

