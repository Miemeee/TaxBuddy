import React from "react";
import {
    Box,
    Typography,
    Container,
    Paper,
    Stack,
    Button,
    TextField,
} from "@mui/material";

import { useForm, FormProvider, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import RadioSection from "./components/RadioSection.jsx";
import SpouseSection from "./components/detail/SpouseSection.jsx";
import ChildrenSection from "./components/detail/ChildrenSection.jsx";
import ParentsSection from "./components/detail/ParentsSection.jsx";
import DisabilitySection from "./components/detail/DisabilitySection.jsx";

function OnboardingPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            incomeChannel: "",
            maritalStatus: "single",
            hasChildren: "no",
            supportsParents: "no",
            isDisabled: "no",

            spouseRegistered: false,
            spouseHasIncome: false,

            children: [],
            parents: [],

            disabilityCard: false,
            disabilityCardNo: "",
        },
    });

    const { control, handleSubmit, watch } = methods;

    const maritalStatus = watch("maritalStatus");
    const hasChildren = watch("hasChildren");
    const supportsParents = watch("supportsParents");
    const isDisabled = watch("isDisabled");
    const disabilityCard = watch("disabilityCard");

    const onSubmit = (data) => {
        localStorage.setItem("taxbuddy_profile_full", JSON.stringify(data));
        navigate("/dashboard");
    };

    return (
        <Box minHeight="100vh" bgcolor="background.default" py={6}>
            <Container maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography variant="h4" fontWeight={700} mb={1} color="primary">
                        {t("onboarding.setup")}
                    </Typography>

                    <Typography color="text.secondary" mb={4}>
                        {t("onboarding.setupdesc")}
                    </Typography>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>

                                {/* Income */}
                                <Controller
                                    name="incomeChannel"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t("onboarding.incomePlaceholder")}
                                            fullWidth
                                        />
                                    )}
                                />

                                {/* Marital */}
                                <RadioSection
                                    label={t("onboarding.q_marital")}
                                    name="maritalStatus"
                                    control={control}
                                    options={[
                                        { value: "single", label: t("onboarding.marital_single") },
                                        { value: "married", label: t("onboarding.marital_married") },
                                    ]}
                                />

                                <SpouseSection
                                    control={control}
                                    maritalStatus={maritalStatus}
                                />

                                {/* Children */}
                                <RadioSection
                                    label={t("onboarding.q_children")}
                                    name="hasChildren"
                                    control={control}
                                    options={[
                                        { value: "no", label: t("onboarding.no") },
                                        { value: "yes", label: t("onboarding.yes") },
                                    ]}
                                />

                                <ChildrenSection
                                    control={control}
                                    hasChildren={hasChildren}
                                />

                                {/* Parents */}
                                <RadioSection
                                    label={t("onboarding.q_parents")}
                                    name="supportsParents"
                                    control={control}
                                    options={[
                                        { value: "no", label: t("onboarding.no") },
                                        { value: "yes", label: t("onboarding.yes") },
                                    ]}
                                />

                                <ParentsSection
                                    control={control}
                                    supportsParents={supportsParents}
                                />

                                {/* Disability */}
                                <RadioSection
                                    label={t("onboarding.q_disabled")}
                                    name="isDisabled"
                                    control={control}
                                    options={[
                                        { value: "no", label: t("onboarding.no") },
                                        { value: "yes", label: t("onboarding.yes") },
                                    ]}
                                />

                                <DisabilitySection
                                    control={control}
                                    isDisabled={isDisabled}
                                    disabilityCard={disabilityCard}
                                />

                                {/* Submit */}
                                <Box textAlign="center" mt={4}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            px: 8,
                                            py: 1.5,
                                            borderRadius: 999,
                                            textTransform: "none",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {t("onboarding.next")}
                                    </Button>
                                </Box>

                            </Stack>
                        </form>
                    </FormProvider>
                </Paper>
            </Container>
        </Box>
    );
}

export default OnboardingPage;