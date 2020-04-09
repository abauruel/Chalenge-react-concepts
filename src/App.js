import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const data = {
      title: `Desafio ${Date.now()}`,
      url: "urlDoRepositorio",
      techs: ["tech01", "tech02"],
    };
    const response = await api.post("/repositories", data);
    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    const repoRefreshed = repositories.filter((repo) => repo.id !== id);

    setRepositories(repoRefreshed);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories?.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
