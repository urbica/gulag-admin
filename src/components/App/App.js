import React from 'react';
import { assocPath } from 'ramda';
import './App.css';
// import LoginPage from '../Login-page/Login-page';
// import IndexPage from '../Index-page/Index-page';
import PrisonPage from '../Prison-page/Prison-page';

const App = React.createClass({
  getInitialState() {
    return {
      prisons: {
        0: {
          name: 'Вишерский ИТЛ ',
          years: {
            1918: {
              prisoners: 200000
            },
            1922: {
              prisoners: 200000
            },
            1926: {
              prisoners: 200000
            },
            1930: {
              prisoners: 200000
            },
            1932: {
              prisoners: 200000
            },
            1934: {
              prisoners: 200000
            },
            1936: {
              prisoners: 200000
            },
            1938: {
              prisoners: 200000
            },
            1940: {
              prisoners: 200000
            },
            1942: {
              prisoners: 200000
            },
            1944: {
              prisoners: 200000
            },
            1946: {
              prisoners: 200000
            },
            1950: {
              prisoners: 200000
            },
            1954: {
              prisoners: 200000
            },
            1958: {
              prisoners: 200000
            }
          },
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 1918,
          ru: true,
          en: true,
          description: 'Красногорский лагерь организован в мае 1953 г. и существовал, по меньшей мере до 1960 г., его управление располагалось в городе Нижняя Тура. В лагере находилось до 6694 заключенных, занятых на строительстве объектов, связанных с атомным проектом, в промышленном, энергетическом, дорожном, гражданском и жилищном строительстве, на обслуживании промышленных предприятий'
        },
        1: {
          name: 'ИТЛ при Угличском заводе мостовых конструкций № 4 ГУШОСДОРа',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        2: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        3: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        4: {
          name: 'Вишерский ИТЛ ',
          period: ['1932 – 1952', '1954 – 1955'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Центральная Россия и Ленинградская область',
          strength: 18229,
          ru: true,
          en: true
        },
        5: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        6: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        7: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        8: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        9: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        10: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        11: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        },
        12: {
          name: 'Вишерский ИТЛ ',
          period: ['1928 –1924'],
          edited: {
            date: '07 Dec 2016',
            time: '07:48AM'
          },
          region: 'Западная Сибирь',
          strength: 43572394,
          ru: true,
          en: true
        }
      }
    };
  },

  addNewYear(prisonId, year) {
    this.setState(
      assocPath(['prisons', prisonId, 'years', year, 'prisoners'], 0, this.state)
    );
  },

  render() {
    return (
      <div className="App">
        {/*<LoginPage/>*/}
        {/*<IndexPage prisons={this.state.prisons}/>*/}
        <PrisonPage prison={ this.state.prisons[0] }
                    prisonId={ 0 }
                    addNewYear={ this.addNewYear }
        />
      </div>
    );
  }
});

export default App;