import React, { useState, useEffect } from 'react';
import './style.css';

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [cursoEditando, setCursoEditando] = useState(null);
  const [contadorId, setContadorId] = useState(1);

  useEffect(() => {
    const cursosSalvos = localStorage.getItem('cursos');
    const contadorSalvo = localStorage.getItem('contadorId');

    if (cursosSalvos) {
      setCursos(JSON.parse(cursosSalvos));
    }

    if (contadorSalvo) {
      setContadorId(parseInt(contadorSalvo));
    }
  }, []);

  const adicionarCurso = (nome) => {
    const novoCurso = {
      id: contadorId,
      nome: nome
    };

    setContadorId(contadorId + 1);
    const cursosAtualizados = [...cursos, novoCurso];
    setCursos(cursosAtualizados);

    localStorage.setItem('cursos', JSON.stringify(cursosAtualizados));
    localStorage.setItem('contadorId', contadorId + 1);
  };

  const removerCurso = (id) => {
    const cursosAtualizados = cursos.filter(curso => curso.id !== id);
    setCursos(cursosAtualizados);

    localStorage.setItem('cursos', JSON.stringify(cursosAtualizados));
  };

  const editarCurso = (id) => {
    const cursoEdit = cursos.find(curso => curso.id === id);
    setCursoEditando(cursoEdit);
  };

  const atualizarCurso = (id, nome) => {
    const cursosAtualizados = cursos.map(curso => {
      if (curso.id === id) {
        return { ...curso, nome: nome };
      }
      return curso;
    });
    setCursos(cursosAtualizados);
    setCursoEditando(null);

    localStorage.setItem('cursos', JSON.stringify(cursosAtualizados));
  };

  return (
    <div className="periodos-container">
      <form onSubmit={(e) => {
        e.preventDefault();
        const nome = e.target.elements.nome.value;
        if (cursoEditando) {
          atualizarCurso(cursoEditando.id, nome);
        } else {
          adicionarCurso(nome);
        }
        e.target.reset();
      }}>
        <div className="adicionar-curso-container">
          <input
            type="text"
            name="nome"
            placeholder="Cadastrar Curso"
            defaultValue={cursoEditando ? cursoEditando.nome : ''}
            className="curso-input"
            required
          />
          <button className="btn-adicionar" type="submit">
            {cursoEditando ? 'Atualizar Curso' : 'Adicionar Curso'}
          </button>
        </div>
      </form>

      <table className="cursos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Curso</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso, index) => (
            <tr key={curso.id}>
              <td>{index + 1}</td>
              <td>{curso.nome}</td>
              <td>
                <button onClick={() => editarCurso(curso.id)}>Atualizar</button>
                <button onClick={() => removerCurso(curso.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cursos;
