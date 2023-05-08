import { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
var valor = 's';

function Applica(variavel) {

  const usenavigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === 'checkbox';
    const data = formValues[name] || {};
    if (isCheckbox) {
      data[value] = checked;
    }
    const newValue = isCheckbox ? data : value;
    setFormValues({ ...formValues, [name]: newValue });
  };
  const se = document.cookie
  .split('; ')
  .find(row => row.startsWith('peticao='));
if (se) {
  valor = se.split('=')[1];
} else {
  console.log('Cookie não encontrado');
}
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
      const rawResponse = fetch('https://gateway-production-2587.up.railway.app/api/v1/peticiona/peticionar', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token' : Cookies.get("token")
        },
        body: JSON.stringify({transcricao : valor, fonte : data.fontes, tema : data.direito, 
          cliente: { nome: data.nome, cpf: data.cpf, email: data.email, telefone: data.telefone, rg : data.rg, nacionalidade : data.nacio, 
            address: { cep: data.cep, cidade: data.cidade, estado: data.estado, endereco : data.endereco}
          }, juizado: { forum: data.forum, vara: data.vara, cidade: data.cidadej, estado: data.estadoj},
        liminar : data.liminar, prioridade : data.prio})
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          usenavigate('/direitos', {state : {id: data.data}})
        })
  };
  return (
    <form onSubmit={handleSubmit}>
      <select name="direito" onChange={handleInputChange} value={formValues.direito || ''}>
        <option value="CONSUMIDOR">Direito do consumidor</option>
        <option value="CIVIL">Direito civil</option>
        <option value="FAMILIA">Direito da Família</option>
        <option value="TRABALHISTA">Direito Trabalhista</option>
        <option value="PREVIDENCIARIO">Direito Previdenciário</option>
        <option value="PENAL">Direito Penal</option>
        <option value="ADMINISTRATIVO">Direito Administrativo</option>
        <option value="CONSTITUCIONAL">Direito Constitucional</option>
        <option value="ELEITORAL">Direito Eleitoral</option>
        <option value="AMBIENTAL">Direito Ambiental</option>
      </select>
      <select name="fontes" onChange={handleInputChange} value={formValues.fontes || ''}>
        <option value="CR18">Constituição da República de 1988 - CF/88</option>
        <option value="CDC">Código de Defesa do Consumidor - CDC</option>
        <option value="CCB">Código Civil Brasileiro - CCB</option>
      </select>
      <h2>Cliente</h2>
      <input type="text" name="nome" placeholder="Nome" onChange={handleInputChange} value={formValues.nome || ''} />
      <input type="text" name="rg" placeholder="RG" onChange={handleInputChange} value={formValues.rg || ''} />
      <input type="text" name="cpf" placeholder="CPF" onChange={handleInputChange} value={formValues.cpf || ''} />
      <input type="email" name="email" placeholder="E-MAIL" onChange={handleInputChange} value={formValues.email || ''} />
      <input type="text" name="telefone" placeholder="Telefone" onChange={handleInputChange} value={formValues.telefone || ''} pattern='[0-9]{2}-[0-9]{5}-[0-9]{4}' />
      <input type="text" name="nacio" placeholder="Nacionalidade" onChange={handleInputChange} value={formValues.nacio || ''} max={50} />
      <input type="text" name="cep" placeholder="CEP" onChange={handleInputChange} value={formValues.cep || ''} />
      <input type="text" name="cidade" placeholder="Cidade" onChange={handleInputChange} value={formValues.cidade || ''} />
      <input type="text" name="endereco" placeholder="Enderço" onChange={handleInputChange} value={formValues.endereco || ''} />
      <input type="text" name="estado" placeholder="Estado" onChange={handleInputChange} value={formValues.estado || ''} />
      <h2>Juízado</h2>
      <input type="text" name="forum" placeholder="Forum" onChange={handleInputChange} value={formValues.forum || ''} />
      <input type="text" name="vara" placeholder="Vara" onChange={handleInputChange} value={formValues.vara || ''} />
      <input type="text" name="cidadej" placeholder="Cidade" onChange={handleInputChange} value={formValues.cidadej || ''} />
      <input type="text" name="estadoj" placeholder="Estado" onChange={handleInputChange} value={formValues.estadoj || ''} />
      <label>Liminar
      <select name="liminar" onChange={handleInputChange} value={formValues.liminar || ''}>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      </label>
      <label>Prioridade
      <select name="prio" onChange={handleInputChange} value={formValues.prio || ''}>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
export default Applica;