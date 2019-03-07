import { h } from 'react-hyperscript-helpers';
import {CardElement, injectStripe} from 'react-stripe-elements';

export const SettingsBase = () => h('div', {
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
        h('strong', '$6/month or $64/year'),
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
        h(CardElement),
      ]),
    ]),
  ]),
])

export const Settings = injectStripe(SettingsBase);
