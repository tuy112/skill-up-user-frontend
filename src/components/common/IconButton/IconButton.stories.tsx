// src/components/common/IconButton/IconButton.stories.tsx

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "./index";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "disabled", "opacity"],
      description: "버튼의 스타일을 지정합니다.",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "extraLarge"],
      description: "버튼의 크기를 지정합니다.",
    },
    disabled: { control: { type: "boolean" } },
    onClick: { action: "clicked" },
    className: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    icon: <BookmarkIcon isBookmarked={false} />,
    variant: "primary",
    size: "medium",
  },
};
export const Opacity: Story = {
  args: {
    icon: <BookmarkIcon isBookmarked={false} />,
    variant: "opacity",
    size: "medium",
  },
};
export const Secondary: Story = {
  args: {
    icon: <BookmarkIcon isBookmarked={false} />,
    variant: "secondary",
    size: "medium",
  },
};
export const Disabled: Story = {
  args: {
    icon: <BookmarkIcon isBookmarked={false} />,
    variant: "disabled",
    size: "medium",
  },
};
