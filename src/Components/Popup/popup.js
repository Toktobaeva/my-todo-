import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import {AiFillTag} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'

function MyVerticallyCenteredModal(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState(['Home', 'Work', 'Personal'])
    const [addTag, setAddTag] = useState('')
    const {checkTags, setCheckTags, action, setAction, check, setCheck, obj, tasks, setTasks, isTitleChange, setIsTitleChange, isDescription, setIsDescription} = props;
    let priority = ['High', 'Medium', 'Low', 'None'];

    const saveChangesHandler = (id) => {
        props.setTasks(props.tasks.map((item) => {
            if (id === item.id) {
                return {...item, tags:checkTags, priority: props.check, title: title.length ? title : item.title, description: description.length?description:item.description}
            }
            return item
        }));
        props.onHide();
    };

const createTag = (e) =>{
    if (e.key === 'Enter' && addTag.trim().length){
        if (tags.includes(addTag)){
            alert('Such a tag already exists')
        }else{
            setTags([...tags, addTag])
        }

        e.target.value = ''
        setAddTag('')
    }
}

const delTag = (name) => {
    setTags(tags.filter((el) =>el !== name))
};
const checkTagsHandler = (tag) => {
if (checkTags.includes(tag)){
    setCheckTags(checkTags.filter((el) => {
        return el !== tag
    }))
}else {
    setCheckTags([...checkTags, tag])
}
};
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Task Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className='popup_title-block'>
                    {isTitleChange ?
                        <input type="text" className='popup_title-input' defaultValue={props.obj.title}
                               onChange={(e) => setTitle(e.target.value)}/>
                        : <>
                            <h4>{props.obj.title}</h4>
                            <span className='popup_title-btn' onClick={() => setIsTitleChange(true)}>
                        <FiEdit/>
                    </span>
                        </>
                    }
                </div>
                <div className='popup_description-block'>
                    {
                        isDescription ? <textarea style={{width: '100%'}} onChange={(e)=> setDescription(e.target.value)} defaultValue={obj.description}/>
                            :
                            <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom:'20px'}}>
                            <p>
                                {obj.description}
                            </p>
                            <span style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={()=> setIsDescription(true) }>
                                {
                                    obj.description.length ? 'Edit' : 'Add '
                                }
                                    description
                            </span>
                        </div>
                    }
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button style={{width: '40%'}} className={action === 'priority' ? 'active' : ''} variant="outline-primary"
                            onClick={()=>setAction('priority')}>!!! Priority</Button>
                    <Button style={{width: '40%'}} className={action === 'tags' ? 'active' : ''} variant="outline-primary"
                            onClick={()=>setAction('tags')}>
                        <AiFillTag/>
                        Tags
                    </Button>
                </div>

                <div>

                    {
                      action === 'priority' ?
                        priority.map((item) => (
                            <Form.Check type='radio' id={`check-api-${item}`}
                                        style={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                <Form.Check.Input style={{borderColor: "blue"}} checked={item === props.check}
                                                  onChange={() => props.setCheck(item)} name='priority' type='radio'
                                                  isValid/>
                                <Form.Check.Label style={{display: 'flex', alignItems: 'center', color: 'blue'}}>
                                    <span style={{
                                        color: item === 'High' ? 'red' : item === 'Medium' ? 'Yellow' : item === 'Low' ? 'skyBlue' : 'black',
                                        width: '30px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'
                                    }}>
                                        {`${item === 'High' || item === 'None' ? '!!!' : item === 'Medium' ? '!!' : '!'}`}
                                    </span> {`${item} priority`}</Form.Check.Label>
                            </Form.Check>
                        ))
                          : action === 'tags' ?
                          <>
                              <Form.Control type="text" placeholder="Create Tag" value={addTag}
                                            onChange={(e)=>setAddTag(e.target.value)} onKeyPress={createTag}/>

                              {tags.map((item)=>(
                              <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center', marginTop: '10px'}}>
                                  <div>
                                      <AiFillTag/>
                                      <span style={{marginLeft: '10px', fontSize:'22px'}}>{item}</span>
                                  </div>
                                  <div style={{display:'flex',alignItems: 'center'}}>
                                      <input checked={checkTags.includes(item)} onChange={()=>checkTagsHandler(item)} type='checkbox' style={{width:'25px', height:'25px'}}/>
                                      <span style={{marginLeft:'10px', cursor:'pointer'}} onClick={()=> delTag(item)}>x</span>
                                  </div>

                              </div>
                          )) }
                          </>
                          : ''
                    }

                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary' onClick={props.onHide}>Close</Button>
                <Button variant='outline-primary' onClick={() => saveChangesHandler(props.obj.id)}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;










// import React, {useEffect, useState} from 'react'
// import {Modal, Button, Form} from 'react-bootstrap'
// import {AiFillTag} from "react-icons/ai";
// import {FiEdit} from "react-icons/fi";
//
// function MyVerticallyCenteredModal(props) {
//
// const {title, setTitle} = useState('');
// const {isTitleChange, setIsTitleChange} = useState(false)
// const {check, setCheck, obj, tasks, setTasks, isTitleChange, setIsTitleChange} = props;
//     let priority = ['High', 'Medium', 'Low', 'None'];
// const saveChangesHandler = (id) => {
//     setTasks(tasks.map((item) => {
//         if (id === item.id){
//             return{...item, priority: check, title: title.length ? title : item.title}
//         }
//         return item
//     }))
//     props.onHide();
// };
//     return (
//         <Modal
//             {...props}
//             size="md"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Task Detailes
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                <div className='popup_title-block'>
//
//                    {isTitleChange
//                    ? <input type='text' defaultValue={props.obj.title} onChange={(e) => setTitle(e.target.value)} className='popup_title-input'/>
//                    : <>
//                        <h4 className='popup_title'>{obj.title} </h4>
//
//                        <span className='popup_title-btn' onClick={() => setIsTitleChange(true)}>
//                            <FiEdit/>
//                        </span>
//                        </>
//                    }
//
//
//                </div>
//                 <div style={{display: 'flex', justifyContent: 'space-between'}}>
//                     <Button style={{width: '40%'}} variant="outline-primary">!!!! Priority</Button>
//                     <Button style={{width: '40%'}} variant="outline-primary">
//                         <AiFillTag/>
//                         Tags
//                     </Button>
//
//                 </div>
//                 <div>
//                     {
//                         priority.map((item) => (
//                             <Form.Check type='radio' id={`check-api-${item}`} style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
//                                 <Form.Check.Input style={{borderColor: 'Blue'}} checked={item === check} onChange={() => setCheck(item)} name='priority' type='radio' isValid />
//                                 <Form.Check.Label style={{display: 'flex', alignItems:'center', color:'Blue'}}>
//                                     <span style={{color: item === 'High' ? 'red'
//                                            : item === 'Medium' ? 'yellow'
//                                                 : item === 'Low' ? 'blue'
//                                                     : 'black',
//                                         width: '30px', textAlign: 'center', fontSize: '20px', fontWeight:'Bold'
//                                                 }}>
//                                         {`${item === 'High' || item === 'None' ? '!!!'
//                                             : item === 'Medium' ? '!!' : '!'}`}
//                                     </span>{`${item} priority`}</Form.Check.Label>
//                             </Form.Check>
//                         ))
//                     }
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="outline-primary" onClick={() => {
//                     props.onHide()
//                     setIsTitleChange(false)
//                 }}>Close</Button>
//                 <Button variant="outline-secondary" onClick={() => saveChangesHandler(obj.id) }>Save Changes</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }
//
// export default MyVerticallyCenteredModal;