import React from 'react';
import styles from './ListBlock.module.css'
import {AiFillTag} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import ListItem from "./ListItem";
const ListBlock = ({setCheckTags, tasks, setTasks, status, modalShow, setModalShow, setModalShowObj, setCheck}) => {

    const{ list, item, itemLeft, itemRight, priority, priorityCircle, action, date, dateIcon, actionDelete } = styles;

    const delTask = (id) => {
        setTasks(tasks.filter((elem) => {
            return id!==elem.id
        }
            ))
    }


    const successHandler = (id) => {
        setTasks(tasks.map((el) => {
            if (el.id === id) {
                return{...el, success: !el.success, pending: !el.pending}
            }
            else{
                return el
            }
        }))
    };

    return (
        <ul className={list}>
            {tasks.filter((task) => {
                if(status === 'pending') {
                    return task.pending
                } if(status === 'success') {
                    return task.success
                }
                return task
            }).map((task) => (
                <ListItem priority={priority} task={task} setModalShow={setModalShow} action={action} date={date}
                                  setCheck={setCheck} setCheckTags={setCheckTags} setModalShowObj={setModalShowObj} dateIcon={dateIcon}
                                  successHandler={successHandler} actionDelete={actionDelete} item={item} itemRight={itemRight} priorityCircle={priorityCircle}
                                  delTask={delTask} itemLeft={itemLeft}
                />
            ))}

        </ul>
    );
};

export default ListBlock;