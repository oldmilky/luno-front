import { FC, useEffect, useState } from "react";
import s from "./Fields.module.scss";

interface IFeature {
  title: string;
  featureField: {
    input: string;
    setInput: (value: string) => void;
    fields: { id: number; key: string }[];
    handleAddFeatures: () => void;
    remove: () => void;
  };
  styles: any;
}

const KeyField: FC<IFeature> = ({ title, featureField, styles }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (featureField.input.trim() !== "" || featureField.fields.length > 0) {
      setIsEditing(true);
    }
  }, [featureField.input, featureField.fields]);

  const handleAddClick = () => {
    setIsEditing(true);
    featureField.handleAddFeatures();
  };

  return (
    <div className={styles.plansKeys}>
      {isEditing && (
        <>
          <textarea
            value={featureField.input}
            onChange={(e) => featureField.setInput(e.target.value)}
            placeholder={`Введите ключи, каждый с новой строки`}
            className={s.textarea}
            style={{ marginTop: "20px" }}
          />
          {featureField.fields && (
            <div className={styles.features}>
              {featureField.fields.map((field: any) => (
                <span className={styles.span} key={field.id}>
                  {field.key}{" "}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default KeyField;
