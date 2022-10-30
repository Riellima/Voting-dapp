import React from 'react';

export default class Content extends React.Component {

    render(){
        const workflowStatus = this.props.workflowStatus;
        const isOwner = this.props.isOwner;
        const isVoter = this.props.isVoter;
        const voters = this.props.voters;
        const currentVoter = this.props.currentVoter;
        const proposals = this.props.proposals;
        const winningProposalID = this.props.winningProposalID;

        const runAddVoter = this.props.runAddVoter;
        const runNextStatus = this.props.runNextStatus;
        const runAddProposal = this.props.runAddProposal;
        const runSetVote = this.props.runSetVote;

        const textChangeStatus = ["Start proposals session", "End proposals session", "Start voting session", "End voting session", "Tally votes"];

        // The connected address is unknown
        if (!isOwner && !isVoter){
            return(
                <div className="error">
                    <p>Sorry you are not registered as a voter...</p>
                </div>
            );
        }

        // 0 - Registerig voters
        else if (workflowStatus==="0"){
            if (isOwner){
                return(
                    <div>
                        <input type="text" id="voter-addr" placeholder="Voter address"/>
                        <button onClick={runAddVoter} className="button1">Add voter</button>
                        <br/>
                        <h3>List of voters</h3>
                        <table>
                            <tr>
                                <th>WHITELIST</th>
                            </tr>
                            {voters.map((addr) => (
                                <tr>
                                    <td>{addr}</td>
                                </tr>
                            ))}
                        </table>


                        <button onClick={runNextStatus} className="button2">{textChangeStatus[workflowStatus]}</button>
                    </div>            
                );
            }
            else if (isVoter){
                return(
                    <div>
                        <p>You are registered as a voter!</p>
                        <p>Wait for the next session to submit proposals</p>
                    </div>
                );
            }
        }

        // 1 - Proposals session
        else if (workflowStatus==="1"){
            if(isOwner){
                return(
                    <div>
                        <p>Voters are giving proposals...</p>
                        <button onClick={runNextStatus} className="button2">{textChangeStatus[workflowStatus]}</button>
                    </div>
                );
            }
            else if (isVoter){
                return (   
                    <div>
                        <input type="text" id="proposal" placeholder="Describe your proposal"/>
                        <button className="button1" onClick={runAddProposal}>Submit</button>

                        <br/>
                        <h3>List of proposals</h3>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>DESCRIPTION</th>
                            </tr>
                            {proposals.map((proposal, index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>{proposal.description}</td>
                                </tr>
                            ))}
                        </table>
                        <br/>
                    </div>
                );
            }
        }

        //2 - End of proposals session
        else if (workflowStatus==="2"){
            if (isOwner){
                return (   
                    <div>
                        <br />
                        <button onClick={runNextStatus} className="button2">{textChangeStatus[workflowStatus]}</button>
                    </div>
                )
            }
            else if (isVoter){
                return (   
                    <div>
                        <p>Wait for the next session to vote for your favorite proposal</p>
                    </div>
                )
            }
        }

        //3 - Voting session
        else if (workflowStatus==="3"){
            if (isOwner){
                return (   
                    <div>
                        <p>Voters are voting for their favorite proposal...</p>
                        <br/>
                        <button onClick={runNextStatus} className="button2">{textChangeStatus[workflowStatus]}</button>
                    </div>
                )
            }
            else if (isVoter){
                if (currentVoter.hasVoted){
                    return (   
                        <div>
                            <h3>Your choice:</h3>
                            <p>You voted for proposition #{currentVoter.votedProposalId}</p>
                        </div>
                    )
                }
                else {
                    return (   
                        <div>
                            <h3>Your choice:</h3>
                            <select name="select-proposal" id="select-proposal">
                                {proposals.map((proposal, index) => (
                                    <option value={index}>{index} - {proposal.description} </option>
                                ))}
                            </select>
                            <button onClick={runSetVote} className="button1" id="vote-button">Vote</button>
                            <p id="vote-text" ></p>
                        </div>
                    )
                }

            }
        }

        // 4 - End of voting session
        else if (workflowStatus==="4"){
            if (isOwner){
                return (   
                    <div>
                        <button onClick={runNextStatus} className="button2">{textChangeStatus[workflowStatus]}</button>
                    </div>
                )
            }
            else if (isVoter){
                return (   
                    <div>
                        <p>Wait for the results in next session</p>
                    </div>
                )
            }
        }

        // 5 - Tally votes
        else if (workflowStatus==="5"){
            return (   
                <div>
                    <h1>The winner is:</h1>
                    <h2> Proposal #{winningProposalID} </h2>
                </div>
            )
        }

        else {
            return (   
                <div className="error">Workflow status ERROR</div>
            )
        }

    }
}