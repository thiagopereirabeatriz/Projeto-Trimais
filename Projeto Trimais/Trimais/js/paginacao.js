/* Função que gera a paginação nas páginas de consulta
 * @param itens {Object} passar o id ou classe do elemento que contém os dados que devem ser páginados
 * @param elPaginacao {Object} passar o id ou classe do elemento que contém a estrutura da paginação
 * @param numPorPagina {int} passar a quantidade de registros por página
 */
var paginacao = function(itens, elPaginacao, numPorPagina){
    
    //Verifica se os parâmetros foram passados para setar um valor 
   if(typeof itens === 'undefined'){
        itens = '.table';
    }
    if(typeof elPaginacao === 'undefined'){
        elPaginacao = '.pagination';
    }
    if(typeof numPorPagina === 'undefined'){
        numPorPagina = 10;
    }
    
    var qtdeItens = $(itens + ' tbody tr').length;
    var paginacaoAtual = 0;
    var inicioPaginacao = 0;  
    var ultimoIndicePaginacao = 0;
    
    //Inicia a função
    var init = function (){

        if($(itens + ' tbody tr').length > 0 && !$(itens + ' tbody tr').hasClass('no-paginate')){
            $(itens + ' tbody tr').hide();
             paginar();
        } else {
            $(elPaginacao).hide();
        }

    };
    //Chama as funções que farão a paginação
    var paginar = function (){
        criarItens();
        mostrarItens();
    };
    //Mostra os registros de acordo com a quantidade setada na chamada da função ou do valor padrão
    var mostrarItens = function () {

        $(itens + ' tbody tr').hide();
        $(itens + ' tbody tr').each(function (index) {
            if(index >= inicioPaginacao && index < (inicioPaginacao + numPorPagina)){
                $(this).fadeIn();
            } else {
                return;
            }
        });                            
    };
    //Cria a navegação da paginação
    var criarItens = function (){

        var indiceItensPaginacao = 1;
        var htmlItensPaginacao = '<li><a href="javascript:;" class="pagination-anterior"><span aria-hidden="true">«</span></a></li>';
        $(elPaginacao).append(htmlItensPaginacao);

        for (i = 0; i < qtdeItens; i += numPorPagina ){
            if(i < numPorPagina){
                htmlItensPaginacao = '<li class="active"><a href="javascript:;" class="pagination-num">' + indiceItensPaginacao + '</a></li>'; 
            } else {
                htmlItensPaginacao = '<li><a href="javascript:;" class="pagination-num">' + indiceItensPaginacao + '</a></li>';
            }
            $(elPaginacao).append(htmlItensPaginacao);
            ultimoIndicePaginacao = indiceItensPaginacao;
            indiceItensPaginacao++;                        
        }

        htmlItensPaginacao = '<li><a href="javascript:;" class="pagination-proximo"><span aria-hidden="true">»</span></a></li>';
        $(elPaginacao).append(htmlItensPaginacao);
    };
    
    //Eventos
    $('body').delegate('.pagination-num', 'click', function (){
        paginacaoAtual = parseInt($(this).text());
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        
        inicioPaginacao = (paginacaoAtual * numPorPagina) - numPorPagina;
        mostrarItens();
    });

    $('body').delegate('.pagination-anterior', 'click', function (){

        if(paginacaoAtual !== 0 && paginacaoAtual !== 1){
            paginacaoAtual--;
            $(this).parent().siblings().removeClass('active');
            $(elPaginacao).children('li').eq(paginacaoAtual).addClass('active');
            
            inicioPaginacao = (paginacaoAtual * numPorPagina) - numPorPagina;
            mostrarItens();
        }

    });
    $('body').delegate('.pagination-proximo', 'click', function (){
        if(paginacaoAtual !== ultimoIndicePaginacao){
            paginacaoAtual === 0 ? paginacaoAtual+=2 : paginacaoAtual++;
            
            $(this).parent().siblings().removeClass('active');
            $(elPaginacao).children('li').eq(paginacaoAtual).addClass('active');
            
            inicioPaginacao = (paginacaoAtual * numPorPagina) - numPorPagina;
            mostrarItens();
        }

    });
    init();
};