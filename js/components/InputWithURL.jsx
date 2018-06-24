import React from 'react';

class InputWithURL extends React.Component {

    handleInputChange = (e) => {
        if (typeof this.props.searchItem === "function") {
            this.props.searchItem(e);
        } 
    }

    handleClick = (e) => {
        if (typeof this.props.fetchItems === "function") {
            this.props.fetchItems();
        } 
    }

    render () {
        return (
            <div className="firstContainer">
                <input className="inputStyle" type="text" placeholder="Search item..." id="filterItem" onChange={e => this.handleInputChange(e)}/>
                <button className="buttonStyle" onClick={e => this.handleClick(e)}><i className="fas fa-search"></i></button>
            </div>
        );
    };
};

export default InputWithURL;