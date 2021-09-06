import styled from '@emotion/styled';
import React from 'react';
import { Posts } from './posts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Post } from './post';

export const App = () => {
    return (
        <div>
            <Header>Postings</Header>
            <Navigation></Navigation>
            <Router>
                <Switch>
                    <Route exact path={['/', '/posts']}>
                        <Posts />
                    </Route>
                    <Route path={['/post/:id']}>
                        <Post />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

const Navigation = styled.div();
const Header = styled.h1();
