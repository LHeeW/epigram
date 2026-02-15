"use client";

import { useEffect, useMemo, useState } from "react";
import type { PostEpigramsRequest } from "@/apis/Epigram/epigram-api-types";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import styles from "./add-epigram.module.css";

interface AddEpigramProps {
  initialData?: PostEpigramsRequest;
  onSubmit: (data: FormData) => void;
}

const AUTHOR_OPTIONS = [
  { id: "custom", label: "직접 입력" },
  { id: "unknown", label: "알 수 없음" },
  { id: "self", label: "본인" },
];

export default function AddEpigram({ initialData, onSubmit }: AddEpigramProps) {
  const { data: userData } = useGetUserMeQuery();
  const myNickname = userData?.nickname || "";

  // 초기 타입 결정 로직
  const getInitialAuthorType = useMemo(() => {
    if (!initialData) return "custom";
    if (initialData.author === "알 수 없음") return "unknown";
    if (initialData.author === myNickname) return "self";
    return "custom";
  }, [initialData, myNickname]);

  // 상태 관리
  const [content, setContent] = useState(initialData?.content || "");
  const [authorType, setAuthorType] = useState(getInitialAuthorType);
  const [customAuthor, setCustomAuthor] = useState(
    getInitialAuthorType === "custom" ? initialData?.author || "" : "",
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  // 수정 모드 시 데이터 동기화
  useEffect(() => {
    if (initialData) {
      setContent(initialData.content);
      const type =
        initialData.author === "알 수 없음"
          ? "unknown"
          : initialData.author === myNickname
            ? "self"
            : "custom";
      setAuthorType(type);
      if (type === "custom") setCustomAuthor(initialData.author);
      setTags(initialData.tags || []);
    }
  }, [initialData, myNickname]);

  // 최종 저자 값 계산
  const currentAuthor = useMemo(() => {
    if (authorType === "unknown") return "알 수 없음";
    if (authorType === "self") return myNickname;
    return customAuthor;
  }, [authorType, myNickname, customAuthor]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const trimmedTag = tagInput.trim();
      if (tags.includes(trimmedTag)) return alert("중복된 태그 입니다.");
      if (tags.length >= 3) return alert("태그는 최대 3개까지 가능합니다.");
      if (trimmedTag.length > 10)
        return alert("태그는 최대 10자까지 가능합니다.");
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) return alert("내용을 입력해주세요.");
    if (content.length > 500) return alert("500자를 초과할 수 없습니다.");
    if (!currentAuthor.trim()) return alert("저자를 입력하거나 선택해주세요.");

    const formData = new FormData(e.currentTarget);

    formData.set("content", content);
    formData.set("author", currentAuthor);

    formData.delete("tags");
    tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    onSubmit(formData);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      {/* 내용 섹션 */}
      <div className={styles.content_container}>
        <label className={styles.content_label} htmlFor="content_textarea">
          내용 <span className={styles.content_label_star}>*</span>
        </label>
        <textarea
          className={`${styles.content} ${content.length > 500 ? styles.error_border : ""}`}
          id="content_textarea"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="500자 이내로 입력해주세요."
        />
        <div className={styles.helper_text}>
          <span className={content.length > 500 ? styles.error_text : ""}>
            {content.length}/500
          </span>
          {content.length > 500 && (
            <p className={styles.error_msg}>500자를 초과할 수 없습니다.</p>
          )}
        </div>
      </div>

      {/* 저자 섹션 */}
      <div className={styles.author_container}>
        <label htmlFor="author_title" className={styles.author_label}>
          저자 <span className={styles.author_label_star}>*</span>
        </label>
        <div className={styles.radio_btn_list_container}>
          {AUTHOR_OPTIONS.map((option) => (
            <div className={styles.radio_btn_container} key={option.id}>
              <input
                className={styles.radio_btn_input}
                type="radio"
                name="authorType"
                id={`radio_${option.id}`}
                value={option.id}
                checked={authorType === option.id}
                onChange={(e) => setAuthorType(e.target.value)}
              />
              <label
                className={styles.radio_btn_label}
                htmlFor={`radio_${option.id}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <input
          className={styles.author_input}
          type="text"
          id="author_name"
          name="author"
          placeholder="저자 이름 입력"
          value={currentAuthor}
          readOnly={authorType !== "custom"}
          onChange={(e) => setCustomAuthor(e.target.value)}
        />
      </div>

      {/* 출처 섹션 */}
      <div className={styles.reference_container}>
        <label className={styles.reference_label} htmlFor="ref_title">
          출처
        </label>
        <input
          className={styles.reference_title_input}
          type="text"
          id="ref_title"
          name="referenceTitle"
          placeholder="출처 제목 입력"
          defaultValue={initialData?.referenceTitle}
        />
        <label
          className={styles.reference_label}
          htmlFor="ref_url"
          style={{ display: "none" }}
        >
          출처 URL
        </label>
        <input
          className={styles.reference_url_input}
          type="text"
          id="ref_url"
          name="referenceUrl"
          placeholder="URL (ex. https://www.website.com)"
          defaultValue={initialData?.referenceUrl}
        />
      </div>

      {/* 태그 섹션 */}
      <div className={styles.tag_container}>
        <label className={styles.tag_label} htmlFor="tag_input">
          태그
        </label>
        <input
          className={styles.tag_input}
          type="text"
          id="tag_input"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="태그 작성(최대 10자), 3개까지 가능"
          disabled={tags.length >= 3}
        />
        <div className={styles.tag_list}>
          {tags.map((tag, index) => (
            <span key={`${tag}-${index + 0}`} className={styles.tag_chip}>
              {tag}
              <button
                type="button"
                className={styles.tag_remove_btn}
                onClick={() => removeTag(index)}
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        className={styles.submit_btn}
        type="submit"
        disabled={content.length > 500}
      >
        {initialData ? "수정 완료" : "작성 완료"}
      </button>
    </form>
  );
}
