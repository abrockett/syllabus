import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import {key} from './Key';

const request = new Request('https://api.airtable.com/v0/appDI1jEsQmF4V9WJ/Courses', {
  method: 'get',
  headers: new Headers({
    'Authorization': `Bearer ${key}`
  })
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airtable: [],
    };
    this.fetchAirtable = this.fetchAirtable.bind(this);

  }

  fetchAirtable() {
    fetch(request).then(resp => resp.json())
      .then(resp => {
        const records = resp.records;
        this.setState({ airtable: records });
      });
  }

  render() {
    const airtable = this.state.airtable;


    // const entry = airtable.map((airtable, index) =>
    //   <tr>
    //   <td key={index}>{airtable.fields["Course Name"]}</td>
    //   </tr>
    // );

    const name = airtable.length > 0 ? airtable[0].fields["Course Name"] : '';
    debugger;
    const buttonStyles = {
      color:'white',
      backgroundColor:'blue',
      fontWeight:'bold',
      fontSize:'20px'
    };

    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Syllabus Pretty Printer</h2>
        </div>

        <button style={buttonStyles}
        onClick={this.fetchAirtable}>Fetch Airtable Record</button>
        <h2>Idaho State University</h2>
        <h3>Audiology Program</h3>
        <table>
        <tr><b>Course Name: </b>{name ? name : ''}</tr>
        <tr><b>Course Name: </b>{name ? name : ''}</tr>
        <tr><b>Course Name: </b>{name ? name : ''}</tr>
        </table>
      </div>
    );
  }
}

export default App;
