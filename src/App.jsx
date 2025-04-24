import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState(["Learn React"]);
  
  const [completed, setCompleted] = useState(["Task Completed"]);
  const [text, setText] = useState("");
  const [msg, SetMsg] = useState("");

  const deleteTask = (index) => {
    const updatedTasks = [...task];
    updatedTasks.splice(index, 1);
    setTask(updatedTasks);
  };

  const completedTheTask = (index) => {
    const updatedTasks = [...task];
    const [finishedTask] = updatedTasks.splice(index, 1);
    setCompleted([...completed, finishedTask]);
    setTask(updatedTasks);
  };

  const undoTask = (index) => {
    setTimeout(() => {
      const updatedCompleted = [...completed];
      const [restoredTask] = updatedCompleted.splice(index, 1);
      setTask([...task, restoredTask]);
      setCompleted(updatedCompleted);
    }, 500);
  };

  return (
    <div className="container">
      <div>
        <h1 id='head'>TO DO List .</h1>
      </div>

      <div className="child1">
        <input
          type="text"
          id="inp"
          value={text}
          placeholder='Enter a task'
          onChange={(e) => setText(e.target.value)}
        />

        <button
          id='add-btn'
          onClick={() => {
            SetMsg('');
            if (text.trim() === '') {
              SetMsg("Can't add empty task");
              return;
            }
            setTask([...task, text.trim()]);
            setText('');
          }}
        >
          Add Task
        </button>
      </div>

      <p id='errMsg'>{msg}</p>
           
      <div className='child2'>
        <div className="ongoing">
          <h1 className='bor'>Ongoing Task</h1>

          {task.map((item, index) => (
            <div className='render-task' key={index}>
              <input
                type='checkbox'
                aria-label="Mark task as completed"
                onChange={() => completedTheTask(index)}
              />

              <li>{item}</li>

              <img
                src="images/edit.png"
                alt="Edit task"
                width="22px"
                height="22px"
                onClick={() => {
                  let update_value = prompt("Previously task: " + task[index]);
                  if (update_value === null) return;
                  update_value = update_value.trim();
                  SetMsg('');
                  if (update_value === '') {
                    SetMsg("Can't update empty task");
                    return;
                  }
                  const updatedTasks = [...task];
                  updatedTasks.splice(index, 1, update_value);
                  setTask(updatedTasks);
                }}
              />

              <img
                src="images/delete.png"
                alt="Delete task"
                width="22px"
                height="22px"
                onClick={() => deleteTask(index)}
              />
            </div>
          ))}
        </div>

        <div className="completed">
          <h1 className='bor'>Completed Task</h1>

          {completed.map((item, index) => (
            <div className="undo" key={index}>
              <img
                src="images/back.png"
                alt="Undo completed task"
                height="22px"
                width="22px"
                onClick={() => undoTask(index)}
              />
              <li>{item}</li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
