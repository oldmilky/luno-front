import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

export const useFeatureFields = (control: any, fieldName: any) => {
  const [input, setInput] = useState("");
  const [inputRu, setInputRu] = useState("");

  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  useEffect(() => {
    const featuresEn = input
      .split("\n")
      .map((feature) => feature.trim())
      .filter((feature) => feature !== "");

    const featuresRu = inputRu
      .split("\n")
      .map((feature) => feature.trim())
      .filter((feature) => feature !== "");

    const combinedFeatures = featuresEn.map((feature, index) => ({
      buttonEn: feature,
      button: featuresRu[index] || "",
    }));

    replace(combinedFeatures);
  }, [input, inputRu, replace]);

  const handleAddFeatures = () => {
    setInput("");
    setInputRu("");
  };

  return {
    input,
    inputRu,
    setInput,
    setInputRu,
    fields,
    handleAddFeatures,
    remove,
  };
};
