$(function () {
    "use strict"

    window.Escala = window.Escala || {};

    Escala.CarregarTelaDeInformacoesDaEscala = function () {
        const escala = Formulario.Dado.InformacaoEscala || {};

        const token = Formulario.BuscarToken();

        Formulario.IniciarCarregamento();

        $.ajax({
            method: "POST",
            url: "/Escala/Criar",
            data: { __RequestVerificationToken: token, escala },
            dataType: "html",
            success: function success(result) {
                $("#test-l-1").html(result);

            },
            complete: function complete() {
                Formulario.PararCarregamento();
                Escala.CarregarDepartamentos();
            }
        });
    };


    Escala.BuscarDepartamentosDaUnidade = function (id) {
        $.ajax({
            method: "GET",
            url: "/Escala/BuscarDepartamentosDaUnidade",
            data: { id },
            dataType: "json",
            success: function success(data) {
                $.each(data.results, function (index, value) {
                    $('#DepartamentoId').append("<option value='" + value.id + "'>" + value.text + "</option>")
                })
                console.log(data)
            },
            complete: function complete() {
                $("#DepartamentoId").selectpicker();
            }
        });
        //$.get("/Escala/BuscarDepartamentosDaUnidade", { id: id }).done(function (data) {
        //    $.each(data.results, function (index, value) {
        //        $('#DepartamentoId').append("<option value='" + value.id+"'>"+value.text+"</option>")
        //    });
        //    $("#DepartamentoId").selectpicker();
        //    console.log(data)
        //});
    };

    Escala.CarregarDepartamentos = function () {
        const id = $('#UnidadeOrcamentariaId').val();
        Escala.BuscarDepartamentosDaUnidade(id);
    };
    

    Escala.GravarInformacaoEscala = function (event) {
        event.preventDefault();

        const form = event.currentTarget;

        const data = new FormData(form);

        const value = Object.fromEntries(data.entries());

        Formulario.RegistrarDado({ InformacaoEscala: value });

        Formulario.Stepper.next();
    };

})
