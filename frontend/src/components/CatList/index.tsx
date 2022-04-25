import { Grid, Popper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import CatInfo from '../CatInfo';

const info1 = () => {
    return <CatInfo name='sipuli' meals={4} eaten={1} />;
};

const info2 = () => {
    return <CatInfo name='sampyla' meals={4} eaten={1} unicodename='sämpylä' />;
};

export default function CatList() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [info, setID] = useState(0);

    const handleClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setID(id);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <Grid container alignItems='center'>
            <Grid item xs={12}>
                <Stack direction='row' spacing={2}>
                    <Avatar alt='Sämpylä' src='/sampyla64.jpg' onClick={handleClick(1)} />
                    <Avatar alt='Sipuli' src='/sipuli64.jpg' onClick={handleClick(2)} />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Popper
                    id={id}
                    open={open && info == 2}
                    anchorEl={anchorEl}
                    modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}>
                    <CatInfo name='sipuli' meals={4} eaten={1} />
                </Popper>
            </Grid>

            <Grid item xs={12}>
                <Popper
                    id={id}
                    open={open && info == 1}
                    anchorEl={anchorEl}
                    modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}>
                    <CatInfo name='sampyla' meals={4} eaten={3} unicodename='sämpylä' />
                </Popper>
            </Grid>
        </Grid>
    );
}
