import React from 'react';
import './App.css';
import Search from '../Search/Search';
import PrisonsTable from '../Prisons-table/Prisons-table';
import Header from '../Header/Header';

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
      ],
    };
  },

  search(event) {
    let displayPrisons = this.state.prisons.filter(prison => {
      return prison.name.indexOf(event.target.value) !== -1;
    });
    console.log(displayPrisons);
  },

  render() {
    return (
      <div className="App">
        <Header/>
        <Search/>
        <PrisonsTable prisons={this.state.prisons}/>
      </div>
    );
  }
});

export default App;