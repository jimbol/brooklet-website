import ReactDOM from 'react-dom';
import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import Amplify from 'aws-amplify';
import { AuthUI } from './auth';
import { Settings } from './settings';
import { awsConfig } from './aws-config';

Amplify.configure(awsConfig);

export class Container extends Component {
  constructor() {
    super();

    this.state = {
      authed: false,
      error: '',
      user: {},
    }
  }

  render() {
    return h('div', [
      (this.state.authed) ? h(Settings, {
        logOut: () =>  this.setState({ authed: false }),
      }) : h(AuthUI, {
        onMount: () => this.setState({ authed: true }),
      }),
    ]);
  }
}

ReactDOM.render(
  h(Container),
  document.getElementById('root')
);
