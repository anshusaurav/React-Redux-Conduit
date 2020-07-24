import React from 'react';
import {Button,} from 'semantic-ui-react';
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
        const num = event.target.name; 
        this.props.handlePagination(+num);
    }
    render() {
        const pageCnt = Math.floor(this.props.totalSize/10);
        const arrForSakeOfMap = new Array(pageCnt).fill(1);
        return (
            <Button.Group color='blue'>
            {
                arrForSakeOfMap.map((elem, index) =><Button name={index+1} key={index} circular icon onClick={this.handleClick}>{index+1}</Button>)
            }
            </Button.Group>

        )
    }
}
export default Pagination;