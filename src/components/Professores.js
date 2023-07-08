import React, { useState, useEffect } from 'react';
import './style.css';

function Professores() {
  const [professores, setProfessores] = useState([]);
  const [professorEditando, setProfessorEditando] = useState(null);
  const [contadorId, setContadorId] = useState(1);

  useEffect(() => {
    const professoresSalvos = localStorage.getItem('professores');
    const contadorSalvo = localStorage.getItem('contadorId');

    if (professoresSalvos) {
      setProfessores(JSON.parse(professoresSalvos));
    }

    if (contadorSalvo) {
      setContadorId(parseInt(contadorSalvo));
    }
  }, []);

  const adicionarProfessor = (nome, materia) => {
    const novoProfessor = {
      id: contadorId,
      nome: nome,
      materia: materia
    };

    setContadorId(contadorId + 1);
    const professoresAtualizados = [...professores, novoProfessor];
    setProfessores(professoresAtualizados);

    localStorage.setItem('professores', JSON.stringify(professoresAtualizados));
    localStorage.setItem('contadorId', contadorId + 1);
  };

  const removerProfessor = (id) => {
    const professoresAtualizados = professores.filter(professor => professor.id !== id);
    setProfessores(professoresAtualizados);

    localStorage.setItem('professores', JSON.stringify(professoresAtualizados));
  };

  const editarProfessor = (id) => {
    const professorEdit = professores.find(professor => professor.id === id);
    setProfessorEditando(professorEdit);
  };

  const atualizarProfessor = (id, nome, materia) => {
    const professoresAtualizados = professores.map(professor => {
      if (professor.id === id) {
        return { ...professor, nome: nome, materia: materia };
      }
      return professor;
    });
    setProfessores(professoresAtualizados);
    setProfessorEditando(null);

    localStorage.setItem('professores', JSON.stringify(professoresAtualizados));
  };

  return (
    <div className="professores-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nome = e.target.elements.nome.value;
          const materia = e.target.elements.materia.value;
          if (professorEditando) {
            atualizarProfessor(professorEditando.id, nome, materia);
          } else {
            adicionarProfessor(nome, materia);
          }
          e.target.reset();
        }}
      >
        <div className="adicionar-professor-container">
          <input
            type="text"
            name="nome"
            placeholder="Professor"
            defaultValue={professorEditando ? professorEditando.nome : ''}
            className="curso-input"
            required
          />
          <input
            type="text"
            name="materia"
            placeholder="Matéria"
            defaultValue={professorEditando ? professorEditando.materia : ''}
            className="curso-input"
            required
          />
          <button className="btn-adicionar" type="submit">
            {professorEditando ? 'Atualizar Professor' : 'Adicionar Professor'}
          </button>
        </div>
      </form>

      <table className="professores-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Professor</th>
            <th>Matéria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor, index) => (
            <tr key={professor.id}>
              <td>{index + 1}</td>
              <td>{professor.nome}</td>
              <td>{professor.materia}</td>
              <td>
                <button onClick={() => editarProfessor(professor.id)}>Atualizar</button>
                <button onClick={() => removerProfessor(professor.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Professores;
