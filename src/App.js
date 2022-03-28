import React, { Component } from 'react';
import './App.css';

import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';


class App extends Component {
  // constructor : 컴포넌트를 실행할때 constructor 함수가 있다면 가장 먼저 실행되어 초기화를 담당
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode : 'read',
      welcome : {title:"welcome", desc:"Hello, React!!"},
      subject : {title:'WEB', desc:'World Wide Web!'},
      select_content_id : 3,
      contents : [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.select_content_id){
          return data;
        }
        i = i+1;
      }
  }

  getContent(){
    var  _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read') {
      var data = this.getReadContent();

      _title = data.title;
      _desc = data.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
      
    }else if(this.state.mode === 'create'){
      _article = <CreateContent 
        onSubmit={function(_title,_desc){
          this.max_content_id = this.max_content_id+1;
          var newContent = Array.from(this.state.contents);
          newContent.push(
            {id:this.max_content_id, title:_title, desc:_desc}
          );
          this.setState({
            contents:newContent,
            mode:'read',
            select_content_id:this.max_content_id
          })
        }.bind(this)} ></CreateContent>
    }else if(this.state.mode === 'update'){
      var _content = this.getReadContent();
      _article = <UpdateContent 
      onSubmit={function(_id, _title, _desc){
        console.log(_id, _title, _desc);
        var _contents = Array.from(this.state.contents);
        _contents[_id-1] = {id:_id, title:_title, desc:_desc};
        this.setState({
          contents:_contents,
          mode:'read'
        });
      }.bind(this)} 
      data={_content}></UpdateContent>
    }
    return _article;
  }
  
  render() {
    console.log('App render');
    return(
      <div className="App">
          
          <Subject title={this.state.subject.title} desc={this.state.subject.desc} 
          onChangePage={function(){
            if(this.state.mode === 'read'){
              this.setState({mode : 'welcome'});
            }
          }.bind(this)} ></Subject>
          
          <TOC data={this.state.contents} 
          onChangePage={function(id){
            this.setState({
              mode : 'read',
              select_content_id : Number(id)
            });
          }.bind(this)} ></TOC>
          <Control
          onChangeMode={function(_mode){
            if(_mode === "delete"){
              if(window.confirm("really?")){
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while(i<_contents.length){
                  if(_contents[i].id === this.state.select_content_id){
                    _contents.splice(i,1);
                    break;
                  }
                  i = i+1;
                }
                this.setState({
                  mode:'welcome',
                  contents:_contents
                });
              }
            }else{
              this.setState({
                mode : _mode
              });
            }
            
          }.bind(this)}></Control>
          {this.getContent()}
      </div>
    );
  }
}

export default App;
