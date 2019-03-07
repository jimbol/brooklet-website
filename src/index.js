import ReactDOM from 'react-dom';
import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import Amplify from 'aws-amplify';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { AuthUI } from './auth';
import { Settings } from './settings';
import { awsConfig } from './aws-exports';

Amplify.configure(awsConfig);

export class Container extends Component {
  constructor() {
    super();

    this.state = {
      authed: false,
    }
  }

  render() {
    return h(StripeProvider, {
      apiKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
    }, [(() => {
      if (this.state.authed) return h(Elements, [
        h(Settings),
      ]);
      return h(AuthUI, {
        onMount: () => this.setState({ authed: true }),
      });
    })()]);
  }
}

ReactDOM.render(
  h(Container),
  document.getElementById('root')
);
