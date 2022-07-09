export const getTodos = () => {
  const todos = [
    {
      label: "write api test",
      id: 1,
      completed: false,
    },
    {
      label: "write code",
      id: 2,
      completed: false,
    },
  ];
  const error = null; // = "oopsie. bad request!";

  return new Promise((resolve, reject) =>
    setTimeout(() => (error ? reject(error) : resolve(todos)), 1000)
  );
};
