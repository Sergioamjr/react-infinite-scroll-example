import React, { useState, useEffect, useRef } from "react";
import useIsElementVisible from "./hooks/useIsElementVisible";
import { fetchTodos } from "./services";

const App = () => {
  const lastRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState({
    itens: [],
    page: 1,
    totalPages: 1000,
  });
  const isLastVisible = useIsElementVisible(lastRef.current);

  useEffect(() => {
    getMoreTodos(1);
  }, []);

  useEffect(() => {
    if (isLastVisible) {
      getMoreTodos(todos.page + 1);
    }
  }, [isLastVisible, todos.page]);

  const getMoreTodos = async (page) => {
    try {
      setIsLoading(true);
      const newTodos = await fetchTodos(page);
      setTodos((prev) => ({
        ...newTodos,
        itens: prev.itens.concat(newTodos.itens),
      }));
      setIsLoading(false);
    } catch (err) {}
  };

  return (
    <div>
      <h2>Lista de Todos</h2>
      {todos.itens.map(({ title }, index) => {
        return (
          <div key={index}>
            <p>{title}</p>
          </div>
        );
      })}
      {!!todos.itens.length && <div ref={lastRef} />}
      {isLoading && <p>CARREGANDO...</p>}
    </div>
  );
};

export default App;
