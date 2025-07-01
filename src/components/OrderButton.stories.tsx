
import type { Meta, StoryObj } from '@storybook/react';

import OrderButton from './OrderButton';

const meta = {
    component: OrderButton,
    title: 'Components/OrderButton',
    tags: ['autodocs'],
    //👇 Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
} satisfies Meta<typeof OrderButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        groupName: 'Group Name',
        color: 'primary',
        variant: 'contained',
    },
};

/*
export const Pinned: Story = {
    args: {
        orderButton: {
            ...Default.args.OrderButton,
            state: 'TASK_PINNED',
        },
    },
};

export const Archived: Story = {
    args: {
        task: {
            ...Default.args.task,
            state: 'TASK_ARCHIVED',
        },
    },
};*/
