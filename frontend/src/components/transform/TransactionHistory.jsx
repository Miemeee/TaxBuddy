// components/TransactionHistory.jsx
import {
    Card,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
} from "@mui/material";

export default function TransactionHistory({ data, type }) {
    const formatAmount = (num) => {
        const abs = Math.abs(num);
        const sign = type === "income" ? "+" : "-";

        return `${sign} ฿${abs.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
        })}`;
    };

    return (
        <Card sx={{ borderRadius: 2 }}>
            <List disablePadding>
                {data.map((item, index) => (
                    <div key={item.id}>
                        <ListItem>
                            <ListItemText
                                primary={item.source}
                                secondary={item.date}
                            />
                            <Typography
                                fontWeight={600}
                                color={
                                    type === "income" ? "success.main" : "error.main"
                                }
                            >
                                {formatAmount(item.amount)}
                            </Typography>
                        </ListItem>
                        {index !== data.length - 1 && (
                            <Divider component="li" />
                        )}
                    </div>
                ))}
            </List>
        </Card>
    );
}