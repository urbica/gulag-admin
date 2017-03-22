import React from 'react'
import styled from 'styled-components'

const Wrap = styled.button`
  width: 102px;
  height: 100px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .5)
  border-radius: 10px;
  background-color: #2c3542;
  pointer-events: auto;
  overflow: hidden;
  outline: none;
`;

const PlayButton = styled.div`
  height: 50px;
  width: 50px;
  margin: auto;
  display: block;
  overflow: hidden;
  position: relative;
  background-color: #2c3542;
`;

const Left = styled.div`
  height: 50px;
  float: left;
  background-color: white;
  width: ${props => props.isPlay ? '36%' : '50%'};
  transition: all 0.25s ease;
  overflow: hidden;
`;

const Right = styled.div`
  height: 50px;
  float: right;
  width: ${props => props.isPlay ? '36%' : '50%'};
  background-color: white;
  transition: all 0.25s ease;
`;

const FirstTriangle = styled.div`
  transform: translate(0, ${props => props.isPlay ? '-100%' : '-50%'});
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  width: 0;
  height: 0;
  border-right: 50px solid #2c3542;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  transition: transform 0.25s ease;
`;

const SecondTriangle = styled.div`
  transform: translate(0, ${props => props.isPlay ? '100%' : '50%'});
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  width: 0;
  height: 0;
  border-right: 50px solid #2c3542;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  transition: transform 0.25s ease;
`;


const ChartButton = (props) => {
  const { onClick, isDemoPlayed } = props;

  return (
    <Wrap onClick={onClick}>
      <PlayButton>
        <Left isPlay={isDemoPlayed}/>
        <Right isPlay={isDemoPlayed}/>
        <FirstTriangle isPlay={isDemoPlayed}/>
        <SecondTriangle isPlay={isDemoPlayed}/>
      </PlayButton>
    </Wrap>
  )
};

export default ChartButton