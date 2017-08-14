import styled from 'styled-components';

export default styled.div`
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  
  p {
    margin-bottom: 40px;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
  }
  
  a {
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: 4px solid #fff;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
    text-decoration: none;
    transition: 0.4s;
    &:hover {
      border-bottom: 4px solid transparent;
      transition: 0.4s;
    }
  }
  
  img {
    max-width: 100%;
  }
`;
