"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import DefaultProfile from "@/../public/images/user.webp";
import { logout } from "@/actions/logout.action";
import { usePostImageUploadMutation } from "@/hooks/TanstackQuery/Mutation/use-image-mutation";
import { usePatchUserMeMutation } from "@/hooks/TanstackQuery/Mutation/use-user-mutation";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import { userKeys } from "@/hooks/TanstackQuery/query-keys";
import styles from "./profile-image.module.css";

export default function ProfileImage() {
  const router = useRouter();
  const { data: userData } = useGetUserMeQuery();
  const queryClient = useQueryClient();
  const { mutate: uploadImage, isPending: isUploading } =
    usePostImageUploadMutation();
  const { mutate: patchUserMe, isPending: isPatching } =
    usePatchUserMeMutation();

  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    uploadImage(formData, {
      onSuccess: (data) => {
        patchUserMe(
          { image: data.url },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: userKeys.me() });
              alert("프로필 이미지가 변경되었습니다.");
            },
          },
        );
      },
      onError: () => alert("이미지 업로드에 실패했습니다."),
    });
  };

  const handleLogout = async () => {
    await logout();
    queryClient.clear();

    router.refresh();
    router.push("/");
  };

  if (!isMount) {
    return <div className={styles.container}>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
        <label htmlFor="profile-upload" className={styles.label_container}>
          <div className={styles.image_wrapper}>
            {(isUploading || isPatching) && (
              <div className={styles.loading_overlay}>처리 중...</div>
            )}
            <Image
              src={userData?.image || DefaultProfile}
              alt="Profile"
              fill
              className={
                userData?.image ? styles.preview_image : styles.default_image
              }
            />
          </div>
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
      </div>
      <h5 className={styles.nickname}>{userData?.nickname}</h5>
      <button className={styles.logout} type="button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
