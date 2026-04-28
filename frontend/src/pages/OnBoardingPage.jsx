// src/pages/OnboardingPage.jsx

import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Container,
    Paper,
    Stack,
    Button,
} from "@mui/material";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";

import RadioSection from "../components/onboarding/RadioSection";
import IncomeChannelSection from "../components/onboarding/detail/IncomeChannelSection";
import SpouseSection from "../components/onboarding/detail/SpouseSection";
import ChildrenSection from "../components/onboarding/detail/ChildrenSection";
import ParentsSection from "../components/onboarding/detail/ParentsSection";
import DisabilitySection from "../components/onboarding/detail/DisabilitySection";

import {
    createUserDeduction,
    updateUserProfile,
} from "../services/onBoardingService";

function OnboardingPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { fetchUser } = useAuth();

    const methods = useForm({
        defaultValues: {
            incomeChannels: [{ name: "" }],

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

    const {
        handleSubmit,
        setError,
        clearErrors,
        control,
        watch,
        formState: { errors },
    } = methods;

    const maritalStatus = watch("maritalStatus");
    const hasChildren = watch("hasChildren");
    const supportsParents = watch("supportsParents");
    const isDisabled = watch("isDisabled");
    const disabilityCard = watch("disabilityCard");

    const incomeChannels = useWatch({
        control,
        name: "incomeChannels",
    });

    useEffect(() => {
        const hasValidIncome = incomeChannels?.some(
            (i) => i?.name && i.name.trim() !== ""
        );

        if (hasValidIncome) {
            clearErrors("incomeChannels");
        }
    }, [incomeChannels, clearErrors]);

    const onSubmit = async (data) => {
        const incomeList = data.incomeChannels
            .map((i) => i.name)
            .filter((i) => i && i.trim() !== "");

        if (incomeList.length === 0) {
            setError("incomeChannels", {
                type: "manual",
                message:
                    t("onboarding.incomechannels_required"),
            });
            return;
        }

        try {
            const year = new Date().getFullYear();

            await updateUserProfile({
                income_channel: incomeList,
            });

            if (data.maritalStatus === "married") {
                await createUserDeduction({
                    deduction_id: 1,
                    tax_year: year,
                    amount_claimed: 60000,
                });
            }

            if (data.hasChildren === "yes") {
                for (let child of data.children) {
                    await createUserDeduction({
                        deduction_id: 2,
                        tax_year: year,
                        amount_claimed: 30000,
                    });
                }
            }

            if (data.supportsParents === "yes") {
                for (let parent of data.parents) {
                    await createUserDeduction({
                        deduction_id: 3,
                        tax_year: year,
                        amount_claimed: 30000,
                    });
                }
            }

            if (data.isDisabled === "yes") {
                await createUserDeduction({
                    deduction_id: 4,
                    tax_year: year,
                    amount_claimed: 60000,
                });
            }

            await fetchUser();
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
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

                                <IncomeChannelSection control={control} />

                                {errors.incomeChannels && (
                                    <Typography color="error" sx={{ mt: -2 }}>
                                        {errors.incomeChannels.message}
                                    </Typography>
                                )}

                                <RadioSection
                                    label={t("onboarding.q_marital")}
                                    name="maritalStatus"
                                    options={[
                                        {
                                            value: "single",
                                            label: t("onboarding.marital_single"),
                                        },
                                        {
                                            value: "married",
                                            label: t("onboarding.marital_married"),
                                        },
                                    ]}
                                />

                                <SpouseSection maritalStatus={maritalStatus} />

                                <RadioSection
                                    label={t("onboarding.q_children")}
                                    name="hasChildren"
                                    options={[
                                        { value: "no", label: t("onboarding.no") },
                                        { value: "yes", label: t("onboarding.yes") },
                                    ]}
                                />

                                <ChildrenSection hasChildren={hasChildren} />

                                <RadioSection
                                    label={t("onboarding.q_parents")}
                                    name="supportsParents"
                                    options={[
                                        { value: "no", label: t("onboarding.no") },
                                        { value: "yes", label: t("onboarding.yes") },
                                    ]}
                                />

                                <ParentsSection supportsParents={supportsParents} />

                                <RadioSection
                                    label={t("onboarding.q_disabled")}
                                    name="isDisabled"
                                    options={[
                                        { value: "no", label: t("onboarding.no") },
                                        { value: "yes", label: t("onboarding.yes") },
                                    ]}
                                />

                                <DisabilitySection
                                    isDisabled={isDisabled}
                                    disabilityCard={disabilityCard}
                                />

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