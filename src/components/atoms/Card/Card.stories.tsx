import Card from './index';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Atoms/Card',
  component: Card,
};

const Template: ComponentStory<typeof Card> = args => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '내용',
};
