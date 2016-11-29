import React from 'react';
import './App.css';
import LoginPage from '../Login-page/Login-page';
// import IndexPage from '../Index-page/Index-page';
// import PrisonPage from '../Prison-page/Prison-page';

const App = React.createClass({
  getInitialState() {
    return {
      prisons: [
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
        <LoginPage/>
        {/*<IndexPage prisons={this.state.prisons}/>*/}
        {/*<PrisonPage/>*/}
      </div>
    );
  }
});

export default App;