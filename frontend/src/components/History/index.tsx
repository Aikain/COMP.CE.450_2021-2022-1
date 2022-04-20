import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const rows = [
    {
        icon: '/sampyla64.jpg',
        name: 'Sämpylä',
        time: 1650467646778,
    },
    {
        icon: '/sipuli64.jpg',
        name: 'Sipuli',
        time: 1650467643778,
    },
    {
        icon: '/sampyla64.jpg',
        name: 'Sämpylä',
        time: 1650467526778,
    },
    {
        icon: '/sampyla64.jpg',
        name: 'Sämpylä',
        time: 1650467506778,
    },
];

const History = () => {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    minWidth: {
                        xs: '80vw',
                        md: '750px',
                    },
                }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Kissa</TableCell>
                        <TableCell align='right'>Viimeinen vierailu</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component='th' scope='row'>
                                <Grid container alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Avatar alt={row.name} src={row.icon} />
                                    </Grid>
                                    <Grid item>{row.name}</Grid>
                                </Grid>
                            </TableCell>
                            <TableCell align='right'>{new Date(row.time).toLocaleTimeString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default History;
