import React from 'react';

import Grid from '@mui/material/Grid';

import FeedButton from './components/FeedButton';
import History from './components/History';
import CatList from './components/CatList';

function App() {
    return (
        <Grid container direction='column' alignItems='center' spacing={4} p={4}>
            <Grid item>
                <FeedButton />
            </Grid>
            <Grid item xs={12}>
                <History />
            </Grid>
            <Grid item>
                <CatList />
            </Grid>
        </Grid>
    );
}

export default App;
