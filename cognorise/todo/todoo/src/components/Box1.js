import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Eedit = ({ task, index, handleSave }) => {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(task);

  useEffect(() => {
    setText(task); 
  }, [task]);

  const handleEdit = () => {
    setEditing(true);
  };

  const saveChanges = () => {
    handleSave(index, text); 
    setEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#modal-${index}`}
      >
        EDIT
      </button>

      <div
        className="modal fade"
        id={`modal-${index}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              TASK:
              {isEditing ? (
                <div>
                  <input type="text" value={text} onChange={handleChange} />
                  <button onClick={saveChanges}>Save</button>
                </div>
              ) : (
                <div>
                  <p>{text}</p>
                  <button onClick={handleEdit}>Edit</button>
                </div>
              )}
              <hr />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={saveChanges}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Box = () => {
  const [add, setAdd] = useState('');
  const [tasks, setTasks] = useState(['eat', 'drink', 'Item 3']);

  const handleSubmit = () => {
    if (add.trim() !== '') {
      setTasks([...tasks, add]);
      setAdd('');
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSave = (index, newText) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? newText : task));
    setTasks(updatedTasks);
  };

  return (
    <div style={{ backgroundColor: 'whitesmoke', margin: '0rem 15rem', height: '100vh' }}>
      <center>
        <h1>TO-DO LIST</h1>
        <input placeholder="enter task" value={add} onChange={(e) => setAdd(e.target.value)} style={{padding:'0.3rem 0rem'}}/> &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleSubmit} class="btn btn-dark">Submit</button>
        <hr />
        <ul style={{ listStyle: 'none', padding: 0 }}>
  {tasks.map((task, index) => (
    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <span style={{ marginRight: '10px', flex: 1 ,color:'black'}}>{task}</span>
      <Eedit task={task} index={index} handleSave={handleSave} />
      <button style={{ marginLeft: '10px' }} class="btn btn-danger" onClick={() => handleDelete(index)}>DELETE</button>
    </li>
  ))}
</ul>


      </center>
    </div>
  );
};

export default Box;
