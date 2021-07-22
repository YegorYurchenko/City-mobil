import React, { Component } from 'react';

export default class Searcher extends Component {
    constructor(props) {
        super(props);

        this.searchInput = React.createRef();

        this.state = {
            inputValue: '',
        };
    }

    onInputValueChange = (e) => {
        const { onSearchChange } = this.props;

        this.setState({
            inputValue: this.searchInput.current.value,
        });

        onSearchChange(this.searchInput.current.value);
    }

    render() {
        return (
            <div className="searcher">
                <svg className="searcher__svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.58388 3.36469C11.268 5.04878 11.268 7.77924 9.58388 9.46333C7.89978 11.1474 5.16933 11.1474 3.48524 9.46333C1.80114 7.77924 1.80114 5.04878 3.48524 3.36469C5.16933 1.6806 7.89978 1.6806 9.58388 3.36469" stroke="#7B8395" strokeWidth="1.625" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.55273 9.48819L13.7777 13.771" stroke="#7B8395" strokeWidth="1.625" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input className="searcher__input" type="text" autoComplete="off" placeholder="Поиск" autoFocus
                    ref={this.searchInput} value={this.state.inputValue} onChange={this.onInputValueChange} />
                <button className="searcher__find-btn" type="button" onClick={this.onInputValueChange}>Найти</button>
            </div>
        );
    }
}
