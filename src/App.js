import React, {useEffect, useState} from 'react';
import './style.css'
import StatusBlock from "./Components/StatusBlock/StatusBlock";
import FormBlock from "./Components/FormBlock/FormBlock";
import ListBlock from "./Components/ListBlock/ListBlock";
import {MdDelete} from 'react-icons/md'
import MyVerticallyCenteredModal from "./Components/Popup/popup";

function App() {
    const [modalShow, setModalShow] = useState(false);
    const [check, setCheck] = useState('');
    const [checkTags, setCheckTags] = useState({});
    const [isTitleChange, setIsTitleChange] = useState(false);
    const [isDescription, setIsDescription] = useState(false);
    const [action, setAction] = useState('');

    const [modalShowObj, setModalShowObj] = useState({
        success: null,
        pending: null,
        date: null,
        titles: '',
        description: '',
        priority: '',
        tags: [],
        id: null
    });
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'go to the cinema',
            date: 'jul 19',
            priority: 'Medium',
            success: false,
            pending: true,
            tags: ['Home'],
            description: 'fsfsfsfsf'
        }
    ]);
    const [status,setStatus] =useState('total');
    useEffect(()=> {
        setTasks(JSON.parse(localStorage.getItem('tasks')))
    },[])
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }, [tasks]);

    return (
        <div className='App'>
            <div className='container'>
                <div className='App_content'>

                        <h1 className='App_title'> MY TODO</h1>
                    <StatusBlock tasks={tasks} setStatus={setStatus}/>
                    <FormBlock setTasks={setTasks} tasks={tasks} />
                    {
                        tasks.length === 0 && status === 'total' ? <p>No tasks</p>
                            : tasks.filter(el=>el.pending).length === 0 && status === 'pending'?<p>The pending list is empty</p>
                            : tasks.filter(el=>el.success).length === 0 && status === 'success'?<p>The success list is empty</p>
                        :<>
                            <ListBlock setCheckTags={setCheckTags} setCheck={setCheck} setModalShowObj={setModalShowObj} modalShow={modalShow} setModalShow={setModalShow} setTasks={setTasks} tasks={tasks} setStatus={setStatus} status={status}/>
                            <p className='App_clear' onClick={() => setTasks([])} >
                                Clear All
                                <MdDelete/></p>
                        </>
                    }


                </div>
            </div>
            <MyVerticallyCenteredModal
                tasks={tasks}
                setTasks={setTasks}
                obj={modalShowObj}
                check={check}
                setCheck={setCheck}
                checkTags={checkTags}
                setCheckTags={setCheckTags}
                show={modalShow}
                isTitleChange={isTitleChange}
                setIsTitleChange={setIsTitleChange}
                onHide={() =>{
                    setModalShow(false)
                    setIsTitleChange(false)
                    setIsDescription(false)
                } }
                isDescription={isDescription}
                setIsDescription={setIsDescription}
                action={action}
                setAction={setAction}

            />
        </div>
    );
}

export default App;
