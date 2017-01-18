import React from 'react';
import FieldTitle from '../../FieldTitle';
import styled from 'styled-components';

const PrisonYearsWrap = styled.div`
  margin-bottom: 33px;
`;

const YearsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const YearLabel = styled.label`
  width: 59.5px;
  text-align: center;
  margin-right: 6px;
  margin-bottom: 10px;
  & input {
    display: none;
  }
`;

const YearSpan = styled.span`
  display: inline-block;
  width: 100%;
  padding-top: 6px;
  padding-bottom: 5px;
  border-radius: 3px;
  font-size: 16px;
  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
  input:checked + & {
    color: #fff;
    background-color: #4a4a4a;
    &:hover {
      background: rgba(0,0,0,1);
    }
  }
  input:disabled + & {
    color: #fff;
    opacity: .3;
  }
`;

const years = [];
for (let i = 1918; i <= 1960; i++) {
  years.push(i);
}

class PrisonYears extends React.Component {
  render() {
    const {selectedFeatureIndex, toggleYear} = this.props;
    const features = this.props.features || [];
    let yearsDisabled = [];

    features.map((feature, index) => {
      if (index !== selectedFeatureIndex) {
        const years = Object.keys(feature.properties);
        yearsDisabled = yearsDisabled.concat(years);
      }
    });

    return (
      <PrisonYearsWrap>
        <FieldTitle>Годы существования лагеря</FieldTitle>
        <YearsList>
          {
            years.map((year, key) => {
              const checked = features[selectedFeatureIndex] ?
                features[selectedFeatureIndex].properties[year] : false;
              const disabled = yearsDisabled.includes(String(year));

              return (
                <YearLabel key={ key }>
                  <input
                    type='checkbox'
                    checked={ checked }
                    disabled={ disabled }
                    onChange={ toggleYear.bind(null, year, features) }
                  />
                  <YearSpan>{ year }</YearSpan>
                </YearLabel>
              )
            })
          }
        </YearsList>
      </PrisonYearsWrap>
    );
  }
}

export default PrisonYears;