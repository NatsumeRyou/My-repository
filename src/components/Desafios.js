import React, { useState, useEffect } from 'react';
import './style.css';

function Desafios() {
  const [desafios, setDesafios] = useState([]);
  const [desafioEditando, setDesafioEditando] = useState(null);
  const [contadorId, setContadorId] = useState(1);

  useEffect(() => {
    const desafiosSalvos = localStorage.getItem('desafios');
    const contadorSalvo = localStorage.getItem('contadorId');

    if (desafiosSalvos) {
      setDesafios(JSON.parse(desafiosSalvos));
    }

    if (contadorSalvo) {
      setContadorId(parseInt(contadorSalvo));
    }
  }, []);

  const adicionarDesafio = (nome) => {
    const novoDesafio = {
      id: contadorId,
      nome: nome
    };

    setContadorId(contadorId + 1);
    const desafiosAtualizados = [...desafios, novoDesafio];
    setDesafios(desafiosAtualizados);

    localStorage.setItem('desafios', JSON.stringify(desafiosAtualizados));
    localStorage.setItem('contadorId', contadorId + 1);
  };

  const removerDesafio = (id) => {
    const desafiosAtualizados = desafios.filter(desafio => desafio.id !== id);
    setDesafios(desafiosAtualizados);

    localStorage.setItem('desafios', JSON.stringify(desafiosAtualizados));
  };

  const editarDesafio = (id) => {
    const desafioEdit = desafios.find(desafio => desafio.id === id);
    setDesafioEditando(desafioEdit);
  };

  const atualizarDesafio = (id, nome) => {
    const desafiosAtualizados = desafios.map(desafio => {
      if (desafio.id === id) {
        return { ...desafio, nome: nome };
      }
      return desafio;
    });
    setDesafios(desafiosAtualizados);
    setDesafioEditando(null);

    localStorage.setItem('desafios', JSON.stringify(desafiosAtualizados));
  };

  return (
    <div className="desafios-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nome = e.target.elements.nome.value;
          if (desafioEditando) {
            atualizarDesafio(desafioEditando.id, nome);
          } else {
            adicionarDesafio(nome);
          }
          e.target.reset();
        }}
      >
        <div className="adicionar-desafio-container">
          <input
            type="text"
            name="nome"
            placeholder="Desafio"
            defaultValue={desafioEditando ? desafioEditando.nome : ''}
            className="desafios-input"
            required
          />
          <button className="btn-adicionar" type="submit">
            {desafioEditando ? 'Atualizar Desafio' : 'Adicionar Desafio'}
          </button>
        </div>
      </form>

      <table className="desafios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Desafio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {desafios.map((desafio, index) => (
            <tr key={desafio.id}>
              <td>{index + 1}</td>
              <td>{desafio.nome}</td>
              <td>
                <button onClick={() => editarDesafio(desafio.id)}>Atualizar</button>
                <button onClick={() => removerDesafio(desafio.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Desafios;
