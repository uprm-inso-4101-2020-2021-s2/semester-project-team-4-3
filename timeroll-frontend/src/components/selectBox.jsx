import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {
    const classes = useStyles();

    const [item, setItem] = React.useState("");

    const handleChange = (event) => {
        setItem(event.target.value);
        props.onSelectBoxItemChange(event.target.value);
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel >{props.label}</InputLabel>
                <Select
                    value={item}
                    onChange={handleChange}
                    label={props.label}
                >
                    {props.items.map((item, index) =>
                        <MenuItem key={index} value={index}>{item}</MenuItem>)}

                </Select>
            </FormControl>
        </div>
    );
}