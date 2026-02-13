export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** Format: int32 */
    Id: number;
    /** @example 닉네임 */
    Nickname: string;
    /**
     * Format: url
     * @example https://example.com/...
     */
    UrlType: string;
    User: {
      image: components["schemas"]["UrlType"] | null;
      /** Format: date-time */
      updatedAt: string;
      /** Format: date-time */
      createdAt: string;
      teamId: string;
      nickname: components["schemas"]["Nickname"];
      id: components["schemas"]["Id"];
    };
    UpdateUserBody: {
      image?: components["schemas"]["UrlType"];
      nickname?: components["schemas"]["Nickname"];
    };
    CommentContent: string;
    CommentType: {
      /** Format: double */
      epigramId: number;
      writer: {
        image: string | null;
        nickname: string;
        /** Format: double */
        id: number;
      };
      /** Format: date-time */
      updatedAt: string;
      /** Format: date-time */
      createdAt: string;
      isPrivate: boolean;
      content: components["schemas"]["CommentContent"];
      /** Format: double */
      id: number;
    };
    CursorBasedPaginationResponse_CommentType_: {
      /** Format: double */
      totalCount: number;
      /** Format: double */
      nextCursor: number | null;
      list: components["schemas"]["CommentType"][];
    };
    /** @enum {string} */
    "_36_Enums.OauthProvider": "GOOGLE" | "NAVER" | "KAKAO";
    OauthProvider: components["schemas"]["_36_Enums.OauthProvider"];
    /**
     * @description 간편 로그인을 위한 인증 키 입니다.
     *
     *     * Google 의 경우에는 "클라이언트 id" 입니다.
     *     * Kakao 의 경우에는 "REST API 키" 입니다.
     *     * Naver 의 경우에는 "Client ID" 입니다.
     *
     *     실습을 위해 발급받은 키를 등록해주세요. 실제 서비스에서 사용 하는 키는 등록하시면 안됩니다.
     */
    AppKey: string;
    /**
     * @description 간편 로그인을 위한 비밀 키 입니다.
     *
     *     * Google 의 경우에는 필요하지 않습니다.
     *     * Kakao 의 경우에는 필요하지 않습니다.
     *     * Naver 의 경우에는 "Client Secret" 입니다.
     */
    AppSecret: string;
    OauthApp: {
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
      appSecret: components["schemas"]["AppSecret"] | null;
      appKey: components["schemas"]["AppKey"];
      provider: components["schemas"]["OauthProvider"];
      teamId: string;
      id: components["schemas"]["Id"];
    };
    UpsertOauthAppRequestBody: {
      appSecret?: components["schemas"]["AppSecret"];
      appKey: components["schemas"]["AppKey"];
      provider: components["schemas"]["OauthProvider"];
    };
    /** @example 에피그램 내용입니다. */
    EpigramContent: string;
    /** @example 저자 */
    EpigramAuthor: string;
    EpigramReferenceTitle: string;
    /** @example 태그 */
    TagName: string;
    EpigramListType: {
      /** Format: double */
      likeCount: number;
      tags: {
        name: components["schemas"]["TagName"];
        id: components["schemas"]["Id"];
      }[];
      writerId: components["schemas"]["Id"];
      referenceUrl: components["schemas"]["UrlType"] | null;
      referenceTitle: components["schemas"]["EpigramReferenceTitle"] | null;
      author: components["schemas"]["EpigramAuthor"];
      content: components["schemas"]["EpigramContent"];
      id: components["schemas"]["Id"];
    };
    CreateEpigramBody: {
      tags: components["schemas"]["TagName"][];
      referenceUrl?: components["schemas"]["UrlType"];
      referenceTitle?: components["schemas"]["EpigramReferenceTitle"];
      author: components["schemas"]["EpigramAuthor"];
      content: components["schemas"]["EpigramContent"];
    };
    CursorBasedPaginationResponse_EpigramListType_: {
      /** Format: double */
      totalCount: number;
      /** Format: double */
      nextCursor: number | null;
      list: components["schemas"]["EpigramListType"][];
    };
    EpigramDetailType: components["schemas"]["EpigramListType"] & {
      isLiked?: boolean;
    };
    UpdateEpigramBody: {
      tags?: components["schemas"]["TagName"][];
      referenceUrl?: components["schemas"]["UrlType"];
      referenceTitle?: components["schemas"]["EpigramReferenceTitle"];
      author?: components["schemas"]["EpigramAuthor"];
      content?: components["schemas"]["EpigramContent"];
    };
    /** @enum {string} */
    "_36_Enums.Emotion": "MOVED" | "HAPPY" | "WORRIED" | "SAD" | "ANGRY";
    Emotion: components["schemas"]["_36_Enums.Emotion"];
    EmotionLogType: {
      /** Format: date-time */
      createdAt: string;
      emotion: components["schemas"]["Emotion"];
      /** Format: double */
      userId: number;
      /** Format: double */
      id: number;
    };
    UpsertEmotionLogBody: {
      emotion: components["schemas"]["Emotion"];
    };
    /**
     * Format: double
     * @example 2024
     */
    Year: number;
    /**
     * Format: double
     * @example 1
     */
    Month: number;
    CreateCommentBody: {
      /** Format: double */
      epigramId: number;
      isPrivate: boolean;
      content: components["schemas"]["CommentContent"];
    };
    UpdateCommentBody: {
      isPrivate?: boolean;
      content?: components["schemas"]["CommentContent"];
    };
    /**
     * Format: email
     * @example example@email.com
     */
    Email: string;
    SignUpResponse: {
      refreshToken: string;
      accessToken: string;
      user: components["schemas"]["User"] & {
        email: components["schemas"]["Email"];
      };
    };
    /** @example password */
    Password: string;
    SignUpRequestBody: {
      image?: components["schemas"]["UrlType"];
      passwordConfirmation: components["schemas"]["Password"];
      password: components["schemas"]["Password"];
      nickname: components["schemas"]["Nickname"];
      email: components["schemas"]["Email"];
    };
    SignInResponse: {
      refreshToken: string;
      accessToken: string;
      user: components["schemas"]["User"] & {
        email: components["schemas"]["Email"];
      };
    };
    SignInRequestBody: {
      password: components["schemas"]["Password"];
      email: components["schemas"]["Email"];
    };
    /**
     * @description 간편 로그인 과정을 통해 발급받은 토큰입니다.<br />
     *
     *     * Google 의 경우에는 <b>Google Id 토큰</b>(JWT) 입니다.
     *     * Kakao 의 경우에는 <b>인가 코드</b> 입니다.
     *     * Naver 의 경우에는 <b>code</b> 입니다.
     */
    OauthToken: string;
    SignInWithOauthRequestBody: {
      /**
       * @description Naver 의 경우에는 필수입니다.<br/>
       *     code를 얻을 때 사용하였던 state 값을 그대로 사용합니다.
       */
      state?: string;
      /**
       * @description Kakao 의 경우에는 필수입니다.<br/>
       *     인가 코드를 얻을 때 사용하였던 redirect_uri 값을 그대로 사용합니다.
       * @example http://localhost:3000/oauth/kakao
       */
      redirectUri?: string;
      token: components["schemas"]["OauthToken"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
