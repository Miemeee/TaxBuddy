import { Collapse } from "@mui/material";
import SectionCard from "../SectionCard";
import SwitchRow from "../SwitchRow";
import { useTranslation } from "react-i18next";

export default function SpouseSection({
    control,
    maritalStatus,
}) {
    const { t } = useTranslation();
    return (
        <Collapse in={maritalStatus === "married"}>
            <SectionCard title={t("onboarding.spousedata")}>
                <SwitchRow
                    label={t("onboarding.marriedornot")}
                    name="spouseRegistered"
                    control={control}
                />

                <SwitchRow
                    label={t("onboarding.spouseincome")}
                    name="spouseHasIncome"
                    control={control}
                />
            </SectionCard>
        </Collapse>
    );
}