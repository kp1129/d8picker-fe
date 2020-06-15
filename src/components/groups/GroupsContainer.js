import React, {useState} from 'react';
import Groups from './Groups';
import CreateNewGroup from './CreateNewGroup';
import styled from 'styled-components';


const GroupsContainer = () => {
    const [showCreateNewGroup, setShowCreateNewGroup] = useState(false);

    const handleGroupsContainer = (e) => {
        e.stopPropagation();
    }

    return (
        <div onClick={(e) => handleGroupsContainer(e)}>
            <Groups />
            <AddGroupBtn onClick={() => setShowCreateNewGroup(true)}>Add group</AddGroupBtn>
            {showCreateNewGroup && <CreateNewGroup setShowCreateNewGroup={setShowCreateNewGroup} />}
        </div>
    )
}

export default GroupsContainer;



const AddGroupBtn = styled.div`
    margin: 0.5rem auto;
    cursor: pointer;
    width: 90%;
    color: #28807d;
    font-weight: bold;
    border: 2px solid  #28807d;
    border-radius: 0.5rem;
    text-align: center;
    padding: 0.25rem 1rem;
`;



//styled.div`
//   width: 90%;
//   margin: 1rem auto;
//   padding: 0.5rem;
//   text-align: center;
//   border: 2px solid #28807D;
//   border-radius: 15px;
//   color: #28807D;
//   background: #ffffff;
// `;


