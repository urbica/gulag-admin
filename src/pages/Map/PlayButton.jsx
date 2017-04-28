import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.button`
  width: 102px;
  height: 100px;
  padding: 0;
  border: none;
  margin-top: 140px;
  background-color: ${({ isPlay }) => isPlay ? '#1C2229' : '#27303A'};
  pointer-events: auto;
  overflow: hidden;
  outline: none;
  transition: all 0.25s ease;
`;

const PlayIcon = styled.div`
  height: 50px;
  width: 50px;
  margin: auto;
  display: block;
  overflow: hidden;
  position: relative;
  background-color: ${({ isPlay }) => isPlay ? '#1C2229' : '#27303A'};
  transition: all 0.25s ease;
`;

const Left = styled.div`
  height: 50px;
  float: left;
  background-color: white;
  width: ${({ isPlay }) => isPlay ? '36%' : '50%'};
  transition: all 0.25s ease;
  overflow: hidden;
`;

const Right = styled.div`
  height: 50px;
  float: right;
  width: ${({ isPlay }) => isPlay ? '36%' : '50%'};
  background-color: white;
  transition: all 0.25s ease;
`;

const FirstTriangle = styled.div`
  transform: translate(0, ${({ isPlay }) => isPlay ? '-100%' : '-50%'});
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  width: 0;
  height: 0;
  border-right: 50px solid #27303A;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  transition: transform 0.25s ease;
`;

const SecondTriangle = styled.div`
  transform: translate(0, ${({ isPlay }) => isPlay ? '100%' : '50%'});
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  width: 0;
  height: 0;
  border-right: 50px solid #27303A;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  transition: transform 0.25s ease;
`;


const PlayButton = ({ onClick, isDemoPlayed: isPlay }) => (
  <Wrap onClick={onClick} isPlay={isPlay}>
    <PlayIcon isPlay={isPlay}>
      <Left isPlay={isPlay} />
      <Right isPlay={isPlay} />
      <FirstTriangle isPlay={isPlay} />
      <SecondTriangle isPlay={isPlay} />
    </PlayIcon>
  </Wrap>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  isDemoPlayed: PropTypes.bool
};

export default PlayButton;
