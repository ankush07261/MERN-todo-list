import React, { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../apiHandlers/api";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './css/home.css'

function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [setTodos]);

  const fetchTodos = async () => {
    try {
      const data = await getAllTodos();
      setTodos(data);
    } catch (error) {}
  };

  const createHnadler = async (e) => {
    e.preventDefault();
    try {
      const data = { title: title };
      const newTodo = await createTodo(data);

      setTodos((currTodo) => {
        return [...currTodo, newTodo];
      });

      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteTodo(id);
      const allTodos = todos.filter((todo) => todo._id !== id);
      setTodos(allTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleTodo = async (todo) => {
    setEditMode(true);
    setUpdateId(todo._id);
    setTitle(todo.title);
  };
  console.log(updateId);

  // update todo
  const updateHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await updateTodo(updateId, { title: title });

      setTodos((todos) =>
        todos.map((todo) => {
          if (todo._id === res._id) {
            return { ...todo, title: title };
          }
          return todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setUpdateId("");
    setEditMode(false);
  };

  return (
    <div className="home">
      <form onSubmit={editMode ? updateHandler : createHnadler}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit"> {editMode ? "Update" : "Add"} </button>
      </form>
        <hr/>
      
        {todos?.map((todo) => (
          <div className="tasks" key={todo?._id}>
            <h3>{todo.title}</h3>
            <div className="options">
              <FaEdit onClick={() => getSingleTodo(todo)} />
              <MdDelete onClick={() => deleteHandler(todo._id)} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;

// import React, { useEffect, useState } from 'react'
// import { createTodo, getAllTodos, deleteTodo, updateTodo } from '../apiHandlers/api';
// import { CiEdit } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
// import './css/home.css'

// function Home() {
//     const [todos, setTodos] = useState([]);
//     const [title, setTitle] = useState("");
//     const [editMode, setEditMode] = useState(false);
//     const[updateId, setUpdateId] = useState("")

//     useEffect(()=>{
//         fetchTodos();
//     }, [setTodos]);

//     const fetchTodos = async () => {
//         try {
//             const data = await getAllTodos();
//             setTodos(data);
//         } catch (error) {
            
//         }
//     }

//     const createHnadler = async (e) => {
//         e.preventDefault();
//         try {
//             const data = { title: title };
//             const newTodo = await createTodo(data);
        
//             setTodos((currTodo) => {
//                 return [...currTodo, newTodo];
//             });
    
//             setTitle("");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const updateHandler = async (e) => {
//         try {
//             e.preventDefault();
//             const res = await updateTodo(updateId, { title: title });

//             setTodos((todos) =>
//                 todos.map((todo) => {
//                     if (todo._id === res._id) {
//                         return { ...todo, title: title };
//                     }
//                     return todo;
//                 })
//             );
//         } catch (error) {
//             console.log(error);
//         }
//         setTitle("");
//         setUpdateId("");
//         setEditMode(false);
//     };
    
//     const deleteHandler = async (id) => {
//         try {
//             await deleteTodo(id);
//             const allTodos = todos.filter((todo) => todo._id !== id);
//             setTodos(allTodos);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//     <div className="home">
//         <form onSubmit= {editMode?createHnadler:updateHandler}>
//             <input type="text" name="title" value={title} 
//                 onChange={(e) => setTitle(e.target.value) }
//             />
//                 <button type="submit">{ editMode ? "Update" : "Add"}</button>
//         </form>

//         <div>
//         {
//             todos.map((todo) => (
//                 <div key={todo?._id} className="tasks">
//                     <input type="checkbox" className="done"/>
//                     <h3>{todo.title}</h3>
//                     <div className="options">
//                         <CiEdit className="option btn-edit"
//                             onClick={() => setEditMode(!editMode)}
//                         />
//                         <MdDelete className="option btn-delete"
//                             onClick={() => deleteHandler(todo._id)}
//                         />
//                     </div>
//                 </div>
//             ))
//         }
//         </div>
//     </div>
//   )
// }

// export default Home