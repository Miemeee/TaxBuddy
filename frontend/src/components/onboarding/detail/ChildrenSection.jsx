import { Collapse } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SectionCard from "../SectionCard";
import DependentCard from "../DependentCard";
import AddButton from "../Addbutton";

export default function ChildrenSection({
    control,
    hasChildren,
}) {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "children",
    });

    return (
        <Collapse in={hasChildren === "yes"}>
            <SectionCard title={t("onboarding.childrendata")}>
                {fields.map((item, index) => (
                    <DependentCard
                        key={item.id}
                        control={control}
                        index={index}
                        type="children"
                        remove={() => remove(index)}
                    />
                ))}

                <AddButton
                    label={t("onboarding.addchild")}
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