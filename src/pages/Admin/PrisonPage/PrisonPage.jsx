import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { __, curryN, identity, lensPath, lensProp, path, pipe, set, view, values } from 'ramda';

import PrisonHeader from './PrisonHeader';
import LanguageSwitcher from '../LanguageSwitcher';
import DraftSwitch from './DraftSwitch';
import FieldTitle from '../FieldTitle';
import TextInput from '../TextInput';
import MarkdownEditor from '../Inputs/MarkdownEditor';
import NotesInput from './NotesInput';
import SelectInput from '../Inputs/SelectInput';
import PrisonLocation from './PrisonLocation';
import PrisonPhotos from './PrisonPhotos/PrisonPhotos';
import Button from '../Button';
import Fieldset from './Fieldset';
import Separator from './Separator';
import MarkdownHelp from './MarkdownHelp';
import { languages } from '../../../config';

// styled
import { Container, Six, Four, Three, Two } from '../Layout';
import Link from './Link';

const toOptions = list =>
  list.map(({ id, name }) => ({ value: id, label: name }));

const placesToOptions = (places) => {
  const arr = [];
  values(places).map(place => arr.push({ value: place.id, label: place.name }));
  return arr;
};

class PrisonCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeLang: 'ru',
      markdownState: {
        fieldPath: ['description', 'ru'],
        selectionEnd: 0
      }
    };
    this.langChange = this.langChange.bind(this);
    this.markdownOnBlur = this.markdownOnBlur.bind(this);
    this.photoOnClick = this.photoOnClick.bind(this);
  }

  langChange(lang) {
    this.setState({ activeLang: lang });
  }

  markdownOnBlur(fieldPath, { selectionEnd }) {
    this.setState(set(lensProp('markdownState'), { fieldPath, selectionEnd }));
  }

  photoOnClick(url) {
    const { prisons, match, updateHandler } = this.props;
    const { fieldPath, selectionEnd } = this.state.markdownState;
    const prison = prisons && prisons[match.params.id];

    const imageMarkup = `![](${url})`;

    const value = view(lensPath(fieldPath), prison);
    const newValue = [
      value.slice(0, selectionEnd),
      imageMarkup,
      value.slice(selectionEnd)
    ].join('');

    updateHandler(set(lensPath(fieldPath), newValue, prison));
  }

  render() {
    const {
      match, uploadHandler, updateHandler, deleteHandler, submitHandler, deletePhoto, notes,
      updateNoteHandler
    } = this.props;

    const prison = this.props.prisons && this.props.prisons[match.params.id];
    const photos = this.props.photos && this.props.photos[match.params.id];

    const updateFrom = curryN(2, (getValue, lens) =>
      pipe(getValue, set(lens, __, prison), updateHandler));

    const updateField = updateFrom(identity);
    const updateInput = updateFrom(path(['target', 'value']));
    const updateSelect = updateFrom(path(['value']));

    if (!prison) {
      return <div>Загрузка...</div>;
    }

    return (
      <Container>
        <Six>
          <PrisonHeader
            prison={prison}
            submitHandler={submitHandler}
          />
        </Six>
        <Link to={`/prison${prison.id}`}>Посмотреть на карте</Link>
        <Six>
          <LanguageSwitcher
            languages={languages}
            activeLang={this.state.activeLang}
            onChange={this.langChange}
          />
        </Six>
        <Six
          justify='center'
          align='center'
        >
          <DraftSwitch
            published={prison.published[this.state.activeLang]}
            onChange={updateField(lensPath(['published', this.state.activeLang]))}
          />
        </Six>
        <Three>
          <Fieldset>
            <FieldTitle>название лагеря</FieldTitle>
            <TextInput
              value={prison.name[this.state.activeLang] || ''}
              onChange={updateInput(lensPath(['name', this.state.activeLang]))}
              placeholder={'Название'}
            />
            <TextInput
              value={prison.additional_names[this.state.activeLang] || ''}
              onChange={updateInput(lensPath(['additional_names', this.state.activeLang]))}
              placeholder='Дополнительные названия, если есть'
            />
          </Fieldset>
        </Three>
        <Three>
          <FieldTitle>Название локации</FieldTitle>
          <TextInput
            placeholder='Название'
            value={prison.location[this.state.activeLang] || ''}
            onChange={updateInput(lensPath(['location', this.state.activeLang]))}
          />
        </Three>
        <Four>
          <MarkdownEditor
            source={prison.description[this.state.activeLang] || ''}
            onBlur={this.markdownOnBlur.bind(this, ['description', this.state.activeLang])}
            onChange={updateInput(lensPath(['description', this.state.activeLang]))}
          />
        </Four>
        <Two>
          <MarkdownHelp />
        </Two>
        <Six>
          <FieldTitle>Заметки</FieldTitle>
          <NotesInput
            source={notes[prison.id] || ''}
            onChange={updateNoteHandler.bind(null, prison.id)}
          />
        </Six>
        <Six>
          <Separator>
            <legend>Информация, общая для всех языков</legend>
          </Separator>
        </Six>
        <Six>
          <PrisonPhotos
            photos={photos}
            onClick={this.photoOnClick}
            deletePhoto={deletePhoto.bind(null, prison.id)}
            uploadHandler={uploadHandler.bind(null, prison.id)}
          />
        </Six>
        <Three>
          <Fieldset>
            <FieldTitle>Основная деятельность</FieldTitle>
            <SelectInput
              value={prison.activity_id}
              options={toOptions(this.props.activities)}
              clearable={false}
              onChange={updateSelect(lensProp('activity_id'))}
            />
          </Fieldset>
          <Fieldset>
            <FieldTitle>Регион</FieldTitle>
            <SelectInput
              value={prison.place_id}
              options={placesToOptions(this.props.places)}
              clearable={false}
              onChange={updateSelect(lensProp('place_id'))}
            />
          </Fieldset>
        </Three>
        <Three>
          <Fieldset>
            <FieldTitle>Тип объекта</FieldTitle>
            <SelectInput
              value={prison.type_id}
              options={toOptions(this.props.types)}
              clearable={false}
              onChange={updateSelect(lensProp('type_id'))}
            />
          </Fieldset>
        </Three>
        <Six>
          <PrisonLocation
            features={prison.features || []}
            updateFeatures={updateField(lensProp('features'))}
          />
        </Six>
        <Six justify='end'>
          <Button
            color='red'
            onClick={deleteHandler.bind(null, prison)}
          >
            удалить
          </Button>
        </Six>
      </Container>
    );
  }
}

PrisonCard.propTypes = {
  prisons: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  updateHandler: PropTypes.func.isRequired,
  uploadHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired,
  updateNoteHandler: PropTypes.func.isRequired,
  photos: PropTypes.object.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  places: PropTypes.object.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};

export default PrisonCard;