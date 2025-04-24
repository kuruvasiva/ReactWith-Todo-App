import { useState } from 'react'
import './App.css'
function App() {


  const [task, setTask] = useState(["Learn React"])

  const [completed, setCompleted] = useState(["Task Completed"]);

  const [text, setText] = useState("");  // intilaize text sata

  const [cb, setCb] = useState(false);// check box stop auto select next text
 
  const[msg,SetMsg] = useState("")

  const deleteTask = (place) => {
    task.splice(place, 1)
    setTask([...task])

  }
  const completedTheTask = (place) => {

    setCompleted([...completed, task.splice(place, 1)])
    setCb(false)
    setTask([...task])
  }

  const undoTask = (place)=>{
     setTimeout (()=>{
      setTask([...task, completed.splice(place, 1)])
      setCb(false)
      setCompleted([...completed])
     },500)
   

  }
  return (
    <>
      <div className="container">
        <div>
          <h1 id='head'>TO DO List .</h1>
        </div>



        <div className="child1">
          <input type="text" id="inp"
            value={text}

            placeholder='Adding the task'
            onChange={(event) => { setText(event.target.value) }}
          />

          <button id='add-btn' onClick={() => {
           SetMsg('') 
             if(''==text.trim()){
              SetMsg("Can't add empty task")
              return;
             }
             
             setTask([...task, text])
             setText('')
          }}>Add Task</button>
          
        </div>
       
       <p id='errMsg'> {msg}</p>

        <div className='child2'>

          <div className="ongoing">

            <h1 className='bor'>Ongoing Task</h1>

            {task.map((iteam, index) =>
            
              <div className='render-task'>

                <input type='checkbox'
                  id={index}
                  checked={cb}
                  onChange={() => completedTheTask(index)}
                />

                <li>{iteam}</li>
                <img id={index} src="images/edit.png" alt="" width="22px" height="22px" onClick={()=>{

                   let update_value=prompt("Previously task: "+task[index]).trim()

                   SetMsg('')                   
                   if(update_value===''){
                    SetMsg("Can't update empty task")
                    return;
                   }else if(update_value === null){
                    return;
                   }else {
                      task.splice(index,1,update_value)
                      setTask([...task])
                   }
                   console.log(update_value.trim()+" what is forst     ")

                }}/>
                <img id={index} src="images/delete.png" alt="" width="22px" height="22px" onClick={() => { deleteTask(index) }} />

              </div>)}

          </div>

          <div className="completed">


            <h1 className='bor'>Completed Task</h1>

             {completed.map((iteam,index) => 
             
             <div className="undo">

             <img src="images/back.png" alt="Images not found" height="22px" width="22px"
              onClick={()=>{undoTask(index)}}
             />
             <li>{iteam}</li>
             </div>
             
             
             
             )}

             
          
          </div>

        </div>

      </div>
    </>
  )
}

export default App
