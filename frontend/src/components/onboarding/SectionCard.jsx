import { Paper, Typography } from "@mui/material";

export default function SectionCard({ title, children }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Typography fontWeight={700} mb={2} color="primary">
                {title}
            </Typography>
            {children}
        </Paper>
    );
}