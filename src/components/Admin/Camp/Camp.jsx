import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// utils
import { getPeriods } from '../../../utils/utils';

// components
import Header from './Header/Header';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import Button from '../Button';
import TextInput from './TextInput/TextInput';
import MarkdownEditor from './Inputs/MarkdownEditor';
// import NotesInput from './NotesInput/NotesInput';
import SelectInput from './Inputs/SelectInput';
import Photos from './Photos/Photos';
import MarkdownHelp from './MarkdownHelp/MarkdownHelp';
import CampLocations from './CampLocations/CampLocations';

// styled
import Container from './Container';
// import Link from './Link';
import Fieldset from './Fieldset';
import FieldTitle from './FieldTitle';
import Separator from './Separator';

import { languages } from '../../../config';

class Camp extends PureComponent {
  static getDerivedStateFromProps({ camp }, prevState) {
    return {
      ...prevState,
      camp
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      camp: props.camp,
      activeLang: 'ru'
    };

    this.updateCamp = this.updateCamp.bind(this);
    this.deleteCamp = this.deleteCamp.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.updateField = this.updateField.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.publishCamp = this.publishCamp.bind(this);
  }

  updateCamp() {
    const date = new Date().toISOString();
    const newPrison = this.state.camp.set('updatedAt', date);

    this.props.updateCamp(newPrison);
  }

  deleteCamp() {
    this.props.deleteCamp(this.props.camp.get('id'));
  }

  changeLang(lang) {
    this.setState({ activeLang: lang });
  }

  updateField(path, value) {
    const { camp } = this.state;
    const updatedCamp = camp.setIn(path, value);

    this.setState({ camp: updatedCamp });
  }

  uploadPhotos(photos) {
    const campId = this.state.camp.get('id');

    this.props.uploadPhotos(campId, photos);
  }

  deletePhoto(photoId) {
    const campId = this.state.camp.get('id');

    this.props.deletePhoto(campId, photoId);
  }

  checkValidation() {
    const { camp, activeLang } = this.state;
    const title = camp.getIn(['title', activeLang]);
    const activityId = camp.get('activityId');
    const typeId = camp.get('typeId');
    const locations = camp.get('locations');
    const statics = locations.reduce((acc, location) => {
      if (location.getIn(['statistics', 0])) {
        return true;
      }
      return false;
    }, false);

    if (title && activityId && typeId && statics) {
      return true;
    }

    alert('Не заполненны минимальные поля');

    return false;
  }

  publishCamp() {
    const { activeLang } = this.state;
    const isPublished = this.state.camp.getIn(['published', activeLang]);

    if (!isPublished && this.checkValidation()) {
      this.updateField(['published', activeLang], true);
    } else {
      this.updateField(['published', activeLang], false);
    }
  }

  render() {
    const { camp, activeLang } = this.state;
    const {
      placesOptions,
      activitiesOptions,
      typesOptions,
      deleteCampStat,
      deleteCampLocation
    } = this.props;

    const isPublished = camp.getIn(['published', activeLang]);
    const updatedAt = moment(camp.get('updatedAt'))
      .locale('ru')
      .format('DD.MM.YY, HH:mm');

    return (
      <Container>
        <Header
          title={camp.getIn(['title', activeLang])}
          periods={getPeriods(camp.get('locations'))}
          updateCamp={this.updateCamp}
          updatedAt={updatedAt}
        />
        <LanguageSwitcher
          languages={languages}
          activeLang={activeLang}
          onChange={this.changeLang}
        />
        <div
          style={{
            gridColumn: 'span 3',
            justifySelf: 'end',
            alignSelf: 'baseline'
          }}
        >
          <Button onClick={this.publishCamp}>
            {isPublished ? 'Опубликованно' : 'Не опубликованно'}
          </Button>
          <a href={`/camp${camp.get('id')}`}>Посмотреть на карте</a>
        </div>
        <Fieldset>
          <FieldTitle>название лагеря</FieldTitle>
          <TextInput
            value={camp.getIn(['title', activeLang])}
            onChange={this.updateField.bind(null, ['title', activeLang])}
            placeholder='Название'
          />
          <TextInput
            value={camp.getIn(['subTitles', activeLang])}
            onChange={this.updateField.bind(null, ['subTitles', activeLang])}
            placeholder='Дополнительные названия, если есть'
          />
        </Fieldset>
        <MarkdownEditor
          source={camp.getIn(['description', activeLang])}
          onChange={this.updateField.bind(null, ['description', activeLang])}
        />
        <MarkdownHelp />
        {/* <FieldTitle>Заметки</FieldTitle>
        <NotesInput note={this.state.note} onChange={this.updateNotes} /> */}
        <Separator>
          <legend>Информация, общая для всех языков</legend>
        </Separator>
        <Photos
          photos={camp.get('photos')}
          uploadHandler={this.uploadPhotos}
          deletePhoto={this.deletePhoto}
          activeLang={activeLang}
          updateField={this.updateField}
        />
        <Fieldset>
          <FieldTitle>Основная деятельность</FieldTitle>
          <SelectInput
            value={camp.get('activityId')}
            options={activitiesOptions}
            clearable={false}
            onChange={({ value }) => this.updateField(['activityId'], value)}
          />
        </Fieldset>
        <Fieldset>
          <FieldTitle>Регион</FieldTitle>
          <SelectInput
            value={camp.get('regionId')}
            options={placesOptions}
            clearable={false}
            onChange={({ value }) => this.updateField(['regionId'], value)}
          />
        </Fieldset>
        <Fieldset>
          <FieldTitle>Тип объекта</FieldTitle>
          <SelectInput
            value={camp.get('typeId')}
            options={typesOptions}
            clearable={false}
            onChange={({ value }) => this.updateField(['typeId'], value)}
          />
        </Fieldset>
        <CampLocations
          locations={camp.get('locations')}
          updateField={this.updateField}
          deleteCampStat={deleteCampStat}
          deleteCampLocation={deleteCampLocation}
          campId={camp.get('id')}
          activeLang={activeLang}
        />
        <Button
          color='red'
          onClick={this.deleteCamp}
          style={{ gridColumn: 6, justifySelf: 'end' }}
        >
          удалить
        </Button>
      </Container>
    );
  }
}

Camp.propTypes = {
  camp: PropTypes.object.isRequired,
  activitiesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  placesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  typesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateCamp: PropTypes.func.isRequired,
  deleteCamp: PropTypes.func.isRequired,
  deleteCampStat: PropTypes.func.isRequired,
  deleteCampLocation: PropTypes.func.isRequired,
  uploadPhotos: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired
};

export default Camp;
