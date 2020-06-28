import mock from "./mock.json";

const perPage = 10;
const timeout = 2000;
export const fetchTodos = (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initial = perPage * page - perPage;
      const final = perPage * page;

      const filtered = mock.filter((el, index) => {
        return index > initial && index <= final;
      });

      return resolve({
        itens: filtered,
        page,
        totalPages: mock.length / perPage,
      });
    }, timeout);
  });
};
