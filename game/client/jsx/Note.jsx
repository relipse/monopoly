import React from 'react';

export default class Note extends React.Component {
    render() {
        //if the background is money then we do not put the value in the div
        const value = this.props.value;
        return (<div className={"note v" + value}>
            {this.props.bgIsMoney ? "" : "$" + value}
        </div>)
    }
}