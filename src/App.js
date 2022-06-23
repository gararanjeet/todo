import "./App.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Axios from "./Axios";
import Task from "./Components/Task";

function App() {
  const fetchTasks = (page = 1) => {
    Axios.get("/", { params: { page } }).then((res) => {
      const data = res.data.tasks;
      setTasks(data);
      setIsStart(res.data.isStart);
      setIsEnd(res.data.isEnd);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    });
  };

  const handleSubmit = () => {
    if (task !== "") {
      Axios.post("/addTask", { task, id }).then((res) => {
        if (isNaN(id)) fetchTasks(1);
        else fetchTasks(page);

        setTask("");
        setId(NaN);
      });
    }
  };

  const handleComplete = (id, presentState) => {
    Axios.patch("/completeTask", { id, presentState }).then((res) => {
      fetchTasks(page);
    });
  };

  const handleEdit = (id, value) => {
    setTask(value);
    setId(id);
  };

  const handleDelete = (id) => {
    Axios.delete("/deleteTask", { data: { id } }).then((res) =>
      fetchTasks(page)
    );
  };

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(true);
  const [id, setId] = useState(NaN);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("page", page);
  }, [page]);

  useEffect(() => {
    window.sessionStorage.setItem("totalPages", totalPages);
  }, [totalPages]);

  return (
    <div className="App">
      <Heading>Todo App</Heading>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          type={"text"}
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <Button type="submit">Add</Button>
      </Form>
      <Task
        tasks={tasks}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
        handleEdit={handleEdit}
      />
      {/* {tasks.map((record) => (
        <Task key={record.id}>
          <input type="checkbox" />
          <Desc>{record.task}</Desc>
          <Edit>Edit</Edit>
          <Delete onClick={() => handleDelete(record.id)}>Delete</Delete>
        </Task>
      ))} */}
      <Paginator>
        <Prev
          disabled={isStart ? true : false}
          onClick={() => fetchTasks(page - 1)}
        >
          Prev
        </Prev>
        <p>
          {console.log(page)}
          {page} of {totalPages}
        </p>
        <Next
          disabled={isEnd ? true : false}
          onClick={() => fetchTasks(page + 1)}
        >
          Next
        </Next>
      </Paginator>
    </div>
  );
}

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 800;
`;

const Form = styled.form`
  margin-bottom: 2rem;
`;

// const Task = styled.div`
//   margin: 0 auto 50px;
//   padding: 10px;
//   border: 1px solid grey;
//   max-width: 1200px;
//   width: 80%;
// `;

const Input = styled.input`
  width: min(500px, 70%);
  height: 40px;
`;
const Button = styled.button`
  margin-left: 1rem;
  height: 40px;
  width: 60px;
`;
const Paginator = styled.div`
  display: flex;
  justify-content: center;
`;
const Next = styled.button``;
const Prev = styled.button``;
export default App;
