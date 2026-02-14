import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <div>epigrams/{id}</div>;
}
