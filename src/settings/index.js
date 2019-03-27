import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import { Auth } from 'aws-amplify';

const stripe = Stripe('pk_test_6o0gMfCYo82x7ZH5cer14pyx', {
  betas: ['checkout_beta_4']
});

export class Settings extends Component {
  constructor() {
    super();

    this.state = {
      error: '',
      userId: '',
    }
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((user) => this.setState({
        userId: user.attributes.sub,
        username: user.username,
      }))
      .catch(() => {
        this.setState({ error: 'Could not fetch user. Refresh the page'})
      });
  }

  pay() {
    stripe.redirectToCheckout({

      // TODO hook up the user's id

      clientReferenceId: this.state.userId,

      items: [{plan: 'plan_Eibo6UPnet5zyh', quantity: 1}],

      // Note that it is not guaranteed your customers will be redirected to this
      // URL *100%* of the time, it's possible that they could e.g. close the
      // tab between form submission and the redirect.
      successUrl: 'https://www.brooklet.app/success.html',
      cancelUrl: 'https://www.brooklet.app/canceled.html',
    })
    .then(function (result) {
      if (result.error) {
        this.setState({ error: result.error.message })
      }
    });
  }

  render() {
    return h('div', {
      className: 'main_home',
    }, [
      h('div', {
        'data-wow-duration': '1s',
        className: 'col-md-4 wow fadeInLeft',
      }, [
        h('div', {
          className: 'home_text',
        }, [
          h('h1', {
            className: 'text-white',
          }, 'Power Users'),

          h('h3', {
            style: {
              color: 'white',
              fontWeight: '300',
            },
            className: 'text-white',
          }, [
            'Get Goals, Notifications, and Correlations. ',
            h('strong', '$6/month'),
          ]),
        ])
      ]),
      h('div', {
        className: 'col-md-8 center-flex',
      }, [
        h('div', {
          className: 'col-md-12 col-sm-12 col-xs-12 card wow fadeInRight',
        }, [

          h('div', {
            className: 'head_title',
          }, [
            h('h2', 'Account'),
            h('button', {
              className: 'btn btn-primary m-top-20 center-flex',
              onClick: () => this.pay(),
            }, 'Pay'),
            h('div', this.state.error),
          ]),
        ]),
      ]),
    ]);
  }
}
