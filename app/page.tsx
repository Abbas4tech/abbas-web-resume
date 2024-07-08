import Container from "./layout/Container";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
