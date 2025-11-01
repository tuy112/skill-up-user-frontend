// src/app/my/profile/edit/ProfileEditPageLayout.tsx

"use client";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import ProfileImageUploader from "@/components/myPage/profile/ProfileImageUploader";
import { useState } from "react";
import ProfileImageDefault from "@/assets/images/logoDefaultImg.png";
import InputField from "@/components/common/InputField";
import Input from "@/components/common/Input";
import Dropdown, { DropdownOption } from "@/components/common/Dropdown";
import RadioGroup, { Option } from "@/components/common/RadioGroup";
import { MultiSelectButtonGroup } from "@/components/common/MultiSelectButtonGroup";
import Button from "@/components/common/Button";

export default function ProfileEditPageLayout() {
  const [imageUrl, setImageUrl] = useState<string>(
    ProfileImageDefault.src.toString() || ""
  );
  const [name, setName] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const genderOptions: Option[] = [
    { label: "남성", value: "male" },
    { label: "여성", value: "female" },
  ];

  const ageOptions: Option[] = [
    { label: "10대", value: "10대" },
    { label: "20대", value: "20대" },
    { label: "30대", value: "30대" },
    { label: "40대", value: "40대" },
    { label: "50대", value: "50대" },
    { label: "60대이상", value: "60대이상" },
  ];

  const jobOptions: Option[] = [
    { label: "기획자", value: "pm" },
    { label: "디자이너", value: "design" },
    { label: "개발자", value: "dev" },
    { label: "기타", value: "etc" },
  ];

  const interestOptions: Option[] = [
    { label: "웹 개발", value: "web" },
    { label: "모바일 개발", value: "mobile" },
    { label: "AI", value: "ai" },
    { label: "데이터 분석", value: "data" },
    { label: "기타", value: "etc" },
  ];

  const handleChangeImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAge = (value: DropdownOption) => {
    setSelectedAge(value.label);
  };

  const handleChangeGender = (value: string) => {
    setSelectedGender(value);
  };

  const handleChangeJob = (value: DropdownOption) => {
    setSelectedJob(value.label);
  };

  const handleChangeInterest = (value: string[]) => {
    setSelectedInterests(value);
  };

  return (
    <div className={styles.profileEditPageLayout}>
      <div className={styles.profileEditPageLayoutHeader}>
        <Text typography="head2_sb_30" color="black" as="h2">
          프로필 설정
        </Text>
        <div className={styles.profileEditPageLayoutHeaderRight}>
          <ProfileImageUploader
            imageUrl={imageUrl}
            onChangeImage={handleChangeImage}
          />
        </div>
      </div>
      <div className={styles.profileEditPageLayoutContent}>
        <div className={styles.profileEditPageLayoutContentItem}>
          <InputField label="이름">
            <Input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={handleChangeName}
            />
          </InputField>
          <InputField label="연령">
            <Dropdown
              options={ageOptions}
              selected={{ label: selectedAge, value: selectedAge }}
              onSelect={handleChangeAge}
              block={true}
              buttonLabel={selectedAge ? selectedAge : "연령대를 선택하세요"}
            />
          </InputField>
        </div>
        <div className={styles.profileEditPageLayoutContentItem}>
          <InputField label="성별">
            <RadioGroup
              options={genderOptions}
              selectedValue={selectedGender}
              onChange={handleChangeGender}
            />
          </InputField>
          <InputField label="직무">
            <Dropdown
              options={jobOptions}
              selected={{ label: selectedJob, value: selectedJob }}
              onSelect={handleChangeJob}
              block={true}
              buttonLabel={selectedJob ? selectedJob : "직무를 선택하세요"}
            />
          </InputField>
        </div>
        <InputField label="관심사" description="주요 관심사를 선택해주세요">
          <MultiSelectButtonGroup
            options={interestOptions}
            selectedValues={selectedInterests}
            onSelect={handleChangeInterest}
          />
        </InputField>
      </div>
      <div className={styles.profileEditPageLayoutFooter}>
        <Button
          variant="outlined"
          size="extraLarge"
          className={styles.profileEditPageLayoutFooterCancelButton}
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="extraLarge"
          className={styles.profileEditPageLayoutFooterSaveButton}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
