import React from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

function Task({ tasks, handleDelete, handleComplete, handleEdit }) {
  console.log(tasks);
  return (
    <>
      {tasks.map((record) => {
        return (
          <Container key={record.id}>
            <Left>
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                checked={record.completed ? true : false}
                onChange={() => handleComplete(record.id, record.completed)}
              />
              <Desc
                style={
                  record.completed ? { textDecoration: "line-through" } : {}
                }
              >
                {record.task}
              </Desc>
            </Left>
            <Right>
              <AiFillEdit
                style={iconStyle}
                onClick={() => handleEdit(record.id, record.task)}
              ></AiFillEdit>
              <MdDelete
                style={iconStyle}
                onClick={() => handleDelete(record.id)}
              ></MdDelete>
            </Right>
          </Container>
        );
      })}
    </>
  );
}

const Container = styled.div`
  border: 1px solid black;
  width: 80%;
  max-width: 700px;
  margin: auto auto;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const iconStyle = {
  width: "1.5rem",
  cursor: "pointer",
  margin: "0.2rem",
};
const Desc = styled.p`
  margin-left: 1rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Right = styled.div``;

export default Task;
