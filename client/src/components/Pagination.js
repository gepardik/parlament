import React from 'react'

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: props.items,
            currentPage: 1,
            todosPerPage: props.limit || 5,
            tableHead: props.tableHead
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { todos, currentPage, todosPerPage, tableHead } = this.state
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage
        const renderTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            const classActive = number === currentPage ? 'text-primary' : 'text-secondary'
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    className={"page-link " + classActive}
                    style={{cursor:'pointer'}}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                <table className="table bg-white table-hover">
                    <thead className="text-dark"  dangerouslySetInnerHTML={{ __html: tableHead }}></thead>
                    <tbody dangerouslySetInnerHTML={{ __html: renderTodos.join("") }}></tbody>
                </table>
                {(todosPerPage < todos.length) && (
                    <nav>
                        <ul
                            className="pagination justify-content-end"
                            id="page-numbers"
                            style={{display:'flex', flexWrap:'wrap'}}
                        >
                            <li
                                className="page-link text-secondary"
                                style={{cursor:'pointer'}}
                                onClick={() => {
                                    if (currentPage === 1) {
                                        return
                                    }
                                    this.setState({
                                        currentPage: currentPage - 1
                                    })
                                }}
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </li>
                            {renderPageNumbers}
                            <li
                                className="page-link text-secondary"
                                style={{cursor:'pointer'}}
                                onClick={() => {
                                    if (currentPage === pageNumbers.length) {
                                        return
                                    }
                                    this.setState({
                                        currentPage: currentPage + 1
                                    })
                                }}
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </li>
                        </ul>
                    </nav>
                )}

            </div>
        );
    }
}

export default Pagination

