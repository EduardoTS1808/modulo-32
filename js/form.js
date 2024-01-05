
const form = document.querySelector('#form');
const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const email = document.getElementById('email');
const cep = document.getElementById('cep');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const rua = document.getElementById('rua');
const mensagem = document.querySelector('#mensagem');
const notNull = document.getElementsByClassName('not-null');

const isEmpty = (elem) => {
    return elem.value.length < 1 ? `O campo <strong>${elem.name}</strong> não pode ser vazio.` : ''; 
}
const validaCPF = (elem) => {
   return elem.value.match(/^[0-9]{3}[0-9]{03}[0-9]{3}[0-9]{2}$/) ? '' : `digite um CPF válido` ;
  }
const validaEmail = (elem) => {
    return elem.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' :  `digite um email válido`;
}

const validaCEP = (elem) => {
    return elem.value.match(/^[0-9]{4}[0-9]{03}$/) ? '' :  `Digite um CEP válido.`;
}

function updateAdress(data) {
    if( !('erro' in data)) {
        rua.value=(data.logradouro);
        bairro.value=(data.bairro);
        cidade.value=(data.localidade);
        uf.value=(data.uf);
        mensagem.innerHTML = '';
    } else {
        mensagem.innerHTML = `CEP não encontrado`;
    }
}
form.addEventListener('focusout', function(elem){
   
    return elem.target.value.length < 1 ? mensagem.innerHTML = elem.target.name +'  não pode estar vazio!' : '';
}
    
)
form.addEventListener('submit', function(event){
    event.preventDefault();
    event.stopPropagation();

    let msg = [];
    let markup = '';
   
    Array.from(notNull).forEach(field => {
        let fieldState = isEmpty(field);
        if(fieldState) 
            msg.push(fieldState);
    });
    const isCPF = validaCPF(cpf);
    if(isCPF) msg.push(isCPF);

    const isEmail = validaEmail(email);
    if(isEmail) msg.push(isEmail);

    const isCEP = validaCEP(cep);
    if(isCEP.length > 0) {
        msg.push(isCEP);
    } else {  
        const script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/' + cep.value + '/json?callback=updateAdress';
        document.body.appendChild(script);
    }

    msg.forEach(item => {
        markup += `<p>${item}</p>` 
    });

    mensagem.innerHTML = markup;

    // if(msg.length == 0)  form.submit();

});
