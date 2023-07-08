import React, { useState, useEffect } from 'react';
import './style.css';

function Periodos() {
  const [periodos, setPeriodos] = useState([]);
  const [periodoEditando, setPeriodoEditando] = useState(null);
  const [contadorId, setContadorId] = useState(1);
  const [turno, setTurno] = useState('');

  useEffect(() => {
    const periodosSalvos = localStorage.getItem('periodos');
    const contadorSalvo = localStorage.getItem('contadorId');

    if (periodosSalvos) {
      setPeriodos(JSON.parse(periodosSalvos));
    }

    if (contadorSalvo) {
      setContadorId(parseInt(contadorSalvo));
    }
  }, []);

  const adicionarPeriodo = (nome, turno) => {
    const novoPeriodo = {
      id: contadorId,
      nome: nome,
      turno: turno
    };

    setContadorId(contadorId + 1);
    const periodosAtualizados = [...periodos, novoPeriodo];
    setPeriodos(periodosAtualizados);

    localStorage.setItem('periodos', JSON.stringify(periodosAtualizados));
    localStorage.setItem('contadorId', contadorId + 1);
  };

  const removerPeriodo = (id) => {
    const periodosAtualizados = periodos.filter(periodo => periodo.id !== id);
    setPeriodos(periodosAtualizados);

    localStorage.setItem('periodos', JSON.stringify(periodosAtualizados));
  };

  const editarPeriodo = (id) => {
    const periodoEdit = periodos.find(periodo => periodo.id === id);
    setPeriodoEditando(periodoEdit);
  };

  const atualizarPeriodo = (id, nome, turno) => {
    const periodosAtualizados = periodos.map(periodo => {
      if (periodo.id === id) {
        return { ...periodo, nome: nome, turno: turno };
      }
      return periodo;
    });
    setPeriodos(periodosAtualizados);
    setPeriodoEditando(null);

    localStorage.setItem('periodos', JSON.stringify(periodosAtualizados));
  };

  return (
    <div className="periodos-container">
      <form onSubmit={(e) => {
        e.preventDefault();
        const nome = e.target.elements.nome.value;
        if (periodoEditando) {
          atualizarPeriodo(periodoEditando.id, nome, turno);
        } else {
          adicionarPeriodo(nome, turno);
        }
        e.target.reset();
        setTurno('');
      }}>
        <div className="adicionar-periodo-container">
          <input
            type="text"
            name="nome"
            placeholder="Cadastrar Período"
            defaultValue={periodoEditando ? periodoEditando.nome : ''}
            className="periodo-input"
            required
          />
          <select
            name="turno"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
            className="turno-select"
            required
          >
            <option value="">Selecione o turno</option>
            <option value="Matutino">Matutino</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noturno">Noturno</option>
          </select>
          <button className="btn-adicionar" type="submit">
            {periodoEditando ? 'Atualizar Período' : 'Adicionar Período'}
          </button>
        </div>
      </form>

      <table className="periodos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Período</th>
            <th>Turno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {periodos.map((periodo, index) => (
            <tr key={periodo.id}>
              <td>{index + 1}</td>
              <td>{periodo.nome}</td>
              <td>{periodo.turno}</td>
              <td>
                <button onClick={() => editarPeriodo(periodo.id)}>Atualizar</button>
                <button onClick={() => removerPeriodo(periodo.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Periodos;
