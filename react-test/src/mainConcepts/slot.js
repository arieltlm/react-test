import React from 'react';

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

function WelcomeDialog(props) {
    return (
        <FancyBorder color="bule">
            <h1 className="Diaglog-title">
                {props.title}
            </h1>
            <p className="Diaglog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    )
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    )
}
function Contacts () {
    return (
        <p>Contacts</p>
    )
}
function Chat () {
    return (
        <p>Chat</p>
    )
}
function SplitPaneParent () {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            }
        />
    )
}

function WelcomeDialogUp () {
    return (
        <WelcomeDialog title="Welcome"
        message="Thank you for visitiong our spacecraft!" />
    )
}

class ContainChildren extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick (e) {
        alert('124')
    }
    render () {
        return (
            <WelcomeDialog title="Welcome"
            message="Thank you for visitiong our spacecraft!">
                <button onClick={this.handleClick}>点击我啊</button>
            </WelcomeDialog>
        )
    }
}

export {WelcomeDialogUp, SplitPaneParent, ContainChildren};