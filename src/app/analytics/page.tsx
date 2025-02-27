export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
      const param = await params;
    return (
      <>
        <h1>Show Analytics</h1>
      </>
    );
  }
  