import React, { Component } from "react";

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log("==> TOC render shouldComponentUpdate",
            newProps.data,
            this.props.data
        );
        if(newProps.data === this.props.data){
            return false;
        }
        return true;
    }

    render() {
        console.log('TOC render');
        var lists = [];
        var data = this.props.data;
        var i = 0;

        while(i < data.length) {
            lists.push(<li key={data[i].id}><a href={'/content/' + data[i].id}
            data-id={data[i].id}
            onClick={function(e){
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}>{data[i].title}</a></li>)
            i = i+1;
        }
        // data.forEach(function(element, index, arr){
        //     lists.push(<li key={index}><a href={'/content/' + element.id}>{element.title}</a></li>)
        // });

        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;