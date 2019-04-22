import ReactDOM from 'react-dom';
import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import Amplify, { Auth } from 'aws-amplify';
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

  componentDidMount() {
    this.stripe = Stripe('pk_live_I57MvVCxtc2kYEwfUi0Ssc5L');

    Auth.currentAuthenticatedUser()
      .then((user) => this.setState({
        ...user.attributes,
        id: user.attributes.sub,
        username: user.username,
      }))
      .catch(() => {
        console.log(e);
      });
  }

  pay() {
    this.stripe.redirectToCheckout({

      // TODO hook up the user's id
      clientReferenceId: JSON.stringify(this.state.user),

      items: [{plan: 'plan_EvVdMEhRO57R9s', quantity: 1}],

      // Note that it is not guaranteed your customers will be redirected to this
      // URL *100%* of the time, it's possible that they could e.g. close the
      // tab between form submission and the redirect.
      successUrl: 'https://www.brooklet.app/success.html',
      cancelUrl: 'https://www.brooklet.app/canceled.html',
    })
    .then(function (result) {
      if (result.error) {
        this.setState({ error: result.error.message })
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        const displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  }

  render() {
    return h('div', [(() => {
      console.log(this.state);

      if (this.state.authed) return h(Settings);
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
