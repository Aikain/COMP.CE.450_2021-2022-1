import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
    name: string;
    weight?: number;
    meals: number;
    eaten: number;
    desc?: string;
    unicodename?: string;
}

const CatInfo = (props: Props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component='img' height='140' image={'/' + props.name + 'full.jpg'} alt={props.name} />
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    <b>
                        {props.unicodename
                            ? props.unicodename.charAt(0).toUpperCase() + props.unicodename.slice(1)
                            : props.name.charAt(0).toUpperCase() + props.name.slice(1)}
                    </b>{' '}
                    on hyvä poika.
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Päivittäisiä ruoka-annoksia jäljellä {props.meals - props.eaten} / {props.meals}.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>Full History</Button>
            </CardActions>
        </Card>
    );
};

export default CatInfo;
