import JoditEditor from "jodit-react";

const JoditComponent = ({ form, field, lang }) => {
  return (
    <JoditEditor
      tabIndex={1}
      value={
        lang === "en"
          ? form.initialValues.description?.en
          : form.initialValues.description?.ar
      }
      onChange={(content) => form.setFieldValue(field.name, content)}
    />
  );
};

export default JoditComponent;
