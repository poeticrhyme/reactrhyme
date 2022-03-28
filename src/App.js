import React, { Component } from 'react';
import './App.css';

import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';


class App extends Component {
  // constructor : 컴포넌트를 실행할때 constructor 함수가 있다면 가장 먼저 실행되어 초기화를 담당
  constructor(props) {
    super(props);
    this.state = {
      mode : 'read',
      welcome : {title:"welcome", desc:"Hello, React!!"},
      subject : {title:'WEB', desc:'World Wide Web!'},
      contents : [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render() {
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === 'read') {
      _title = this.state.subject.title;
      _desc = this.state.subject.desc;
    }

    return(
      <div className="App">
          <Subject title={this.state.subject.title} desc={this.state.subject.desc} 
          onChangePage={function(){
            if(this.state.mode === 'welcome'){
              this.setState({mode : 'read'});
            }else if(this.state.mode === 'read'){
              this.setState({mode : 'welcome'});
            }
          }.bind(this)} ></Subject>
          <TOC data={this.state.contents} 
          onChangePage={function(){
            alert("22");
          }}></TOC>
          <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
