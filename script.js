

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
            html += `<td id="dia-${dia}-mes-${mes}" onclick="addTarefa('dia-${dia}-mes-${mes}')"><div>${dia}</div><p></p></td>`;
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

function addTarefa(id) {
  const Modal = document.getElementById('modal-tarefa');
  const divTarefas = document.getElementById('tarefas');

  // Limpa o conteúdo anterior das tarefas
  divTarefas.innerHTML = '';

  // Obtém as tarefas salvas no localStorage para o dia atual
  const tarefasSalvas = JSON.parse(localStorage.getItem(id)) || [];

  // Exibe as tarefas salvas no modal
  tarefasSalvas.forEach((tarefa, index) => {
    const tarefaElemento = document.createElement('p');
    tarefaElemento.textContent = tarefa;

    // Adiciona botões de mudar e excluir
    const botaoMudar = document.createElement('button');
    botaoMudar.textContent = 'Mudar';
    botaoMudar.addEventListener('click', function() {
      const novoTexto = prompt('Edite a tarefa:', tarefa);
      if (novoTexto !== null && novoTexto.trim() !== '') {
        tarefasSalvas[index] = novoTexto;
        localStorage.setItem(id, JSON.stringify(tarefasSalvas));
        addTarefa(id); // Atualiza o modal com as tarefas atualizadas
      }
    });

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.addEventListener('click', function() {
      tarefasSalvas.splice(index, 1);
      localStorage.setItem(id, JSON.stringify(tarefasSalvas));
      addTarefa(id); // Atualiza o modal com as tarefas atualizadas
    });

    tarefaElemento.appendChild(botaoMudar);
    tarefaElemento.appendChild(botaoExcluir);

    divTarefas.appendChild(tarefaElemento);
  });

  // Cria um input para adicionar tarefas
  const inputTarefa = document.createElement('input');
  inputTarefa.setAttribute('type', 'text');
  inputTarefa.setAttribute('placeholder', 'Nova Tarefa');
  inputTarefa.setAttribute('id', 'nova-tarefa-input');

  // Cria um botão para adicionar a tarefa
  const botaoAdicionar = document.createElement('button');
  botaoAdicionar.textContent = 'Adicionar';
  botaoAdicionar.addEventListener('click', function() {
    const novaTarefaInput = document.getElementById('nova-tarefa-input');
    const novaTarefa = novaTarefaInput.value.trim();

    if (novaTarefa === '') {
      alert('Por favor, insira uma tarefa.');
      return;
    }

    tarefasSalvas.push(novaTarefa);
    localStorage.setItem(id, JSON.stringify(tarefasSalvas));
    addTarefa(id); // Atualiza o modal com as tarefas atualizadas

    // Limpa o input após adicionar a tarefa
    novaTarefaInput.value = '';
  });

  // Adiciona o input e o botão ao modal
  divTarefas.appendChild(inputTarefa);
  divTarefas.appendChild(botaoAdicionar);

  // Exibe o modal
  Modal.style.display = 'block';
}


function fecharModal() {
  const modal = document.getElementById('modal-tarefa');
  modal.style.display = 'none';
}
