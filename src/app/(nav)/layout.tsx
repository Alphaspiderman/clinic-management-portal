import { Navbar } from "@/components/custom/navbar";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const entries = [
    { name: "Home", href: "/" },
    { name: "Appointments", href: "/appointments" },
    { name: "Operations", href: "/operations" },
    { name: "Patients", href: "/patients" },
    { name: "Analytics", href: "/analytics" },
  ];

  return (
    <section>
      <Navbar entries={entries} />
      {children}
    </section>
  );
}
