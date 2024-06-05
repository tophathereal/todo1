import React, {useState} from 'react';
import EditTask from '../modals/EditTask'

const Card = ({taskObj, index, deleteTask, updateListArray, availableCategories}) => {
    const [modal, setModal] = useState(false);
    const [isCompleted, setIsCompleted] = useState(taskObj.isCompleted || false);

    const categoryColors = {
        "Work": { primary: "#5D93E1", secondary: "#ECF3FC" },
        "Personal": { primary: "#F9D288", secondary: "#FEFAF1" },
        "Health": { primary: "#5DC250", secondary: "#F2FAF1" },
        "Errands": { primary: "#F48687", secondary: "#FDF1F1" },
        "Study": { primary: "#B964F7", secondary: "#F3F0FD" }
    };

    const defaultColor = { primary: "#808080", secondary: "#E0E0E0" };

    const getColorByCategory = (category) => {
        return categoryColors[category] || defaultColor;
    }

    const { primary: primaryColor, secondary: secondaryColor } = getColorByCategory(taskObj.category);
    const completedColor = `${primaryColor}88`; // Add 88 for 53% opacity in hex, making it darker

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    const handleComplete = (e) => {
        const completed = e.target.checked;
        setIsCompleted(completed);
        taskObj.isCompleted = completed;
        updateListArray(taskObj, index);
    }

    const cardColor = isCompleted ? completedColor : primaryColor;
    const textColor = isCompleted ? "text-white" : "";

    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{"backgroundColor": cardColor}}></div>
            <div className="task-holder">
                <div className="d-flex align-items-center">
                    <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={isCompleted}
                        onChange={handleComplete}
                    />
                    <span 
                        className={`card-header ${textColor}`}
                        style={{
                            "backgroundColor": secondaryColor, 
                            "borderRadius": "10px",
                            "textDecoration": isCompleted ? "line-through" : "none"
                        }}
                    >
                        {taskObj.Name}
                    </span>
                </div>
                <p className={`mt-3 ${textColor}`}>{taskObj.Description}</p>
                <p className={`category-tag ${textColor}`} style={{"backgroundColor": cardColor, "display": "inline-block", "padding": "2px 8px", "borderRadius": "5px", "fontSize": "0.8rem"}}>
                    {taskObj.category || "Uncategorized"}
                </p>

                <div style={{"position": "absolute", "top":"160px", "left":"160px"}}>
                    <button style={{"color" : cardColor, "cursor" : "pointer"}} onClick = {() => setModal(true)}>Edit</button>
                    <button style = {{"color" : cardColor, "cursor" : "pointer"}} onClick = {handleDelete}>Delete</button>
                </div>
        </div>
        <EditTask 
            modal={modal} 
            toggle={toggle} 
            updateTask={updateTask} 
            taskObj={taskObj}
            availableCategories={availableCategories}
        />
        </div>
    );
};

export default Card;

