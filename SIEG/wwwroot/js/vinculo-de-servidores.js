$(function () {

    "use strict"

    class ServidorSelecionado {
        constructor(cpf, matricula) {
            this.cpf = cpf;
            this.matricula = matricula;
            this.cargaHoraria = 0;
            this.nome = "";
        }
    }

    window.VinculoDeServidores = window.VinculoDeServidores || {};

    VinculoDeServidores.ServidoresVinculados = [];

    VinculoDeServidores.CarregarTelaDeVincularServidores = function () {

        Formulario.IniciarCarregamento();

        $.ajax({
            method: "GET",
            url: "/Servidor/Vincular",
            dataType: "html",
            success: function success(result) {
                $("#test-l-2").html(result);
                VinculoDeServidores.AplicarDataTablesNoVinculoDeServidores();
            },
            complete: function complete() {
                Formulario.PararCarregamento();
            }
        });
    };

    VinculoDeServidores.AplicarDataTablesNoVinculoDeServidores = function () {
        $("#table-vinculo-de-servidores").DataTable({
            "responsive": true,
            "language": {
                url: "/lib/plugins/datatables/lang/pt-BR.json"
            },
            "lengthChange": false
        });
    };

    VinculoDeServidores.AplicarDataTablesNosServidoresSelecionados = function () {

        var groupColumn = 0;
        var table = $('#table-servidores-para-vinculo').DataTable({

            responsive: true,

            language: {
                url: "/lib/plugins/datatables/lang/pt-BR.json"
            },

            lengthChange: false,
            info: false,
            paging: false,

            columnDefs: [{ visible: false, targets: groupColumn }],
            order: [[groupColumn, 'asc']],
            displayLength: 25,
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api
                    .column(groupColumn, { page: 'current' })
                    .data()
                    .each(function (group, i) {
                        if (last !== group) {
                            $(rows)
                                .eq(i)
                                .before('<tr class="group"><td colspan="5">' + group + '</td></tr>');

                            last = group;
                        }
                    });
            },
        });

        // Ordenação por grupo
        $('#table-servidores-para-vinculo tbody').on('click', 'tr.group', function () {
            var currentOrder = table.order()[0];
            if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
                table.order([groupColumn, 'desc']).draw();
            } else {
                table.order([groupColumn, 'asc']).draw();
            }
        });
    };

    VinculoDeServidores.CarregarServidoresParaVinculoDaLotacaoDoUsuarioLogado = function (departamentosIds = [], dataTables = true) {

        Formulario.IniciarCarregamento();
        const token = Formulario.BuscarToken();

        $.ajax({
            method: "POST",
            url: "/Servidor/BuscarServidoresDaLotacaoDoUsuarioLogado",
            data: { __RequestVerificationToken: token, servidoresSelecionados: VinculoDeServidores.ServidoresVinculados, departamentosIds: departamentosIds },
            dataType: "html",
            success: async function success(result) {
                $("#modal-vincular-servidor-container").html(result);

                $("#modal-vincular-servidor").modal({
                    show: true,
                    fade: true
                });

                if (dataTables === true) {
                    VinculoDeServidores.AplicarDataTablesNosServidoresSelecionados();
                }
            },
            complete: function complete() {
                Formulario.PararCarregamento();
            }
        });
    };

    VinculoDeServidores.CarregarServidoresSelecionados = function () {

        Formulario.IniciarCarregamento();
        const token = Formulario.BuscarToken();
        $.ajax({
            method: "POST",
            url: "/Servidor/ListaDeServidoresVinculados",
            data: { __RequestVerificationToken: token, servidoresSelecionados: VinculoDeServidores.ServidoresVinculados },
            dataType: "json",
            success: function success(result) {
                VinculoDeServidores.ServidoresVinculados = result.listaServidor;
                $("#servidores-vinculados").html(result.html);
                VinculoDeServidores.AplicarDataTablesNoVinculoDeServidores();
            },
            complete: function complete() {
                Formulario.PararCarregamento();
            }
        });
    };

    VinculoDeServidores.CarregarModalDeVinculoDeServidores = function () {

        let departamentosIds = $("#departamentos-do-usuario").val();

        let matriculasJson = JSON.stringify(VinculoDeServidores.ServidoresVinculados);

        $("#test-l-2").data("selecionados", matriculasJson);

        VinculoDeServidores.CarregarServidoresParaVinculoDaLotacaoDoUsuarioLogado(departamentosIds, false);
    };

    VinculoDeServidores.SelecionarServidorParaEscala = function (matricula, cpf) {

        Formulario.IniciarCarregamento();

        const token = Formulario.BuscarToken();

        let matriculasJson = $("#test-l-2").data("selecionados");

        let servidorSelecionado = new ServidorSelecionado(cpf, matricula);

        $.ajax({
            method: "POST",
            url: "/Servidor/AdicionarNovaMatriculaSelecionada",
            data: { __RequestVerificationToken: token, servidorSelecionado: servidorSelecionado, matriculasJson: matriculasJson },
            dataType: "json",
            success: function success(result) {
                $("#test-l-2").data("selecionados", result);
            },
            complete: function complete() {
                Formulario.PararCarregamento();
            }
        });
    };

    VinculoDeServidores.VincularMatriculas = function () {
        var selecionadosJson = $("#test-l-2").data("selecionados");
        VinculoDeServidores.ServidoresVinculados = JSON.parse(selecionadosJson);
        VinculoDeServidores.CarregarServidoresSelecionados();
    };

    VinculoDeServidores.DesvincularServidor = function (matricula) {

        Formulario.IniciarCarregamento();

        const token = Formulario.BuscarToken();

        const servidor = VinculoDeServidores.ServidoresVinculados.find(item => item.matricula == matricula);

        let matriculasJson = JSON.stringify(VinculoDeServidores.ServidoresVinculados);

        $.ajax({
            method: "POST",
            url: "/Servidor/RemoverMatriculaSelecionada",
            data: { __RequestVerificationToken: token, servidorSelecionado: servidor, matriculasJson: matriculasJson },
            dataType: "json",
            success: function success(result) {
                VinculoDeServidores.ServidoresVinculados = JSON.parse(result);
            },
            complete: function complete() {
                Formulario.PararCarregamento();
                VinculoDeServidores.CarregarServidoresSelecionados();
            }
        });
    };


    VinculoDeServidores.CarregarDepartamentosDoUsuario = function () {
        $.ajax({
            method: "GET",
            url: "/Servidor/CarregarDepartamentosDoUsuario",
            dataType: "json",
            success: function success(result) {
                $.each(result, function (index, value) {
                    $('#departamentos-do-usuario').append($('<option>', {
                        value: value.id,
                        text: value.descricao
                    }));
                });

                $("#departamentos-do-usuario").selectpicker();
            }
        });
    };

    VinculoDeServidores.Eventos = function () {
        $("#modal-vincular-servidor").on('shown.bs.modal', function () {
            VinculoDeServidores.CarregarDepartamentosDoUsuario();
            VinculoDeServidores.AplicarDataTablesNosServidoresSelecionados();
        });

        $("#departamentos-do-usuario").on("change", function (e) {

            let departamentosIds = $("#departamentos-do-usuario").val();

            VinculoDeServidores.CarregarServidoresParaVinculoDaLotacaoDoUsuarioLogado(departamentosIds);
        });
    };

    VinculoDeServidores.Eventos();

});
