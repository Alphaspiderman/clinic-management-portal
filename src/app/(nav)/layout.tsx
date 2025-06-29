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
      <div className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-40 backdrop-blur-md">
        <Navbar entries={entries} navbarColor="transparent" />
      </div>
      <div>
        <main
          className="flex flex-col justify-center items-center min-h-screen"
          style={{
            backgroundImage: `url(/static/splash.jpg)`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          <div className="relative w-full min-h-screen flex flex-col bg-black bg-opacity-50 overflow-y-auto pt-16">
            {children}
          </div>
        </main>
      </div>
    </section>
  );
}
