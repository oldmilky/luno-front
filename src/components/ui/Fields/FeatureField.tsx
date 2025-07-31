import { FC, useEffect, useState } from "react";
import s from "./Fields.module.scss";

interface IFeature {
  title: any;
  featureField: any;
  styles: any;
}

const FeatureField: FC<IFeature> = ({ title, featureField, styles }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (
      featureField.input.trim() !== "" ||
      featureField.inputRu.trim() !== "" ||
      featureField.fields.length > 0
    ) {
      setIsEditing(true);
    }
  }, [featureField.input, featureField.inputRu, featureField.fields]);

  const handleAddClick = () => {
    setIsEditing(true);
    featureField.handleAddFeatures();
  };

  return (
    <div className={styles.plans}>
      <button
        className={styles.planAdd}
        type="button"
        onClick={handleAddClick}
        style={{
          marginBottom: "10px",
        }}
      >
        Добавить {title}
      </button>
      {isEditing && (
        <>
          <textarea
            value={featureField.input}
            onChange={(e) => featureField.setInput(e.target.value)}
            placeholder={`Введите ${title}, каждую с новой строки`}
            className={s.textarea}
            style={{ marginTop: "20px" }}
          />
          {featureField.fields && (
            <div className={styles.features}>
              {featureField.fields.map((field: any) => (
                <span className={styles.span} key={field.id}>
                  {field.buttonEn}{" "}
                </span>
              ))}
            </div>
          )}
          <textarea
            value={featureField.inputRu}
            onChange={(e) => featureField.setInputRu(e.target.value)}
            placeholder={`Введите ${title} на русском, каждую с новой строки`}
            className={s.textarea}
            style={{ marginTop: "20px" }}
          />
          {featureField.fields && (
            <div className={styles.features}>
              {featureField.fields.map((field: any) => (
                <span className={styles.span} key={field.id}>
                  {field.button}{" "}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeatureField;
