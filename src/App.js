import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import './App.css';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
// import IconButton from 'material-ui/IconButton';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import RaisedButton from 'material-ui/RaisedButton';
import documents from './data/doc-list.json';
import * as _ from 'lodash';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  state = {
    docs: [],
    query_a: '',
    query_b: '',
    query_c: ''
  };

  componentDidMount() {
    this.setState({docs: documents})
  }

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
    let hasQuery = query_a || query_b || query_c;

    if (hasQuery) {
      const match_a = new RegExp(escapeRegExp(query_a), 'i');
      const match_b = new RegExp(escapeRegExp(query_b), 'i');
      const match_c = new RegExp(escapeRegExp(query_c), 'i');
      showingDocs = docs
        .filter(doc => query_a ? match_a.test(doc.doc_name) : true)
        .filter(doc => query_b ? match_b.test(doc.doc_name) : true)
        .filter(doc => query_c ? match_c.test(doc.doc_index) : true)
    } else {
      showingDocs = docs;
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>工程部文档搜索<span className="big-icon">Beta</span></h2>
        </div>

        <div className="layout-wrapper">

          <div className="layout-search-bar">
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

          <div className="layout-search-result">

            <Badge
                badgeContent={showingDocs.length === docs.length? "ALL": showingDocs.length}
                primary={true}
                style={{marginTop: "5px"}}
            >
              <NotificationsIcon />
            </Badge>

            <Table style={{ width: "90%", marginLeft: "5%", marginRight: "5%" }}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn colSpan="4" style={{textAlign: "center"}}>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>下载链接</TableHeaderColumn>
                  <TableHeaderColumn>文件名称 </TableHeaderColumn>
                  <TableHeaderColumn>文件版本</TableHeaderColumn>
                  <TableHeaderColumn>文件编码</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {showingDocs.map(doc => (
                    <TableRow>
                      <TableRowColumn>
                        <RaisedButton
                            href={doc.url}
                            target="_blank"
                            // label=""
                            primary={true}
                            className="download-button"
                            icon={<FileCloudDownload />}
                        />
                      </TableRowColumn>
                      <TableRowColumn>{doc.doc_name}</TableRowColumn>
                      <TableRowColumn>{doc.rev}</TableRowColumn>
                      <TableRowColumn>{doc.doc_index}</TableRowColumn>
                    </TableRow>
                ))}

              </TableBody>
            </Table>
          </div>

        </div>
        {/*<div className="list-contacts"></div>*/}
      </div>
    );
  }
}

export default App;
