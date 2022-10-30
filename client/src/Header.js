import React from 'react';

export default class Header extends React.Component {

    render(){
        const isOwner = this.props.isOwner;
        const isVoter = this.props.isVoter;
        const userStatus = isOwner? "[ADMIN]": isVoter? "[VOTER]" : "[UNREGISTERED]";
        const addr = this.props.addr ? this.props.addr : "NONE";
        return(
            <div className="header">
                <h1>Voting system </h1>
                <div className="user-infos">
                    <p>Connected address: {addr}</p>
                    <p>{userStatus}</p> 
                </div>
            </div>
        )
    }
}
