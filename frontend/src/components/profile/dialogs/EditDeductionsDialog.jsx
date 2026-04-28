import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
} from "@mui/material";

import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import RadioSection from "../../onboarding/RadioSection";
import SpouseSection from "../../onboarding/detail/SpouseSection";
import ChildrenSection from "../../onboarding/detail/ChildrenSection";
import ParentsSection from "../../onboarding/detail/ParentsSection";
import DisabilitySection from "../../onboarding/detail/DisabilitySection";

export default function EditDeductionsDialog({
    open,
    onClose,
    deductions = [],
    updateDeductions
}) {

    const { t } = useTranslation();

    const methods = useForm({
        defaultValues: {
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
        }
    });

    const { handleSubmit, watch, reset } = methods;

    const maritalStatus = watch("maritalStatus");
    const hasChildren = watch("hasChildren");
    const supportsParents = watch("supportsParents");
    const isDisabled = watch("isDisabled");
    const disabilityCard = watch("disabilityCard");

    useEffect(() => {

        if (!open) return;

        const spouse = deductions.find(d => d.deduction_id === 1);
        const children = deductions.filter(d => d.deduction_id === 2);
        const parents = deductions.filter(d => d.deduction_id === 3);
        const disabled = deductions.find(d => d.deduction_id === 4);

        reset({
            maritalStatus: spouse ? "married" : "single",

            hasChildren: children.length ? "yes" : "no",
            children: children.map(() => ({
                age: "",
                disabled: false,
                hasCard: false,
            })),

            supportsParents: parents.length ? "yes" : "no",
            parents: parents.map(() => ({
                age: "",
            })),

            isDisabled: disabled ? "yes" : "no",

            spouseRegistered: false,
            spouseHasIncome: false,

            disabilityCard: false,
            disabilityCardNo: "",
        });

    }, [deductions, open, reset]);


    const onSubmit = async (data) => {

        const year = new Date().getFullYear();
        const newDeductions = [];

        if (data.maritalStatus === "married") {
            newDeductions.push({
                deduction_id: 1,
                amount_claimed: 60000,
            });
        }

        if (data.hasChildren === "yes") {
            data.children.forEach(() => {
                newDeductions.push({
                    deduction_id: 2,
                    amount_claimed: 30000,
                });
            });
        }

        if (data.supportsParents === "yes") {
            data.parents.forEach(() => {
                newDeductions.push({
                    deduction_id: 3,
                    amount_claimed: 30000,
                });
            });
        }

        if (data.isDisabled === "yes") {
            newDeductions.push({
                deduction_id: 4,
                amount_claimed: 60000,
            });
        }

        await updateDeductions({
            tax_year: year,
            deductions: newDeductions
        });

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>

            <DialogTitle>
                {t("profile.editDeductions")}
            </DialogTitle>

            <DialogContent>
                <FormProvider {...methods}>
                    <Stack spacing={3} mt={1}>

                        <RadioSection
                            label={t("onboarding.q_marital")}
                            name="maritalStatus"
                            options={[
                                { value: "single", label: t("onboarding.marital_single") },
                                { value: "married", label: t("onboarding.marital_married") },
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

                    </Stack>
                </FormProvider>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    {t("common.cancel")}
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                >
                    {t("common.save")}
                </Button>
            </DialogActions>

        </Dialog>
    );
}