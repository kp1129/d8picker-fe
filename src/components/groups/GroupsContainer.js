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
  width: 90%;
  margin: 1rem auto;
  padding: 0.5rem;
  text-align: center;
  border: 2px solid #28807D;
  border-radius: 15px;
  color: #28807D;
  background: #ffffff;
`;
