export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // 초 단위 차이 계산
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 1분 미만
  if (diffInSeconds < 60) {
    return diffInSeconds <= 1 ? "방금 전" : `${diffInSeconds}초 전`;
  }

  // 1시간 미만
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  // 하루 미만
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 한달 미만
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  return date.toLocaleDateString("ko-KR");
}
