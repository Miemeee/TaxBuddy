// pages/ProfilePage.jsx

import { Container, Stack, Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useProfile from "../hooks/useProfile";

import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import IncomeChannelsCard from "../components/profile/IncomeChanelCard";
import DeductionsCard from "../components/profile/DeductionCard";

export default function ProfilePage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        profile,
        loading,
        updateProfile,
        updateChannels,
        updateDeductions
    } = useProfile();

    console.log("PROFILE STATE:", profile);

    if (loading) {
        return <div>{t("common.loading")}</div>;
    }

    if (!profile) {
        return <div>{t("common.noProfileData")}</div>;
    }

    return (
        <>
            <Box sx={{ width: "100%", p: 2 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                >
                </Button>
            </Box>
            <Container maxWidth="sm">
                <Stack spacing={3} mt={3} >
                    <ProfileInfoCard
                        user={profile}
                        onSave={updateProfile}
                    />

                    <IncomeChannelsCard
                        channels={profile?.incomeChannels || []}
                        onSave={updateChannels}
                    />

                    <DeductionsCard
                        deductions={profile?.userDeductions || []}
                        updateDeductions={updateDeductions}
                    />

                </Stack>
            </Container>
        </>

    );
}