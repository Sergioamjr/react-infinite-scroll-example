import React, { useState, useEffect, useRef } from "react";
import useIsElementVisible from "./hooks/useIsElementVisible";
import { fetchTodos } from "./services";

export default function App() {
  const lastRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState({
    itens: [],
    page: 0,
    totalPages: 1,
  });
  const isLastVisible = useIsElementVisible(lastRef.current);

  useEffect(() => {
    getMoreTodos(todos.page + 1);
  }, []);

  useEffect(() => {
    if (isLastVisible) {
      getMoreTodos(todos.page + 1);
    }
  }, [isLastVisible]);

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
    <div className="container">
      <h2 className="title">Lorem ipsum's list</h2>
      {todos.itens.map(({ title }, index) => {
        return (
          <div className="card-box" key={index}>
            <p>{title}</p>
          </div>
        );
      })}
      {!!todos.itens.length && todos.page < todos.totalPages && (
        <div ref={lastRef} />
      )}
      {isLoading && <p className="loading">Loading...</p>}
    </div>
  );
}
