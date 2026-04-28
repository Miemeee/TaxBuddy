import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddButton({ label, onClick }) {
    return (
        <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={onClick}
            sx={{ mt: 2, textTransform: "none", fontWeight: 600 }}
        >
            {label}
        </Button>
    );
}