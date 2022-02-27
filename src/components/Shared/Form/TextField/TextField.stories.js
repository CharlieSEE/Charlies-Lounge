import TextField from "./TextField";

export default {
  title: "Shared/Form/TextField",
  component: TextField,
};

const Template = (args) => <TextField {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: "Text Field",
  type: "text",
};
export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Text Field",
  type: "text",
  disabled: true,
};
