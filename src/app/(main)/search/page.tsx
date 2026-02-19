import RecentSearches from "./_components/RecentSearches/recent-searches";
import SearchEpigramList from "./_components/SearchEpigrams/search-epigram-list";

interface PageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return (
    <>
      <RecentSearches />
      <SearchEpigramList q={q} />
    </>
  );
}
