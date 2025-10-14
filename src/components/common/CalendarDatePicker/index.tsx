// src/components/common/CalendarDatePicker/index.tsx

import styles from "./styles.module.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "react-day-picker/locale";

interface CalendarDatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export default function CalendarDatePicker({
  selectedDate,
  onDateChange,
}: CalendarDatePickerProps) {
  return (
    <div className={styles.calendarDatePicker}>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onDateChange}
        locale={ko}
        navLayout="around"
        required
        modifiersClassNames={{
          selected: styles.rdpSelected,
          today: styles.rdpToday,
        }}
        classNames={{
          weekday: styles.rdpWeekday,
          day: styles.rdpDay,
        }}
      />
    </div>
  );
}
