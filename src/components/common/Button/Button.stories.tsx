// src/components/common/Button/Button.stories.tsx

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "primary",
        "secondary",
        "tertiary",
        "disabled",
        "outlined",
        "textOnly",
      ],
      description: "버튼의 스타일을 지정합니다.",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "extraLarge"],
      description: "버튼의 크기를 지정합니다.",
    },
    onClick: { action: "clicked" },
    className: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "medium",
    children: "Secondary Button",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "medium",
    children: "Tertiary Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    size: "medium",
    children: "Outlined Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "medium",
    disabled: true,
    children: "Disabled",
  },
};
