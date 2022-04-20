import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function CatList() {
    return (
        <Stack direction='row' spacing={2}>
            <Avatar alt='Sämpylä' src='/sampyla64.jpg' />
            <Avatar alt='Sipuli' src='/sipuli64.jpg' />
        </Stack>
    );
}
