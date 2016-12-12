import React from 'react';
import './App.css';
// import LoginPage from '../Login-page/Login-page';
// import IndexPage from '../Index-page/Index-page';
import PrisonPage from '../Prison-page/Prison-page';

const App = React.createClass({
  getInitialState() {
    return {
      prisons: [
        {
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
          en: true
        },
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
      ]
    };
  },

  render() {
    return (
      <div className="App">
        {/*<LoginPage/>*/}
        {/*<IndexPage prisons={this.state.prisons}/>*/}
        <PrisonPage prisons={this.state.prisons}/>
      </div>
    );
  }
});

export default App;