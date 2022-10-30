import React from 'react';

export default class LeftColumn extends React.Component {

    render(){
        const workflowStatus = this.props.workflowStatus;
        const statusList = this.props.statusList;
        
        return(
            <div className="left-column">

                <h3>Workflow status</h3>
                <ul>
                    {statusList.map((status) => (
                        <li key={status} className={status===statusList[workflowStatus] ? "active" : ""}>{status}</li>
                    ))}
                </ul>
                  
            </div>
        )
    }
}
