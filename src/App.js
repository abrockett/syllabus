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

  componentWillMount() {
    this.fetchAirtable();
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
    const description = airtable.length > 0 ? airtable[0].fields["Course Description"] : '';
    const credits = airtable.length > 0 ? airtable[0].fields["Course Credits"] : '';
    const prefix = airtable.length > 0 ? airtable[0].fields["Course Prefix and Number"] : '';
    const objectives = airtable.length > 0 ? airtable[0].fields["ObjectivesText"] : '';
    const instructor = airtable.length > 0 ? airtable[0].fields["Course Instructor"] : '';

    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Audiology Department Syllabus Printer</h2>
        </div>

        <table>
        <thead><tr><th>Course Name: </th><th>{name ? name : ''}</th></tr></thead>
        <tbody>
        <tr><td><b>Course Prefix and Number: </b></td><td>{prefix ? prefix : ''}</td></tr>
        <tr><td><b>Course Description: </b></td><td>{description ? description : ''}</td></tr>
        <tr><td><b>Course Instructor: </b></td><td>{instructor ? instructor : ''}</td></tr>
        <tr><td><b>Course Credits: </b></td><td>{credits ? credits : ''}</td></tr>
        <tr><td><b>Course Objectives: </b></td><td>{objectives ? objectives : ''}</td></tr>

        </tbody>
        </table>
      </div>
    );
  }
}

export default App;
