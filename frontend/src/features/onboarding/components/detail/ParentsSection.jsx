import { Collapse } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SectionCard from "../SectionCard";
import DependentCard from "../DependentCard";
import AddButton from "../Addbutton";

export default function ParentsSection({
    control,
    supportsParents,
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "parents",
    });
    const { t } = useTranslation();

    return (
        <Collapse in={supportsParents === "yes"}>
            <SectionCard title={t("onboarding.parentsdata")}>
                {fields.map((item, index) => (
                    <DependentCard
                        key={item.id}
                        control={control}
                        index={index}
                        type="parents"
                        remove={() => remove(index)}
                    />
                ))}

                <AddButton
                    label={t("onboarding.addparent")}
                    onClick={() =>
                        append({
                            age: "",
                            disabled: false,
                            hasCard: false,
                        })
                    }
                />
            </SectionCard>
        </Collapse>
    );
}