import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TransactionHeader({ type }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isIncome = type === "income";

    return (
        <Box display="flex" alignItems="center" mb={3} gap={1}>
            <IconButton onClick={() => navigate(-1)}>
                <ArrowBack />
            </IconButton>

            <Typography fontSize={20} fontWeight={700}>
                {isIncome ? t("transaction.income") : t("transaction.expense")}
            </Typography>
        </Box>
    );
}