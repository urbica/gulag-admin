import React from 'react';
import { browserHistory } from 'react-router';
import './App.css';

import {
  always, concat, assoc, assocPath, dissoc, dissocPath, map, over, propEq,
  reject, test, ifElse, isEmpty, isNil, lensPath
} from 'ramda';

import { fetchData, concatUrl, directoryToOptions, getMaxPrisoners } from '../../utils/utils';

const prisonTemplate = {
  id: undefined,
  name: {
    ru: 'Новый лагерь',
    en: 'New prison',
    de: 'Neue Gefängnis'
  },
  additional_names: {
    ru: '',
    en: '',
    de: ''
  },
  location: {
    ru: '',
    en: '',
    de: ''
  },
  description: {
    ru: '',
    en: '',
    de: ''
  },
  published: {
    ru: false,
    en: false,
    de: false
  },
  features: [
    {
      geometry: {
        coordinates: [90, 62],
        type: 'Point'
      },
      properties: {}
    }
  ]
};
const periods = [
  {
    name: 'Красный террор',
    period: '1918 - 1923',
    description: {
      ru: 'В начале ХХ века Россия занимала одно из последних мест в мире по относительному количеству заключенных – 60 человек на 100 тыс. населения, средний срок наказания в виде лишения свободы составлял 2 месяца. 26 апреля 1917 г. Временное правительство отменило ссылку на поселение как вид наказания, а также ссылку на поселение после отбытия срока каторжных работ. Была отменена каторга.\n\nЭволюционный путь преобразования российской карательной системы прервала Октябрьская революция, объявившая о сломе старого государственного аппарата, а следовательно, и его составной части – системы мест заключения.\n\nПервые советские концентрационные лагеря появились во время Гражданской войны. Это были лагеря Первой мировой, частично освободившиеся после подписания Брестского мира. С лета 1918 г. они стали использоваться для изоляции классовых врагов пролетариата, а также перебежчиков и военнопленных.\n\nЧасто для организации лагерей использовались православные монастыри. Среди осужденных встречались представители всех слоев населения, многие заключенные находились в лагерях в качестве заложников.',
      en: '',
      de: ''
    }
  },
  {
    name: 'Лагеря особого назначения',
    period: '1923 - 1930',
    description: {
      ru: 'С окончанием Гражданской войны концентрационные лагеря были по большей части ликвидированы или преобразованы в места заключения общего типа. Однако это не касалось лагерей ОГПУ при СНК СССР – лагерей особого назначения, существовавших в 1920-е гг. Их деятельность базировалась на внутриведомственных актах, не подчинялась общегосударственному законодательству и была исключена из поля зрения общественности. В 1923 г. был создан самый известный из таких лагерей – Соловецкий лагерь особого назначения, ставший предтечей и прообразом системы ГУЛАГ.',
      en: '',
      de: ''
    }
  },
  {
    name: 'Рождение ГУЛАГа',
    period: '1930 - 1937',
    description: {
      ru: 'В 1929 году выходят два документа, которые в итоге заложат основы карательной системы ГУЛАГа. Это Протокол политбюро № 8 «О переименовании концентрационных лагерей в исправительно-трудовые» и постановление СНК «Об использовании труда уголовно-заключенных». Кроме того, дополняется новыми пунктами известная 58-я статья Уголовного кодекса СССР, согласно которой к контрреволюционной деятельности относилась агитация и любое антисоветское высказывание. Таким образом, к моменту создания ГУЛАГа в 1930 году советское руководство подвело под него всю необходимую правовую базу.',
      en: '',
      de: ''
    }
  },
  {
    name: 'Колонизация',
    period: '1937 - 1941',
    description: {
      ru: 'Первое, с чем пришлось столкнуться заключенным ГУЛАГа, было освоение новых труднодоступных территорий. Экспедиции ОГПУ–НКВД направлялись на Таймыр, Чукотку, в Воркуту и на Колыму. Заключенные должны были здесь, в до сих пор не обжитых местах, в вечной мерзлоте каким-то образом наладить быт и немедленно приступить к выполнению плана партии – добыче полезных ископаемых, в первую очередь угля, олова и золота.',
      en: '',
      de: ''
    }
  },
  {
    name: 'ГУЛАГ в годы войны',
    period: '1941 - 1945',
    description: {
      ru: 'В годы войны заключенным ГУЛАГа, как и всей стране, пришлось крайне тяжело. 1941–1942 годы для лагерей стали самыми голодными. В 1942 году была налажена железнодорожная магистраль, связывающая Воркуту с Москвой. Заключенные стали одними из крупнейших поставщиков угля, нефти и олова на фронт.',
      en: '',
      de: ''
    }
  },
  {
    name: 'Империя',
    period: '1945 - 1953',
    description: {
      ru: 'После войны ГУЛАГ приобретает четкие формы империи: секретные лагеря появляются в крупных городах, в Москве и Ленинграде, заключенные заняты во всех отраслях производства, от пошива рукавиц и шинелей до создания аэродромов и крупных комбинатов. ГУЛАГ проникает в интеллектуальную среду, создаются особые конструкторские бюро («шарашки»), куда направляются виднейшие умы страны, такие как Туполев и Королев, которые теперь вынуждены работать в тюремных условиях под пристальным контролем сотрудников МВД. ГУЛАГ проник в каждую республику, область и край Советского Союза, заборы лагерей километрами тянулись по всей стране, скрытые от глаз обычных людей.',
      en: '',
      de: ''
    }
  },
  {
    name: 'Ликвидация системы',
    period: '1953 - 1961',
    description: {
      ru: 'Лагерная система дала сбой 5 марта 1953 года, вместе со смертью вождя. В первые полгода после кончины Сталина были свернуты самые крупные стройки, расформированы лагеря. 1-го сентября было упразднено Особое совещание, людей перестали сажать по надуманным делам. Как свидетельствует история, тоталитарные государства и диктатуры всегда замыкаются на одном человеке. Когда этот человек умирает, система разрушается. Так произошло и с ГУЛАГом, который окончательно был упразднен в 1956 году, на три года пережив своего создателя.',
      en: '',
      de: ''
    }
  }
];

const App = React.createClass({
  getInitialState() {
    return {
      activities: [],
      places: [],
      types: [],
      photos: {},
      prisons: {},
      token: localStorage.getItem('token')
    };
  },

  componentWillMount() {
    const { token } = this.state;
    if (!token) {
      browserHistory.push('/login');
    } else {
      fetchData({ token })
        .then(({ activities, places, types, prisons, photos }) => {
          this.setState({ activities, places, types, prisons, photos });
        });
    }
  },

  login(password) {
    const credentials = { email: 'hello@urbica.co', password };

    fetch('/login', {
      body: JSON.stringify(credentials),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return fetchData({ token })
          .then(({ activities, places, types, prisons, photos }) => {
            this.setState({ activities, places, types, prisons, token, photos }, () => {
              browserHistory.push('/admin');
            });
          });
      })
      .catch(error => console.error(error));
  },

  logout() {
    localStorage.removeItem('token');
    this.setState(dissoc('token'), () => {
      browserHistory.push('/login');
    });
  },

  uploadPhotos(prisonId, photos) {
    let uploads = new FormData();
    uploads.append('camp_id', prisonId);
    Array.from(photos).forEach(photo => uploads.append('path', photo));

    fetch('/api/public/uploads/id', {
      method: 'POST',
      body: uploads,
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        const photosLens = lensPath(['photos', prisonId]);
        const newPhotos = map(concatUrl(window.location.origin, 'path'), response);
        const setPhotos = ifElse(isNil, always(newPhotos), concat(newPhotos));
        this.setState(over(photosLens, setPhotos));
      })
      .catch(error => console.error(error));
  },

  deletePhoto(prisonId, photoId) {
    if (prisonId && photoId) {
      fetch(`/api/public/uploads/id/${photoId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${this.state.token}` }
      })
        .then(() => {
          this.setState(over(lensPath(['photos', prisonId]), reject(propEq('id', photoId))));
        })
        .catch(error => console.error(error));
    }
  },

  createPrison(prison) {
    fetch('/api/public/camps/id', {
      body: JSON.stringify(prison),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(([newPrison]) => {
        this.setState(assocPath(['prisons', newPrison.id], newPrison), () =>
          browserHistory.push(`/admin/prisons/${newPrison.id}`)
        );
      });
  },

  updatePrison(prison) {
    if (prison.id) {
      const newPrison = getMaxPrisoners(prison);
      this.setState(assocPath(['prisons', prison.id], newPrison));
    }
  },

  submitPrison(prison) {
    if (prison.id) {
      const newPrison = assoc('updated_at', (new Date()).toISOString(), prison);
      fetch(`/api/public/camps/id/${newPrison.id}`, {
        body: JSON.stringify(newPrison),
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(([submittedPrison]) => {
          this.setState(assocPath(['prisons', submittedPrison.id], getMaxPrisoners(submittedPrison)), () =>
            browserHistory.push(`/admin/prisons/${submittedPrison.id}`)
          );
          alert(`Лагерь "${prison.name.ru}" обновлён`);
        });
    }
  },

  deletePrison(prison) {
    if (prison.id) {
      if (confirm(`Удалить лагерь "${prison.name.ru}"?`)) {
        fetch(`/api/public/camps/id/${prison.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }).then(() => {
          browserHistory.push('/admin/prisons');
          this.setState(dissocPath(['prisons', `${prison.id}`]));
        });
      }
    }
  },

  renderChildren() {
    const { pathname } = this.props.router.location;

    // /login -> <LoginPage />
    if (test(/^(\/login\/?)$/, pathname)) {
      return React.cloneElement(this.props.children, {
        onSubmit: this.login
      });
    }

    if (isEmpty(this.state.prisons)) {
      return null;
    }

    // /admin || /admin/prisons -> <IndexPage />
    if (test(/^(\/admin\/?|\/admin\/prisons\/?)$/, pathname)) {
      return React.cloneElement(this.props.children, {
        periods: periods,
        prisons: this.state.prisons,
        places: this.state.places,
        types: this.state.types,
        onLogout: this.logout,
        createPrison: this.createPrison.bind(this, prisonTemplate)
      });
    }

    // /admin/period/periodId -> <PeriodPage />
    else if (test(/\/admin\/period\/\d+/, pathname)) {
      const { periodId } = this.props.router.params;
      return React.cloneElement(this.props.children, {
        period: periods[periodId - 1]
      });
    }

    // /admin/prisons/prisonId -> <PrisonPage />
    else if (test(/\/admin\/prisons\/\d+/, pathname)) {
      const { prisonId } = this.props.router.params;
      const prison = this.state.prisons[prisonId];
      return React.cloneElement(this.props.children, {
        prison: prison,
        photos: this.state.photos[prisonId],
        changeDropDownItem: this.changeDropDownItem,
        activityOptions: directoryToOptions(this.state.activities),
        placeOptions: directoryToOptions(this.state.places),
        typeOptions: directoryToOptions(this.state.types),
        uploadHandler: this.uploadPhotos,
        deletePhoto: this.deletePhoto,
        submitHandler: this.submitPrison,
        updateHandler: this.updatePrison,
        deleteHandler: this.deletePrison
      });
    }

    return this.props.children;
  },

  render() {
    return (
      <div className='App'>
        { this.renderChildren() }
      </div>
    );
  }
});

export default App;
