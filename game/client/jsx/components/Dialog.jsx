import React from 'react';

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            offsetX: 0,
            offsetY: 0,
            posX: 100, // Initial position
            posY: 100  // Initial position
        };
        this.dialogRef = React.createRef();
    }

    // Common function for both mouse and touch start
    handleDragStart = (e) => {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        this.setState({
            isDragging: true,
            offsetX: clientX - this.state.posX,
            offsetY: clientY - this.state.posY
        });

        // Add appropriate listeners for dragging
        window.addEventListener('mousemove', this.handleDragMove);
        window.addEventListener('mouseup', this.handleDragEnd);

        window.addEventListener('touchmove', this.handleDragMove, { passive: false });
        window.addEventListener('touchend', this.handleDragEnd);
    }

    // Common function for both mouse and touch move
    handleDragMove = (e) => {
        if (!this.state.isDragging) return;

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        this.setState({
            posX: clientX - this.state.offsetX,
            posY: clientY - this.state.offsetY
        });

        // Prevent scrolling on touch drag
        if (e.type === 'touchmove') e.preventDefault();
    }

    // Common function for both mouse and touch end
    handleDragEnd = () => {
        this.setState({ isDragging: false });

        window.removeEventListener('mousemove', this.handleDragMove);
        window.removeEventListener('mouseup', this.handleDragEnd);

        window.removeEventListener('touchmove', this.handleDragMove);
        window.removeEventListener('touchend', this.handleDragEnd);
    }

    render() {
        const { posX, posY } = this.state;

        return (
            <div className="dialog overlay" onClick={this.props.dismiss}>
                <div
                    ref={this.dialogRef}
                    className="content"
                    style={{
                        position: 'absolute',
                        left: `${posX}px`,
                        top: `${posY}px`,
                        cursor: this.state.isDragging ? 'grabbing' : 'grab'
                    }}
                    onMouseDown={this.handleDragStart}
                    onTouchStart={this.handleDragStart}  // Added touch support here
                    onClick={(e) => e.stopPropagation()}
                >
                    {this.props.children}

                    <div className="actions">
                        {this.props.actions && this.props.actions.map(a => (
                            <div
                                key={a.name}
                                className={`action ${a.className || ''}`}
                                onClick={a.click}
                            >
                                {a.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}