import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// selectors
import {
  currentCampSelector,
  currentCampPhotosSelector,
  currentNotesSelector,
  activitiesSelector,
  placesSelector,
  typesSelector
} from '../../App/dataSelectors';
import { updateCamp, deleteCamp, uploadPhotos, deletePhoto } from '../../App/dataReducer';

// components
import Header from './Header/Header';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import TextInput from './TextInput/TextInput';
import MarkdownEditor from './Inputs/MarkdownEditor';
import NotesInput from './NotesInput/NotesInput';
import SelectInput from './Inputs/SelectInput';
import PrisonLocation from './CampLocation';
import Photos from './Photos/Photos';
import Button from '../Button';
import Fieldset from './Fieldset';
import MarkdownHelp from './MarkdownHelp/MarkdownHelp';

// styled
import Container from './Container';
// import Link from './Link';
import FieldTitle from './FieldTitle';
import Separator from './Separator';

import { languages } from '../../../config';

const toOptions = list => list.map(({ id, title }) => ({ value: id, label: title.ru }));

const placesToOptions = (places) => {
  const arr = [];
  Object.values(places).map(place => arr.push({ value: place.id, label: place.name }));
  return arr;
};

class Camp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      camp: props.camp,
      activeLang: 'ru',
      note: (props.notes && props.notes.get('note')) || ''
    };
    this.updateCamp = this.updateCamp.bind(this);
    this.langChange = this.langChange.bind(this);
    this.updateField = this.updateField.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  updateCamp() {
    const newPrison = this.state.camp.set('updated_at', new Date().toISOString());

    this.props.dispatch(updateCamp(newPrison));
  }

  langChange(lang) {
    this.setState({ activeLang: lang });
  }

  updateField(path, value) {
    const { camp } = this.state;
    const updatedCamp = camp.setIn(path, value);

    this.setState({ camp: updatedCamp });
  }

  uploadPhotos(photos) {
    const campId = this.state.camp.get('id');

    this.props.dispatch(uploadPhotos(campId, photos));
  }

  deletePhoto(photoId) {
    this.props.dispatch(deletePhoto(photoId));
  }

  updateNotes({ target }) {
    this.setState({ note: target.value });
  }

  render() {
    const { camp, activeLang } = this.state;
    const {
      photos, places, activities, types
    } = this.props;
    const isPublished = camp.getIn(['published', activeLang]);

    return (
      <Container>
        <Header camp={camp} updateCamp={this.updateCamp} />
        <LanguageSwitcher
          languages={languages}
          activeLang={activeLang}
          onChange={this.langChange}
        />
        <div
          style={{
            gridColumn: 'span 3',
            justifySelf: 'end',
            alignSelf: 'baseline'
          }}
        >
          <Button onClick={this.updateField.bind(null, ['published', activeLang], !isPublished)}>
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
        <Fieldset>
          <FieldTitle>Название локации</FieldTitle>
          <TextInput
            placeholder='Название'
            value={camp.getIn(['location', activeLang])}
            onChange={this.updateField.bind(null, ['location', activeLang])}
          />
        </Fieldset>
        <MarkdownEditor
          source={camp.getIn(['description', this.state.activeLang])}
          onChange={this.updateField.bind(null, ['description', activeLang])}
        />
        <MarkdownHelp />
        <FieldTitle>Заметки</FieldTitle>
        <NotesInput note={this.state.note} onChange={this.updateNotes} />
        <Separator>
          <legend>Информация, общая для всех языков</legend>
        </Separator>
        <Photos photos={photos} uploadHandler={this.uploadPhotos} deletePhoto={this.deletePhoto} />
        <Fieldset>
          <FieldTitle>Основная деятельность</FieldTitle>
          <SelectInput
            value={camp.get('activity_id')}
            options={toOptions(activities.toJS())}
            clearable={false}
            onChange={({ value }) => this.updateField(['activity_id'], value)}
          />
        </Fieldset>
        <Fieldset>
          <FieldTitle>Регион</FieldTitle>
          <SelectInput
            value={camp.get('place_id')}
            options={placesToOptions(places.toJS())}
            clearable={false}
            onChange={({ value }) => this.updateField(['place_id'], value)}
          />
        </Fieldset>
        <Fieldset>
          <FieldTitle>Тип объекта</FieldTitle>
          <SelectInput
            value={camp.get('type_id')}
            options={toOptions(types.toJS())}
            clearable={false}
            onChange={({ value }) => this.updateField(['type_id'], value)}
          />
        </Fieldset>
        <PrisonLocation
          features={camp.get('features').toJS() || []}
          updateFeatures={features => this.updateField(['features'], Immutable.fromJS(features))}
        />
        <Button
          color='red'
          onClick={() => this.props.dispatch(deleteCamp(camp.get('id')))}
          style={{ gridColumn: 6, justifySelf: 'end' }}
        >
          удалить
        </Button>
      </Container>
    );
  }
}

Camp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  camp: PropTypes.object.isRequired,
  photos: PropTypes.object.isRequired,
  notes: PropTypes.object,
  activities: PropTypes.object.isRequired,
  places: PropTypes.object.isRequired,
  types: PropTypes.object.isRequired
};

Camp.defaultProps = {
  notes: null
};

const selector = createSelector(
  currentCampSelector,
  currentCampPhotosSelector,
  currentNotesSelector,
  activitiesSelector,
  placesSelector,
  typesSelector,
  (camp, photos, notes, activities, places, types) => ({
    camp,
    photos,
    notes,
    activities,
    places,
    types
  })
);

export default connect(selector)(Camp);
