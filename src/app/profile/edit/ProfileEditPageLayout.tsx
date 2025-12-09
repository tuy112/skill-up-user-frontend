// src/app/profile/edit/ProfileEditPageLayout.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import ProfileImageUploader from "@/components/myPage/profile/ProfileImageUploader";
import ProfileImageDefault from "@/assets/images/logoDefaultImg.png";
import InputField from "@/components/common/InputField";
import Input from "@/components/common/Input";
import Dropdown, { DropdownOption } from "@/components/common/Dropdown";
import RadioGroup, { Option } from "@/components/common/RadioGroup";
import { MultiSelectButtonGroup } from "@/components/common/MultiSelectButtonGroup";
import Button from "@/components/common/Button";
import MegaPhoneIcon from "@/assets/icons/MegaPhoneIcon";
import InterestTabBar from "@/components/login/InterestTabBar";
import Checkbox from "@/components/common/Checkbox";
import { useUpdateUserProfile, useUserInterests } from "@/hooks/useUser";
import Skeleton from "@/components/common/Skeleton";
import { UserProfile } from "@/types/user";
import { RoleName, ROLE_NAME } from "@/constants/role";
import Alert from "@/components/common/Alert";

export default function ProfileEditPageLayout({
  initialData,
}: {
  initialData: UserProfile;
}) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(
    ProfileImageDefault.src.toString() || ""
  );
  const [name, setName] = useState<string>(initialData.name);
  const [selectedGender, setSelectedGender] = useState<string>(
    initialData.gender
  );
  const [selectedAge, setSelectedAge] = useState<string>(initialData.age);
  const [selectedJob, setSelectedJob] = useState<string>(initialData.role);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialData.interests
  );
  const [activeTab, setActiveTab] = useState<RoleName>(ROLE_NAME.PLANNING);
  const [isMarketingAgreed, setIsMarketingAgreed] = useState<boolean>(
    initialData.marketingAgreement
  );
  const [currentRoleName, setCurrentRoleName] = useState<RoleName>(
    initialData.role as RoleName
  );
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  // API로 관심사 조회
  const { data: apiInterestData, isLoading: isLoadingInterests } =
    useUserInterests(currentRoleName);

  // 프로필 업데이트 mutation
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateUserProfile();

  const genderOptions: Option[] = [
    { label: "남성", value: "M" },
    { label: "여성", value: "F" },
  ];

  const ageOptions: Option[] = [
    { label: "10대", value: "10대" },
    { label: "20대", value: "20대" },
    { label: "30대", value: "30대" },
    { label: "40대", value: "40대" },
    { label: "50대", value: "50대" },
    { label: "60대 이상", value: "60대 이상" },
  ];

  const jobOptions: Option[] = [
    { label: "기획자", value: "기획자" },
    { label: "디자이너", value: "디자이너" },
    { label: "개발자", value: "개발자" },
    { label: "마케팅", value: "마케팅" },
  ];

  // API 데이터만 사용 (목업 데이터 제거)
  const interestOptions =
    apiInterestData && apiInterestData.length > 0
      ? apiInterestData.map((item: { name: string }) => ({
          label: item.name,
          value: item.name,
        }))
      : [];

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

  const handleTabChange = (tab: string) => {
    const roleName = tab as RoleName;
    setActiveTab(roleName);
    setCurrentRoleName(roleName);
  };

  const toggleAlert = () => {
    setIsAlertOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmCancel = () => {
    router.back();
  };

  const handleSave = () => {
    const userProfile: UserProfile = {
      name,
      profileImageUrl: imageUrl,
      age: selectedAge,
      gender: selectedGender,
      role: selectedJob,
      interests: selectedInterests,
      marketingAgreement: isMarketingAgreed,
    };

    updateProfile(userProfile, {
      onSuccess: () => {
        // 추후 토스트 메시지 추가
        console.log("프로필 업데이트 성공");
      },
      onError: (error) => {
        console.error("프로필 업데이트 실패:", error);
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Text typography="head2_sb_30" color="black" as="h2">
            프로필 설정
          </Text>
          <ProfileImageUploader
            imageUrl={imageUrl}
            onChangeImage={handleChangeImage}
          />
        </div>
        <div className={styles.itemGroup}>
          <div className={styles.item}>
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
                block
                buttonLabel={selectedAge ? selectedAge : "연령대를 선택하세요"}
                spaceBetween
              />
            </InputField>
          </div>
          <div className={styles.item}>
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
                block
                buttonLabel={selectedJob ? selectedJob : "직무를 선택하세요"}
                spaceBetween
              />
            </InputField>
          </div>
          <div className={styles.interestSection}>
            <div className={styles.fieldWrapper}>
              <div className={styles.fieldLabel}>
                <Text typography="label3_m_14" color="black" as="span">
                  관심사
                </Text>
                <Text typography="label4_m_12" color="neutral-70" as="span">
                  주요 관심사를 선택해주세요
                </Text>
              </div>
              <InterestTabBar
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            {isLoadingInterests ? (
              <div className={styles.skeletonWrapper}>
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
              </div>
            ) : (
              <MultiSelectButtonGroup
                options={interestOptions}
                selectedValues={selectedInterests}
                onSelect={handleChangeInterest}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div
          className={`${styles.marketingSection} ${
            isMarketingAgreed ? styles.active : ""
          }`}
        >
          <div className={styles.marketingText}>
            <div className={styles.marketingTitle}>
              <MegaPhoneIcon
                color={isMarketingAgreed ? "var(--Primary-strong)" : "#474747"}
              />
              <Text typography="sub3_m_16" color="black">
                마케팅 수신 동의
              </Text>
            </div>

            <Text typography="body2_r_14" color="neutral-30">
              서비스 소식과 이벤트, 맞춤형 혜택을 빠르게 받아보세요!
            </Text>
          </div>
          <Checkbox
            checked={isMarketingAgreed}
            onChange={setIsMarketingAgreed}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          variant="outlined"
          size="extraLarge"
          className={styles.footerButton}
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="extraLarge"
          className={styles.footerButton}
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? "저장 중..." : "저장"}
        </Button>
      </div>

      <Alert
        isOpen={isAlertOpen}
        toggle={toggleAlert}
        title="변경사항을 저장하지 않고 나갈까요?"
        message={
          <>
            지금까지 수정한 내용이 모두 삭제됩니다. <br /> 정말
            취소하시겠습니까?
          </>
        }
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}
