import { Button, Paper, styled, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/AddCircleOutlineRounded';

// Define Interface
interface Props {
    title: string;
    hasButtonAction?: boolean;
    sx?: any;
    children?: any;
}

// Custom Styles
const Item = styled(Paper)({
    boxShadow: '0 1px 1px rgba(0,0,0,.2)',
    borderRadius: '3px',
    '& .card-header': {
        padding: '20px 25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#425D7D',
        color: '#fff'
    },

    '& .card-body': {
        background: '#fff',
        padding: '20px 25px',
    },

    '& .MuiButtonBase-root': {
        textTransform: 'capitalize',
        letterSpacing: '1px'
    }
});

const CardCustomize = (props: Props) => {
    return (
        <Item sx={props.sx}>
            <div className="card-header">
                <Typography variant="h6">{props.title}</Typography>
                {props.hasButtonAction &&
                    <div>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mr: 2 }}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>

                        <Button
                            variant="contained"
                            color="success"
                            sx={{ marginRight: '10px' }}
                            startIcon={<AddIcon />}
                        >
                            Add New
                        </Button>
                    </div>
                }
            </div>
            {props.children &&
                <div className="card-body">
                    {props.children}
                </div>
            }
        </Item>
    );
}

export default CardCustomize;