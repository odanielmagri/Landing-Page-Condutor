const suggestions = {
  geral: [
    'Minha experiência com a Auto Escola Condutor foi excelente. Equipe atenciosa e comprometida. Recomendo!',
    'Gostei muito da Condutor! Fui bem atendido e me senti acolhido durante o processo.',
    'Só tenho a agradecer à equipe da Condutor pela atenção e pelo cuidado. Uma ótima experiência!',
    'Autoescola excelente! Gostei do atendimento, das aulas e da dedicação de toda a equipe.',
    'Recomendo a Condutor para quem procura uma autoescola com pessoas atenciosas e dispostas a ajudar.',
    'Foi uma experiência muito positiva. A equipe da Condutor fez a diferença na minha jornada.',
    'Muito satisfeito com a Condutor! Profissionais dedicados e um atendimento que passa confiança.',
    'A Condutor merece as cinco estrelas. Gostei muito da forma como fui recebido e orientado.',
    'Uma equipe que se importa com o aluno. Obrigado, Condutor, pela atenção em cada etapa!',
    'Tive uma ótima experiência na Auto Escola Condutor e recomendo com confiança.'
  ],
  atendimento: [
    'Atendimento excelente! A equipe da Condutor foi muito educada e atenciosa comigo.',
    'Fui muito bem recebido na Condutor. Tiraram minhas dúvidas com calma e atenção.',
    'Gostei muito do atendimento. Pessoas simpáticas e sempre dispostas a ajudar.',
    'A atenção da equipe fez toda a diferença. Me senti acolhido desde o primeiro contato.',
    'Cinco estrelas pelo atendimento! Fui tratado com respeito e recebi as orientações de que precisava.',
    'Equipe prestativa e paciente para explicar cada etapa. Gostei muito!',
    'Quero destacar o carinho e a atenção no atendimento da Condutor. Recomendo!',
    'Sempre fui bem atendido. A equipe teve muita paciência com minhas dúvidas.',
    'Atendimento próximo e cuidadoso. Me senti à vontade para perguntar e pedir ajuda.',
    'Parabéns à equipe da Condutor pelo ótimo atendimento e pela dedicação aos alunos!'
  ],
  servico: [
    'Gostei muito das aulas na Condutor. As explicações foram claras e me ajudaram a ganhar confiança.',
    'Instrutores pacientes e dedicados. Tive uma ótima experiência de aprendizado.',
    'O serviço da Condutor foi excelente. Me senti bem orientado durante o processo.',
    'Aulas muito boas, com atenção às minhas dúvidas e ao meu ritmo de aprendizado.',
    'Recomendo a Condutor pela qualidade das aulas e pelo comprometimento dos profissionais.',
    'Aprendi bastante e me senti mais seguro com as orientações que recebi. Muito obrigado!',
    'Gostei da organização e do cuidado com cada etapa. Serviço que merece cinco estrelas.',
    'Profissionais atenciosos, que explicam com calma e ajudam o aluno a evoluir.',
    'Minha experiência nas aulas foi muito positiva. Obrigado pela paciência e dedicação!',
    'A Condutor fez parte de uma etapa importante para mim. Gostei muito do trabalho da equipe.'
  ],
  preco: [
    'Gostei do custo-benefício da Condutor. O investimento valeu a pena pela experiência que tive.',
    'Fiquei satisfeito com o valor e com a qualidade do atendimento. Recomendo!',
    'Na minha experiência, o preço foi justo pelo serviço oferecido.',
    'Gostei da clareza nas informações sobre os valores. Isso me passou confiança.',
    'A Condutor ofereceu um bom custo-benefício para o que eu procurava.',
    'Fui bem orientado sobre os valores e fiquei satisfeito com minha escolha.',
    'Considerei o investimento muito válido pela atenção e pela qualidade das aulas.',
    'Bom custo-benefício e uma equipe atenciosa. Minha experiência foi muito positiva.',
    'Gostei da transparência ao explicar os custos. Recomendo a Condutor!',
    'Fiquei satisfeito com o serviço e com o valor investido na minha formação.'
  ]
};

const shortSuggestions = {
  geral: ['Ótima experiência com a Condutor. Recomendo!', 'Gostei muito da Condutor e da equipe.', 'Fui bem recebido. Obrigado, Condutor!', 'Equipe atenciosa e dedicada. Recomendo!', 'Fiquei muito satisfeito com a Condutor.'],
  atendimento: ['Atendimento atencioso e acolhedor.', 'Fui muito bem atendido. Recomendo!', 'Equipe educada e prestativa.', 'Tiraram minhas dúvidas com paciência.', 'Gostei do cuidado no atendimento.'],
  servico: ['Aulas claras e instrutores pacientes.', 'Gostei muito das aulas. Recomendo!', 'Aprendi bastante com a equipe.', 'Recebi boas orientações nas aulas.', 'Instrutores dedicados ao aprendizado.'],
  preco: ['Gostei do custo-benefício.', 'Preço justo pela experiência que tive.', 'Valores explicados com clareza.', 'Fiquei satisfeito com o investimento.', 'Bom serviço e bom custo-benefício.']
};
const lengthButtons = [...document.querySelectorAll('[data-length]')];
let suggestionLength = 'detalhadas';
function categorySuggestions(selected) {
  return (suggestionLength === 'curtas' ? shortSuggestions : suggestions)[selected];
}

const labels = { geral: 'Geral', atendimento: 'Atendimento', servico: 'Serviço', preco: 'Preço' };
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panel = document.querySelector('#suggestion-panel');
const list = document.querySelector('#suggestion-list');
const status = document.querySelector('#copy-status');
let statusTimer;
let category = 'geral';
let offset = 0;
const drafts = new Map();

function announce(message) {
  clearTimeout(statusTimer);
  status.textContent = message;
  status.classList.add('is-active');
  statusTimer = setTimeout(() => {
    status.classList.remove('is-active');
    status.textContent = '';
  }, 3500);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch { /* Older browsers and blocked permissions use the selected-text fallback. */ }
  }
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.setAttribute('aria-label', 'Texto da sugestão');
  field.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;font-size:16px';
  document.body.append(field);
  field.select();
  field.setSelectionRange(0, text.length);
  let copied = false;
  try { copied = document.execCommand('copy'); } catch { copied = false; }
  field.remove();
  return copied;
}

function render(selected, start = 0) {
  offset = start;
  category = selected;
  tabs.forEach(tab => {
    const active = tab.dataset.category === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', 'tab-' + selected);
  list.replaceChildren();
  const options = categorySuggestions(selected);
  Array.from({length: Math.min(3, options.length)}, (_, i) => options[(offset + i) % options.length]).forEach((text, index) => {
    const article = document.createElement('article');
    article.className = 'suggestion-card';
    const draftKey = suggestionLength + ':' + selected + ':' + ((offset + index) % options.length);
    const label = document.createElement('label');
    label.className = 'edit-label';
    label.htmlFor = 'draft-' + selected + '-' + index;
    label.textContent = 'Editar texto';
    const quote = document.createElement('textarea');
    quote.id = label.htmlFor;
    quote.className = 'suggestion-text suggestion-editor';
    quote.rows = 4;
    quote.value = drafts.get(draftKey) ?? text;
    quote.setAttribute('aria-label', 'Editar sugestão ' + (index + 1) + ' de ' + labels[selected]);
    quote.addEventListener('input', () => {
      drafts.set(draftKey, quote.value);
      restore.disabled = quote.value === text;
      copy.textContent = 'Copiar texto';
      copy.classList.remove('is-copied');
    });
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'copy-button';
    copy.textContent = 'Copiar texto';
    copy.setAttribute('aria-label', 'Copiar sugestão ' + (index + 1) + ' de ' + labels[selected]);
    copy.addEventListener('click', async () => {
      const edited = quote.value.trim();
      if (!edited) {
        announce('Escreva seu texto antes de copiar.');
        quote.focus();
        return;
      }
      copy.disabled = true;
      const success = await copyText(edited);
      copy.disabled = false;
      if (success) {
        copy.textContent = 'Copiado ✓';
        copy.classList.add('is-copied');
        announce('Texto copiado. Agora é só colar na sua avaliação.');
        setTimeout(() => {
          copy.textContent = 'Copiar texto';
          copy.classList.remove('is-copied');
        }, 3000);
      } else {
        announce('Não foi possível copiar. Selecione o texto acima para copiar manualmente.');
      }
      copy.focus({ preventScroll: true });
    });
    const restore = document.createElement('button');
    restore.type = 'button';
    restore.className = 'restore-button';
    restore.textContent = 'Restaurar';
    restore.title = 'Restaurar texto original';
    restore.setAttribute('aria-label', 'Restaurar texto original da sugestão ' + (index + 1) + ' de ' + labels[selected]);
    restore.disabled = quote.value === text;
    restore.addEventListener('click', () => {
      quote.value = text;
      drafts.delete(draftKey);
      restore.disabled = true;
      copy.textContent = 'Copiar texto';
      copy.classList.remove('is-copied');
      quote.focus({preventScroll:true});
      announce('Texto original restaurado.');
    });
    const actions = document.createElement('div');
    actions.className = 'suggestion-actions';
    actions.append(restore, copy);
    article.append(label, quote, actions);
    list.append(article);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => render(tab.dataset.category));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      render(tabs[next].dataset.category);
      tabs[next].focus();
    }
  });
});
render(category);


document.querySelector('#more-suggestions').addEventListener('click', () => render(category, (offset + 3) % categorySuggestions(category).length));

lengthButtons.forEach(button => {
  button.addEventListener('click', () => {
    suggestionLength = button.dataset.length;
    lengthButtons.forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    render(category);
  });
});
