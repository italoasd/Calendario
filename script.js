 // Função para criar o calendário
 function criarCalendario(mes, ano) {
  const diasNoMes = new Date(ano, mes + 1, 0).getDate(); // Quantidade de dias no mês
  const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay(); // Dia da semana em que o mês começa (0 = domingo, 1 = segunda, ..., 6 = sábado)
  const corpoTabela = document.getElementById('corpo-tabela');

  let html = '';

  let dia = 1;
  for (let i = 0; i < 6; i++) { // 6 linhas para garantir que todos os meses caibam na tabela
    html += '<tr>';
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < primeiroDiaDaSemana) || dia > diasNoMes) {
        html += '<td></td>'; // Célula vazia antes do primeiro dia e após o último dia do mês
      } else {
        html += `<td>${dia}</td>`;
        dia++;
      }
    }
    html += '</tr>';
    if (dia > diasNoMes) break; // Termina o loop se já passamos por todos os dias do mês
  }

  corpoTabela.innerHTML = html;
}

// Função para atualizar o calendário quando o mês é alterado
document.getElementById('select-mes').addEventListener('change', function() {
  const mesSelecionado = parseInt(this.value);
  const anoAtual = 2024; // Altere o ano conforme necessário
  criarCalendario(mesSelecionado, anoAtual);
});

// Inicializa o calendário com o mês atual
const mesAtual = (new Date()).getMonth();
document.getElementById('select-mes').value = mesAtual;
criarCalendario(mesAtual, 2024); // Altere o ano conforme necessário