// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

let filmes = null;

// desafio 3: tocar intro
let musicaTocando = false;

// exercício 2: buscando a lista de filmes usando ajax
$.ajax('https://swapi.dev/api/films/', {
  dataType: 'json',
  success: resposta => {
    let $listaFilmes = $('#filmes ul');
    $listaFilmes.empty();

    filmes = resposta.results;

    // desafio 1: ordenando os filmes
    filmes = filmes.sort((a, b) => a.episode_id - b.episode_id);

    filmes.forEach(filme => {
      let $filme = $('<li></li>')
        .html(`Episode ${paraRomano(filme.episode_id)}: ${filme.title}`)
        .appendTo($listaFilmes);

      // exercício 3: alterando a intro para o filme clicado
      $filme.data('id-episodio', filme.episode_id);
      $filme.click(e => {
        const idFilmeClicado = $(e.currentTarget).data('id-episodio');
        const filmeClicado = filmes.find(f => f.episode_id == idFilmeClicado);

        colocaIntroDoFilme(filmeClicado.episode_id, filmeClicado.title, filmeClicado.opening_crawl);

        // desafio 3: tocar intro
        if (!musicaTocando) {
          new Audio('audio/tema-sw.mp3').play();
          musicaTocando = true;
        }
      })
    });
  }
});


// exercício 3: função para alterar o filme
function colocaIntroDoFilme(idEpisodio, titulo, intro) {
  $('#intro').html(`Episode ${paraRomano(idEpisodio)}
    ${titulo.toUpperCase()}

    ${intro}
  `);
}

// desafio 2: números romanos
function paraRomano(numero) {
  return {
    '1': 'I',
    '2': 'II',
    '3': 'III',
    '4': 'IV',
    '5': 'V',
    '6': 'VI',
    '7': 'VII',
    '8': 'VIII',
    '9': 'IX',
    '10': 'X',
    '11': 'XI',
  }[numero];
}
