import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import { withAuthenticator } from 'aws-amplify-react';

export const AuthUI = ({ onMount }) => h('div', {
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
      }, 'Log in'),

      h('h3', {
        style: {
          color: 'white',
          fontWeight: '300',
        },
        className: 'text-white',
      }, 'View your cart and update your account.'),

    ])
  ]),

  h('div', {
    className: 'col-md-8 center-flex',
  }, [
    h('div', {
      className: 'col-md-8 col-md-offset-2 col-sm-12 col-xs-12 card wow fadeInRight',
    }, [

      h('div', {
        className: 'head_title',
      }, [

        h(withAuthenticator(() => h(Main, {
          onMount
        }))),
      ]),
    ]),
  ]),
]);

class Main extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return h('div', 'Authenticated');
  }
}
