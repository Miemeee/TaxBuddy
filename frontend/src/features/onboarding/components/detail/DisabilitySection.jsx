import { Collapse, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SectionCard from "../SectionCard";
import SwitchRow from "../SwitchRow";

export default function DisabilitySection({
    control,
    isDisabled,
    disabilityCard,
}) {
    const { t } = useTranslation();
    return (
        <Collapse in={isDisabled === "yes"}>
            <SectionCard title={t("onboarding.disableddata")}>
                <SwitchRow
                    label={t("onboarding.disablecard")}
                    name="disabilityCard"
                    control={control}
                />

                <Collapse in={disabilityCard}>
                    <Controller
                        name="disabilityCardNo"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("onboarding.disablecardno")}
                                fullWidth
                                sx={{ mt: 2 }}
                            />
                        )}
                    />
                </Collapse>
            </SectionCard>
        </Collapse>
    );
}