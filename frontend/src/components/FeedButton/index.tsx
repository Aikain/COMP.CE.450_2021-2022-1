import { useState } from 'react';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

const CustomButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    height: 200,
    width: 200,
    borderRadius: 100,
}));

const FeedButton = () => {
    const [feeding, setFeeding] = useState(false);
    const feed = () => {
        setFeeding(true);

        setTimeout(() => {
            setFeeding(false);
        }, 2000);
    };
    return (
        <CustomButton variant='contained' onClick={feed} disabled={feeding}>
            {!feeding && 'Ruoki kissoja'}
            {feeding && (
                <Grid container direction='column'>
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                    <Grid item>Ruokitaan kissoja...</Grid>
                </Grid>
            )}
        </CustomButton>
    );
};

export default FeedButton;
