import React, { Component } from "react";

class UpdateContent extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.data.id,
            title: this.props.data.title,
            desc: this.props.data.desc
        };
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render() {
        console.log("update Render()");
        //alert(this.props.select_content_id);
        return(
            <article>
                <h2>Update</h2>

                <form action="/update_process" method="post"
                    onSubmit={function(e){
                        e.preventDefault();
                        this.props.onSubmit(
                            this.state.id,
                            this.state.title,
                            this.state.desc
                        );
                    }.bind(this)}>
                    
                    <p>
                        <input type="text" name="title" placeholder="title" value={this.state.title}
                        onChange={this.inputFormHandler}></input>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="desc" value={this.state.desc}
                        onChange={this.inputFormHandler} ></textarea>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;