import React from 'react';

export default class Note extends React.Component {
    render() {
        const { value, showMoneyText } = this.props;
        return (
            <div className={"note v" + value}>
                {showMoneyText && `$${value}`}
            </div>
        );
    }
}