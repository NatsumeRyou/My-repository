import React, { useState, useEffect } from 'react';
import './style.css';

function Horarios() {
  const [horarios, setHorarios] = useState([]);
  const [horarioEditando, setHorarioEditando] = useState(null);
  const [contadorId, setContadorId] = useState(1);

  useEffect(() => {
    const horariosSalvos = localStorage.getItem('horarios');
    const contadorSalvo = localStorage.getItem('contadorId');

    if (horariosSalvos) {
      setHorarios(JSON.parse(horariosSalvos));
    }

    if (contadorSalvo) {
      setContadorId(parseInt(contadorSalvo));
    }
  }, []);

  const adicionarHorario = (nome) => {
    const novoHorario = {
      id: contadorId,
      nome: nome
    };

    setContadorId(contadorId + 1);
    const horariosAtualizados = [...horarios, novoHorario];
    setHorarios(horariosAtualizados);

    localStorage.setItem('horarios', JSON.stringify(horariosAtualizados));
    localStorage.setItem('contadorId', contadorId + 1);
  };

  const removerHorario = (id) => {
    const horariosAtualizados = horarios.filter(horario => horario.id !== id);
    setHorarios(horariosAtualizados);

    localStorage.setItem('horarios', JSON.stringify(horariosAtualizados));
  };

  const editarHorario = (id) => {
    const horarioEdit = horarios.find(horario => horario.id === id);
    setHorarioEditando(horarioEdit);
  };

  const atualizarHorario = (id, nome) => {
    const horariosAtualizados = horarios.map(horario => {
      if (horario.id === id) {
        return { ...horario, nome: nome };
      }
      return horario;
    });
    setHorarios(horariosAtualizados);
    setHorarioEditando(null);

    localStorage.setItem('horarios', JSON.stringify(horariosAtualizados));
  };

  return (
    <div className="horarios-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nome = e.target.elements.nome.value;
          if (horarioEditando) {
            atualizarHorario(horarioEditando.id, nome);
          } else {
            adicionarHorario(nome);
          }
          e.target.reset();
        }}
      >
        <div className="adicionar-horario-container">
          <input
            type="text"
            name="nome"
            placeholder="Cadastrar Horário"
            defaultValue={horarioEditando ? horarioEditando.nome : ''}
            className="horarios-input"
            required
          />
          <button className="btn-adicionar" type="submit">
            {horarioEditando ? 'Atualizar Horário' : 'Adicionar Horário'}
          </button>
        </div>
      </form>

      <table className="horarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Horário</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={horario.id}>
              <td>{index + 1}</td>
              <td>{horario.nome}</td>
              <td>
                <button onClick={() => editarHorario(horario.id)}>Atualizar</button>
                <button onClick={() => removerHorario(horario.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Horarios;
