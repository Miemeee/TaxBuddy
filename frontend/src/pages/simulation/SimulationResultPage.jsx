import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Divider,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { simulationService } from "../../services/simulationService";
import { useSimulationContext } from "../../context/SimulationContext";
import { useTranslation } from "react-i18next";

import SimulationHeader from "../../components/simulation/selection/SimulationHeader";
import TaxDetailDialog from "../../components/dashboard/TaxDetailDialog";
import generateTaxPDF from "../../utils/generateTaxPDF";

const formatCurrency = (num = 0) =>
    `฿${Number(num).toLocaleString("th-TH")}`;

export default function SimulationResultPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { selectedIncomeIds, selectedDeductionIds } =
        useSimulationContext();

    const [summary, setSummary] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [deductions, setDeductions] = useState([]);

    const [openDetail, setOpenDetail] = useState(false);

    const year = new Date().getFullYear();

    useEffect(() => {
        loadResult();
    }, []);

    const loadResult = async () => {

        const result = await simulationService.calculate({
            year,
            transactionIds: selectedIncomeIds,
            deductionIds: selectedDeductionIds,
        });

        setSummary(result.summary);
        setTransactions(result.transactions || []);
        setDeductions(result.deductions || []);
    };

    if (!summary) return null;

    return (
        <Box sx={{ p: 3 }}>

            <SimulationHeader step="result" />

            {/* SUMMARY CARD */}

            <Card
                sx={{
                    maxWidth: 500,
                    mx: "auto",
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >

                <CardContent>

                    {/* ภาษีก่อนลดหย่อน */}

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={2}
                    >

                        <Typography color="text.secondary">
                            {t("simulation.totalTax")}
                        </Typography>

                        <Typography
                            fontWeight={700}
                            fontSize={20}
                        >
                            {formatCurrency(summary.taxTotal)}
                        </Typography>

                    </Box>

                    {/* ลดหย่อน */}

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={2}
                    >

                        <Typography color="text.secondary">
                            {t("simulation.totalDeduction")}
                        </Typography>

                        <Typography
                            fontWeight={700}
                            fontSize={18}
                        >
                            - {formatCurrency(summary.totalDeduction)}
                        </Typography>

                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* ภาษีที่ต้องจ่าย */}

                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >

                        <Typography fontWeight={600}>
                            {t("simulation.taxPayable")}
                        </Typography>

                        <Typography
                            fontWeight={800}
                            fontSize={24}
                            color="primary.main"
                        >
                            {formatCurrency(summary.taxPayable)}
                        </Typography>

                    </Box>

                    {/* ปุ่มดูรายละเอียด */}

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3 }}
                        onClick={() => setOpenDetail(true)}
                    >
                        {t("simulation.viewDetails")}
                    </Button>

                </CardContent>


            </Card>


            {/* ปุ่ม export PDF */}

            <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        py: 1.6,
                        borderRadius: 2,
                        bgcolor: "#7aa05c",
                        fontWeight: 600,
                    }}
                    onClick={async () => {

                        await generateTaxPDF({
                            summary,
                            transactions,
                            deductions,
                        });

                    }}
                >
                    {t("simulation.exportPDF")}
                </Button>

            </Box>


            {/* DETAIL DIALOG */}

            <TaxDetailDialog
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                summary={summary}
            />
            <Box
                sx={{
                    maxWidth: 500,
                    mx: "auto",
                    mt: 2,
                }}
            >
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        py: 1.4,
                        borderRadius: 2,
                        fontWeight: 600,
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    {t("simulation.backToDashboard")}
                </Button>
            </Box>

        </Box>
    );
}