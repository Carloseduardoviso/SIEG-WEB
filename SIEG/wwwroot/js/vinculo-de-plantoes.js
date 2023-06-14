$(function () {

    "use strict"

    window.VinculoDePlantoes = window.VinculoDePlantoes || {};

    VinculoDePlantoes.Plantoes = [];

    VinculoDePlantoes.CarregarTelaDeVinculoDePlantoes = function () {

        Formulario.IniciarCarregamento();

        const token = Formulario.BuscarToken();

        $.ajax({
            method: "POST",
            url: "/Plantao/Criar",
            dataType: "html",
            data: { __RequestVerificationToken: token, servidoresSelecionados: VinculoDeServidores.ServidoresVinculados, mes: '05', ano: '2023' },
            success: function success(result) {
                $("#test-l-3").html(result);
                VinculoDePlantoes.EventoModalListagem();
            },
            complete: function complete() {
                Formulario.PararCarregamento();
            }
        });
    };

    VinculoDePlantoes.EventoModalListagem = function () {

        $(".contentmodal").click(function (event) {

            const matriculaTr = $(event.currentTarget).data("matricula");
            const $modal = $('#staticBackdrop');

            const servidor = VinculoDeServidores.ServidoresVinculados.find(item => item.matricula == matriculaTr);

            $modal.find(".dados-servidor").html(`
            <dl class="row">
                <dt class="col-sm-4">NOME</dt>
                <dd class="col-sm-8">${servidor.nome}</dd>
                <dt class="col-sm-4">CPF</dt>
                <dd class="col-sm-8">${servidor.cpf}</dd>
                <dt class="col-sm-4">MATRICULA</dt>
                <dd class="col-sm-8">${servidor.matricula}</dd>
            </dl>`);

            VinculoDePlantoes.ListaPlantoesModal(matriculaTr);
            VinculoDePlantoes.EventoModalCrud(servidor, true);
            $modal.modal('show');
        })
    };

    VinculoDePlantoes.ListaPlantoesModal = function (matriculaTr) {

        const listaPlantoes = VinculoDePlantoes.Plantoes.filter(item => item.matricula == matriculaTr);

        const htmlPlantoes = listaPlantoes.reduce(
            (accumulator, plantao) => accumulator += `
            <tr>
                <td>${plantao.legenda}</td>
                <td>${plantao.data}</td>
                <td>${plantao.duracao}</td>
                <td>${plantao.inicio}</td>
                <td>
                    <button type="button" class="btn btn-secondary excluir-plantao" data-index="${plantao.id}">Excluir</button>
                    <button type="button" class="btn btn-primary editar-plantao" data-index="${plantao.id}">Editar</button>
                </td>
            </tr>`,
            '');

        $('#staticBackdrop').find(".lista-plantoes").html(htmlPlantoes);
    };

    VinculoDePlantoes.Criar = function (matricula) {
        Formulario.IniciarCarregamento();

        const legenda = $("#legenda").val();
        const data= $('.data').val();
        const duracao = $('.duracao').val();
        const inicio = $('.inicio').val();

        const id = VinculoDePlantoes.Plantoes.length >= 1 ? VinculoDePlantoes.Plantoes.length : 0;

        VinculoDePlantoes.Plantoes.push({
            id,
            legenda,
            data,
            duracao,
            inicio,
            matricula
        });

        const servidor = VinculoDeServidores.ServidoresVinculados.find(item => item.matricula == matricula);

        VinculoDePlantoes.ListaPlantoesModal(matricula);
        VinculoDePlantoes.EventoModalCrud(servidor);

        $('#exampleModalCenter').modal('hide');
        Formulario.PararCarregamento();
    };

    VinculoDePlantoes.EventoModalCrud = function (servidor, deveCriar = false) {

        if (deveCriar) {
            $(".criar-plantao").click(function () {

                const $modal = $('#exampleModalCenter');
                const $titulo = $modal.find('#exampleModalCenterTitle');
                const $body = $modal.find('.modal-body');
                const $footer = $modal.find('.modal-footer');

                $titulo.html("Criar Plantão:");

                $footer.html(`
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" onclick="VinculoDePlantoes.Criar(${servidor.matricula})">Salvar</button>
                `)

                const token = Formulario.BuscarToken();

                $.ajax({
                    method: "POST",
                    url: "/Plantao/ModalCrud",
                    data: { __RequestVerificationToken: token, servidorSelecionado: servidor },
                    dataType: "html",
                    success: function success(result) {
                        $body.html(result);
                        VinculoDePlantoes.EventoCalendario();
                        $modal.modal('show');
                    },
                    complete: function complete() {
                        Formulario.PararCarregamento();
                    }
                });
            })
        }

        $(".excluir-plantao").click(function (event) {

            const $modal = $('#exampleModalCenter');
            const $titulo = $modal.find('#exampleModalCenterTitle');
            const $body = $modal.find('.modal-body');
            const $footer = $modal.find('.modal-footer');

            $titulo.html("Excluir Plantão:");

            const id = event.currentTarget.dataset.index;

            const plantao = VinculoDePlantoes.Plantoes.find(item => item.id == id);

            $body.html(`
                <h4>Legenda: ${plantao.legenda}</h4>
                <h4>Data: ${plantao.data}</h4>
                <h4>Duração: ${plantao.duracao}</h4>
                <h4>Inicio: ${plantao.inicio}</h4>
            `);

            $footer.html(`
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" onclick="VinculoDePlantoes.Excluir(${plantao.matricula})">Salvar</button>
            `);

            VinculoDePlantoes.EventoCalendario();
            $modal.modal('show');
        })

        $(".editar-plantao").click(function (event) {

            const $modal = $('#exampleModalCenter');
            const $titulo = $modal.find('#exampleModalCenterTitle');
            const $body = $modal.find('.modal-body');
            const $footer = $modal.find('.modal-footer');

            $titulo.html("Editar Plantão:");

            $footer.html(`
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" onclick="VinculoDePlantoes.Editar(${servidor.matricula})">Salvar</button>
                `)

            const token = Formulario.BuscarToken();

            $.ajax({
                method: "POST",
                url: "/Plantao/ModalCrud",
                data: { __RequestVerificationToken: token, servidorSelecionado: servidor },
                dataType: "html",
                success: function success(result) {
                    $body.html(result);
                    VinculoDePlantoes.EventoCalendario();
                    $modal.modal('show');
                },
                complete: function complete() {
                    Formulario.PararCarregamento();
                }
            });
        })
    };

    VinculoDePlantoes.EventoCalendario = function () {
        $('.reservationtime').daterangepicker({
            timePicker: true,
            timePickerIncrement: 30,
            locale: {
                format: 'MM/DD/YYYY hh:mm A'
            }
        });

        $('.legenda').selectpicker();
    }
});
