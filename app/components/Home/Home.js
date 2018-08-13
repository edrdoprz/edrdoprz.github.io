import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  text-align: center;
`;

const NameHeading = styled.h1`
  color: #00C1FF;
  font-size: 20rem;
  font-weight: normal;
  line-height: 1.2;
  letter-spacing: -3rem;
  margin: 0 0 2rem 0;
  padding: 0 2.5rem 0 0px;
`;

const Description = styled.span`
  color: #bfab00;
  font-family: initial;
  font-size: 2rem;
  font-style: italic;
  min-height: 2.3rem;
  position: relative;
  top: -4rem;
`;

const ProjectsHeading = styled.h1`
  color: #00C1FF;
  font-size: 4rem;
  font-weight: normal;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 1rem;
  letter-spacing: -0.2rem;
  padding-right: 0.2rem;
`;

const ProjectList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ProjectListItem = styled.li`
  color: #bfab00;
  font-size: 2rem;
  margin-bottom: 1rem;

  > a {
    color: inherit;
    text-decoration: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const DESCRIPTION = 'turning designs into reality since 2014';

export default class Home extends Component {
  state = {
    description: '',
    typingIndex: 0,
  };

  componentWillMount() {
    this.typeDescription();
  }

  typeDescription = () => {
    const {
      description,
      typingIndex,
    } = this.state;

    if (DESCRIPTION[typingIndex]) {
      this.typingTimeout = setTimeout(() => {
        this.setState({
          description: description + DESCRIPTION[typingIndex],
          typingIndex: typingIndex + 1,
        }, this.typeDescription);
      }, 75);
    } else {
      clearTimeout(this.typingTimeout);
    }
  }

  render() {
    const { description } = this.state;

    return (
      <Wrapper>
        <div>
          <NameHeading>eduardo</NameHeading>
        </div>
        <Description>{description}</Description>
        <ProjectsHeading>PROJECTS</ProjectsHeading>
        <ProjectList>
          <ProjectListItem>
            <Link to="/tic-tac-toe">tic tac toe</Link>
          </ProjectListItem>
        </ProjectList>
      </Wrapper>
    );
  }
}
