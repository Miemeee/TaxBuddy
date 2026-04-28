import { Box, Typography, Checkbox } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SelectableDetailDialog from "./SelectableDetailDialog";

function formatCurrency(num = 0) {
    return `฿${num.toLocaleString("th-TH")}`;
}

export default function SelectableGroupItem({
    group,
    selectedIds,
    toggleSelect,
    showChildToggle = true,
}) {

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const selectedItems = group.items.filter((i) =>
        selectedIds.includes(i.id)
    );

    const total = selectedItems.reduce(
        (sum, i) => sum + i.amount,
        0
    );

    const checked = selectedItems.length > 0;

    const toggleGroup = () => {
        group.items.forEach((item) => toggleSelect(item.id));
    };

    const groupLabel = showChildToggle
        ? group.type
        : t(`dashboard.deduction.${group.deduction_id}`);

    console.log("group", group);

    return (
        <>
            <Box
                sx={{
                    px: 3,
                    py: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <Box>
                    <Typography fontWeight={600}>
                        {groupLabel}
                    </Typography>

                    {showChildToggle && (
                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                mt: 1,
                                color: "#1d4f91",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                            onClick={() => setOpen(true)}
                        >
                            {t("dashboard.viewDetail")}
                        </Typography>
                    )}
                </Box>

                <Box textAlign="right">
                    <Checkbox
                        checked={checked}
                        onChange={
                            showChildToggle
                                ? () => setOpen(true)
                                : toggleGroup
                        }
                    />

                    <Typography fontWeight={700}>
                        {formatCurrency(total)}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "0.8rem",
                            color: "text.secondary",
                        }}
                    >
                        {t("dashboard.deductionSub")}
                    </Typography>
                </Box>
            </Box>

            {showChildToggle && (
                <SelectableDetailDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    group={group}
                    selectedIds={selectedIds}
                    toggleSelect={toggleSelect}
                />
            )}
        </>
    );
}