

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="container mx-auto">{children}</main>
    </div>
  )
}