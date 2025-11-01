// src/components/common/Text/Text.stories.tsx

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text from "./index";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    typography: {
      control: { type: "select" },
      options: [
        "head1_b_42",
        "head1_m_42",
        "head2_sb_30",
        "head3_m_24",
        "head4_sb_20",
        "sub1_m_20",
        "sub2_m_18",
        "sub3_m_16",
        "body1_r_16",
        "body2_r_14",
        "label1_r_18",
        "label2_m_16",
        "label3_m_14",
        "label4_r_12",
      ],
      description: "텍스트의 타입을 지정합니다.",
    },
    color: {
      control: { type: "select" },
      options: [
        "white",
        "black",
        "neutral-5",
        "neutral-10",
        "neutral-15",
        "neutral-20",
        "neutral-30",
        "neutral-40",
        "neutral-50",
        "neutral-60",
        "neutral-70",
        "neutral-80",
        "neutral-90",
        "neutral-95",
        "neutral-99",
        "line-normal",
        "line-neutral",
        "primary-light",
        "primary-strong",
        "primary-normal",
        "primary-extra-light",
        "fill-strong",
        "error-normal",
      ],
      description: "텍스트의 색상을 지정합니다.",
    },
    className: { control: { type: "text" } },
    children: { control: { type: "text" } },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    typography: "body1_r_16",
    children: "Default Text",
  },
};
