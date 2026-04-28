import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import TransactionHeader from "../components/transform/TransactionHeader";
import TransactionForm from "../components/transform/TransactionForm";
import DaySelector from "../components/transform/DaySelector";
import HistoryList from "../components/transform/HistoryList";
import { useTransaction } from "../hooks/useTransaction";

export default function TransactionPage({ type }) {
    const theme = useTheme();

    const [refreshKey, setRefreshKey] = useState(0);

    const transaction = useTransaction(type, refreshKey);

    const reload = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: theme.palette.grey[100],
                display: "flex",
                justifyContent: "center",
                px: 2,
                py: 4,
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 1200 }}>
                <TransactionHeader type={type} />

                <Grid container spacing={4}>
                    {/* Form */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TransactionForm
                            type={type}
                            onSuccess={transaction.reload}
                        />
                    </Grid>

                    {/* Right Side */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        {/* <DaySelector
                            onSelect={transaction.setSelectedDate}
                        /> */}

                        <Box mt={3}>
                            <HistoryList
                                items={transaction.history}
                                type={type}
                                onUpdated={transaction.reload}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}