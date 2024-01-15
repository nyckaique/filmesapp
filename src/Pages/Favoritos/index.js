import "./favoritos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("listafilmes");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((filme) => {
      return filme.id !== id;
    });
    setFilmes(filtroFilmes);
    localStorage.setItem("listafilmes", JSON.stringify(filtroFilmes));
    toast.success("Filme excluído com sucesso!");
  }

  return (
    <div className="meus-filmes">
      <h1>Meus Fimes Favoritos</h1>

      {filmes.length === 0 && (
        <span>Você ainda não adicionou nenhum filme à sua lista.</span>
      )}

      <ul>
        {filmes.map((filme) => {
          return (
            <li key={filme.id}>
              <span>{filme.title}</span>
              <div>
                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Favoritos;
