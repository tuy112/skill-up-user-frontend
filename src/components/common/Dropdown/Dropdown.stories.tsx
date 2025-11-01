// src/components/common/Dropdown/Dropdown.stories.tsx

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Dropdown, { DropdownOption } from "./index";
import { useState } from "react";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: { control: { type: "object" } },
    selected: { control: { type: "object" } },
    onSelect: { action: "selected" },
    buttonLabel: { control: { type: "text" } },
    className: { control: { type: "text" } },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
];

// Interactive story with working state
export const Interactive: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<DropdownOption>(options[0]);

    return (
      <Dropdown
        options={options}
        selected={selected}
        onSelect={setSelected}
        buttonLabel="Select an option"
      />
    );
  },
};

// Default story with static props
export const Default: Story = {
  args: {
    options: options,
    selected: options[0],
    onSelect: () => {},
    buttonLabel: "Select an option",
    className: "",
  },
};
