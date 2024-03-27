// Função para criar o calendário
function criarCalendario(mes, ano) {
  const diasNoMes = new Date(ano, mes + 1, 0).getDate(); // Quantidade de dias no mês
  const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay(); // Dia da semana em que o mês começa (0 = domingo, 1 = segunda, ..., 6 = sábado)
  const corpoTabela = document.getElementById('corpo-tabela');

  let html = '';

  let dia = 1;
  for (let i = 0; i < 6; i++) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < primeiroDiaDaSemana) || dia > diasNoMes) {
              html += '<td></td>';
          } else {
              html += `<td id="dia-${dia}-mes-${mes}"><div>${dia}</div><p></p></td>`;
              dia++;
          }
      }
      html += '</tr>';
      if (dia > diasNoMes) break;
  }

  corpoTabela.innerHTML = html;

  var diaAtual = (new Date()).getDate();
  var idDiaAtual = `dia-${diaAtual}-mes-${mesAtual}`;
  var htmlDiaAtual = document.getElementById(idDiaAtual);
      htmlDiaAtual.style.backgroundColor = '#f650f1b1';
}

document.getElementById('select-mes').addEventListener('change', function() {
  const mesSelecionado = parseInt(this.value);
  criarCalendario(mesSelecionado, 2024);
});

// Inicializa o calendário com o mês atual
const mesAtual = (new Date()).getMonth();
document.getElementById('select-mes').value = mesAtual;
criarCalendario(mesAtual, 2024);
