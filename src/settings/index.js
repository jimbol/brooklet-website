import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import { Auth, API } from 'aws-amplify';


export class Settings extends Component {
  constructor() {
    super();

    this.state = {
      error: '',
      userId: '',
      account: {},
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    Auth.currentAuthenticatedUser()
      .then((user) => {

        this.setState({
          userId: user.attributes.sub,
          username: user.username,
        });

        API.get('stream', `/user/${user.attributes.sub}`)
          .then((response) => {
            this.setState({
              account: response.data.account,
              loading: false,
            });
          }).catch(() => {
            this.setState({
              error: 'Could not fetch user. Refresh the page',
              loading: false,
            })
          });
      })
      .catch(() => {
        this.setState({
          error: 'Could not fetch user. Refresh the page',
          loading: false,
        });
      });
  }

  download() {
    this.setState({
      loading: true,
    });
    API.get('stream', '/get-data')
      .then((response) => {
        this.setState({
          loading: false,
        });
        const transformedData = response.data.map((group) => {
          const { stream, events, fields } = group;
          const folder = removeIds(stream);
          const eventHash = events.reduce((acc, event) => {
            if (event.id) acc[event.id] = removeIds(event);
            return acc;
          }, {});

          delete folder.fields;

          folder.streams = fields.reduce((acc, stream) => {
            stream.events = (stream.events || []).reduce((acc, id) => {
              if (eventHash[id]) acc.push(eventHash[id]);
              return acc;
            }, []);
            acc.push(removeIds(stream));
            return acc;
          }, []);

          return folder;
        });

        console.log(transformedData);
        this.saveText(JSON.stringify(transformedData), 'brooklet-data.json');
      }).catch((e) => {
        console.log(e);

        this.setState({
          error: 'Could not fetch data. Refresh the page and try again.',
          loading: false,
        })
      });
  }

  saveText(text, filename) {
    const a = document.createElement('a');

    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click();
  }

  render() {
    return h('div', {
      style: {
				padding: 6,

      }
    }, [
      h('h1', {
        style: {
          color: 'white',
        },
      }, [h('strong', 'Get a JSON file of your data')]),
      h('div', {
        style: {
					flexDirection: 'column',
					display: 'flex',
        }
      }, [

        h('div', {
					className: 'col-md-12 col-sm-12 col-xs-12 wow fadeInRight head_title',
					style: {
						backgroundColor: 'white',
						borderRadius: 8,
						padding: 16,
					},
        }, [

          this.state.loading
            ? h('h2', [h('strong', 'Loading... You data will be downloaded in a moment.')])
            : null,
          this.state.loading ? null : h('button', {
            className: 'btn btn-primary m-top-20 center-flex',
            style: {
              fontSize: 24,
							display: 'inline-block',
							marginBottom: 48,
            },
            onClick: () => this.download(),
          }, 'Download'),
					h('div', this.state.error),
					h('h3', {
						className: 'wow fadeInRight',
					}, 'Example JSON:'),
					h('h4', {
						className: 'wow fadeInRight',
						style: {
							fontSize: 16,
							fontWeight: 'bold',
							lineHeight: '11px',
							whiteSpace: 'pre-wrap',
						},
					}, `
	[\n
		{\n
			"name": "Health issues",\n
			"streams": [\n
				{\n
					"name": "Heart burn",\n
					"measure": "true/false",\n
					"events": [\n
						{\n
							"value": 1,\n
							"date": "2018-12-14T19:03:33.759Z",\n
						},\n
						{\n
							"value": 1,\n
							"date": "2018-12-13T19:03:00.000Z",\n
						},\n
					],\n
					"graph": "BAR",\n
				}\n
			]\n
		}\n
	]
					`),
        ]),
				h('p', {
					className: 'wow fadeInRight',
					style: {
						color: '#efefef',
						cursor: 'pointer',
						opacity: 0.7,
						paddingTop: 32,
						paddingBottom: 32,
					},
					onClick: () => {
						Auth.signOut();
						setTimeout(this.props.logOut, 2000)
					},
				}, 'Log out'),
      ]),
    ]);
  }
}

const removeIds = (obj) => {
  delete obj.userId;
  delete obj.id;
  return obj;
};
