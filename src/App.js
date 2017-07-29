import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import './App.css';

class App extends Component {
  state = {
    docs: [
      {title: 'hello react is awesome', index: '12345678'},
      {title: 'hello react is good', index: '12345678'},
      {title: '基于华龙一号的安全级DCS系统设计方案', index: '12345678'},
      {title: '你好', index: '12345678'},
      {title: 'world', index: 'abcdefgh'},
      {title: '世界', index: 'abcdefgh'}
    ],
    query: ''
  };

  updateQuery(query) {
    this.setState({ query: query.trim() })
  }

  clearQuery(query) {
    this.setState({ query: '' })
  }

  render() {

    const { docs, query } = this.state;
    let showingDocs;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingDocs = docs.filter(doc => match.test(doc.title))
    } else {
      showingDocs = docs;
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>工程部文档搜索引擎<span className="big-icon">Beta</span></h2>
          <input
            type="text"
            onChange={e => this.updateQuery(e.target.value)}
          />
        </div>
        {query &&
          <p className="App-intro">
            <ol>
              {showingDocs.map(doc => (
                  <div>
                    <li key={doc.index}>{doc.title} | {doc.index}</li>
                  </div>
              ))}
            </ol>
          </p>}
      </div>
    );
  }
}

export default App;
