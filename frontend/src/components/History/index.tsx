import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

interface CatVisit {
    name: string;
    time: string;
    icon: string;
}

const addIcons = (visits: CatVisit[]): CatVisit[] =>
    visits.map((visit) => ({
        ...visit,
        icon: visit.name.toLowerCase() === 'sipuli' ? '/sipuli64.jpg' : '/sampyla64.jpg',
    }));

const History = () => {
    const [rows, setRows] = useState<CatVisit[]>([]);

    useEffect(() => {
        const interval = setInterval(() => fetchCatVisits(), 10000);

        fetchCatVisits();

        return () => clearInterval(interval);
    }, []);

    const fetchCatVisits = () => {
        fetch('/api/v0/catvisits')
            .then((res) => res.json())
            .then((data) => setRows(addIcons(data)));
    };

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
