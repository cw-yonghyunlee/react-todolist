import CheckBox from './index';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Atoms/CheckBox',
  component: CheckBox,
};

const Template: ComponentStory<typeof CheckBox> = args => (
  <CheckBox {...args} />
);
export const Default = Template.bind({});
