import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import './App.css';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  state = {
    docs: [
      {title: 'hello react is awesome', index: '12345678', platform: 'firmsys'},
      {title: 'hello react is good', index: '138576', platform: 'hollias'},
      {title: '基于华龙一号的安全级DCS系统设计方案', index: '12345678', platform: 'speedyhold'},
      {title: '你好', index: '12345678', platform: 'firmsys'},
      {title: 'world', index: 'abcdefgh', platform: 'firmsys'},
      {title: '世界', index: 'abcdefgh', platform: 'hollias'}
    ],
    query_a: '',
    query_b: '',
    query_c: ''
  };

  updateQuery_a(keyword) {
    this.setState({ query_a: keyword.trim() });
  }

  updateQuery_b(keyword) {
    this.setState({ query_b: keyword.trim() });
  }

  updateQuery_c(keyword) {
    this.setState({ query_c: keyword.trim() });
  }

  clearQuery(query) {
    this.setState({ query_a: '', query_b: '', query_c: '' })
  }

  render() {

    const { docs, query_a, query_b, query_c} = this.state;
    let showingDocs;

    if (query_a || query_b || query_c) {
      const match_a = new RegExp(escapeRegExp(query_a), 'i');
      const match_b = new RegExp(escapeRegExp(query_b), 'i');
      const match_c = new RegExp(escapeRegExp(query_c), 'i');
      showingDocs = docs
        .filter(doc => query_a ? match_a.test(doc.title) : true)
        .filter(doc => query_b ? match_b.test(doc.title) : true)
        .filter(doc => query_c ? match_c.test(doc.index) : true)
    } else {
      showingDocs = docs;
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>工程部文档搜索引擎<span className="big-icon">Beta</span></h2>
        </div>
        <div className="list-contacts">

            <TextField
                value={query_a}
                hintText="文件名称"
                floatingLabelText="按文件名称查询 1"
                type="text"
                onChange={e => this.updateQuery_a(e.target.value)}
            /><br/>
            <TextField
                value={query_b}
                hintText="文件名称"
                floatingLabelText="按文件名称查询 2"
                type="text"
                onChange={e => this.updateQuery_b(e.target.value)}
            /><br/>
            <TextField
                value={query_c}
                hintText="文件编码"
                floatingLabelText="按文件编码查询"
                type="text"
                onChange={e => this.updateQuery_c(e.target.value)}
            /><br/>
            <FlatButton
                label="重置查询条件"
                secondary={true}
                onClick={() => this.clearQuery()}
            />

        </div>
        <div className="App-intro">
          <ol>
            {showingDocs.map(doc => (
                <div>
                  <li key={doc.index}>{doc.title} | {doc.index}</li>
                </div>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
