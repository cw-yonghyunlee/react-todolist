import Button from './index';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Atoms/Button',
  component: Button,
};

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '버튼',
};
