import React, { useState, useEffect } from 'react';
import './style.css';

function Salas() {
  const [salas, setSalas] = useState([]);
  const [salaEditando, setSalaEditando] = useState(null);
  const [contadorId, setContadorId] = useState(1);

  useEffect(() => {
    const salasSalvas = localStorage.getItem('salas');
    const contadorSalvo = localStorage.getItem('contadorId');

    if (salasSalvas) {
      setSalas(JSON.parse(salasSalvas));
    }

    if (contadorSalvo) {
      setContadorId(parseInt(contadorSalvo));
    }
  }, []);

  const adicionarSala = (nome, capacidade) => {
    const novaSala = {
      id: contadorId,
      nome: nome,
      capacidade: capacidade
    };

    setContadorId(contadorId + 1);
    const salasAtualizadas = [...salas, novaSala];
    setSalas(salasAtualizadas);

    localStorage.setItem('salas', JSON.stringify(salasAtualizadas));
    localStorage.setItem('contadorId', contadorId + 1);
  };

  const removerSala = (id) => {
    const salasAtualizadas = salas.filter(sala => sala.id !== id);
    setSalas(salasAtualizadas);

    localStorage.setItem('salas', JSON.stringify(salasAtualizadas));
  };

  const editarSala = (id) => {
    const salaEdit = salas.find(sala => sala.id === id);
    setSalaEditando(salaEdit);
  };

  const atualizarSala = (id, nome, capacidade) => {
    const salasAtualizadas = salas.map(sala => {
      if (sala.id === id) {
        return { ...sala, nome: nome, capacidade: capacidade };
      }
      return sala;
    });
    setSalas(salasAtualizadas);
    setSalaEditando(null);

    localStorage.setItem('salas', JSON.stringify(salasAtualizadas));
  };

  return (
    <div className="salas-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nome = e.target.elements.nome.value;
          const capacidade = e.target.elements.capacidade.value;
          if (salaEditando) {
            atualizarSala(salaEditando.id, nome, capacidade);
          } else {
            adicionarSala(nome, capacidade);
          }
          e.target.reset();
        }}
      >
        <div className="adicionar-sala-container">
          <input
            type="text"
            name="nome"
            placeholder="Sala"
            defaultValue={salaEditando ? salaEditando.nome : ''}
            className="sala-input"
            required
          />
          <input
            type="number"
            name="capacidade"
            placeholder="Capacidade"
            defaultValue={salaEditando ? salaEditando.capacidade : ''}
            className="sala-input"
            required
          />
          <button className="btn-adicionar" type="submit">
            {salaEditando ? 'Atualizar Sala' : 'Adicionar Sala'}
          </button>
        </div>
      </form>

      <table className="salas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sala</th>
            <th>Capacidade de Alunos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala, index) => (
            <tr key={sala.id}>
              <td>{index + 1}</td>
              <td>{sala.nome}</td>
              <td>{sala.capacidade}</td>
              <td>
                <button onClick={() => editarSala(sala.id)}>Atualizar</button>
                <button onClick={() => removerSala(sala.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Salas;

