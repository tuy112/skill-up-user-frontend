// src/app/profile/edit/ProfileEditPageLayout.tsx

"use client";

import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";
import ProfileImageUploader from "@/components/myPage/profile/ProfileImageUploader";
import InputField from "@/components/common/InputField";
import Input from "@/components/common/Input";
import Dropdown from "@/components/common/Dropdown";
import RadioGroup from "@/components/common/RadioGroup";
import { MultiSelectButtonGroup } from "@/components/common/MultiSelectButtonGroup";
import Button from "@/components/common/Button";
import MegaPhoneIcon from "@/assets/icons/MegaPhoneIcon";
import InterestTabBar from "@/components/login/InterestTabBar";
import Checkbox from "@/components/common/Checkbox";
import Skeleton from "@/components/common/Skeleton";
import { UserProfile } from "@/types/user";
import Alert from "@/components/common/Alert";
import { useProfileEditForm } from "@/hooks/useProfileEditForm";
import {
  GENDER_OPTIONS,
  AGE_OPTIONS,
  JOB_OPTIONS,
} from "@/constants/profileFormOptions";

export default function ProfileEditPageLayout({
  initialData,
}: {
  initialData: UserProfile;
}) {
  const {
    imageUrl,
    name,
    selectedGender,
    selectedAge,
    selectedJob,
    selectedInterests,
    activeTab,
    isMarketingAgreed,
    isAlertOpen,
    isLoadingInterests,
    isUpdating,
    interestOptions,
    handleChangeImage,
    handleChangeName,
    handleChangeAge,
    handleChangeGender,
    handleChangeJob,
    handleChangeInterest,
    handleTabChange,
    toggleAlert,
    handleCancel,
    handleConfirmCancel,
    handleSave,
    setIsMarketingAgreed,
  } = useProfileEditForm(initialData);

  return (
    <Flex direction="column" gap={2.5} className={styles.container}>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Flex direction="column" gap={1.25} className={styles.header}>
          <Text typography="head2_sb_30" color="black" as="h2">
            프로필 설정
          </Text>
          <ProfileImageUploader
            imageUrl={imageUrl}
            onChangeImage={handleChangeImage}
          />
        </Flex>
        <Flex direction="column" gap={1.5} className={styles.itemGroup}>
          <Flex gap={1} align="center">
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
                options={AGE_OPTIONS}
                selected={{ label: selectedAge, value: selectedAge }}
                onSelect={handleChangeAge}
                block
                buttonLabel={selectedAge ? selectedAge : "연령대를 선택하세요"}
                spaceBetween
              />
            </InputField>
          </Flex>
          <Flex gap={1} align="center">
            <InputField label="성별">
              <RadioGroup
                options={GENDER_OPTIONS}
                selectedValue={selectedGender}
                onChange={handleChangeGender}
              />
            </InputField>
            <InputField label="직무">
              <Dropdown
                options={JOB_OPTIONS}
                selected={{ label: selectedJob, value: selectedJob }}
                onSelect={handleChangeJob}
                block
                buttonLabel={selectedJob ? selectedJob : "직무를 선택하세요"}
                spaceBetween
              />
            </InputField>
          </Flex>
          <Flex direction="column" gap={1}>
            <Flex justify="space-between" align="center">
              <Flex direction="column" gap={0.125}>
                <Text typography="label3_m_14" color="black" as="span">
                  관심사
                </Text>
                <Text typography="label4_m_12" color="neutral-70" as="span">
                  주요 관심사를 선택해주세요
                </Text>
              </Flex>
              <InterestTabBar
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </Flex>
            {isLoadingInterests ? (
              <Flex wrap="wrap" gap={0.5}>
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
              </Flex>
            ) : (
              <MultiSelectButtonGroup
                options={interestOptions}
                selectedValues={selectedInterests}
                onSelect={handleChangeInterest}
              />
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap={2.5}>
        <Flex
          justify="space-between"
          align="center"
          className={`${styles.marketingSection} ${
            isMarketingAgreed ? styles.active : ""
          }`}
        >
          <Flex direction="column" gap={0.25}>
            <Flex align="center" gap={0.375}>
              <MegaPhoneIcon
                color={isMarketingAgreed ? "var(--Primary-strong)" : "#474747"}
              />
              <Text typography="sub3_m_16" color="black">
                마케팅 수신 동의
              </Text>
            </Flex>

            <Text typography="body2_r_14" color="neutral-30">
              서비스 소식과 이벤트, 맞춤형 혜택을 빠르게 받아보세요!
            </Text>
          </Flex>
          <Checkbox
            checked={isMarketingAgreed}
            onChange={setIsMarketingAgreed}
          />
        </Flex>
      </Flex>
      <Flex justify="flex-end" gap={0.5} style={{ width: "100%" }}>
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
      </Flex>

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
    </Flex>
  );
}
