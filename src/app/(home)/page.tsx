import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <main
        className="flex flex-col justify-center items-center min-h-screen "
        style={{
          backgroundImage: `url(/static/splash.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="relative w-full h-[100vh] flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Manage your appointments</CardDescription>
              </CardContent>
              <CardFooter>
                <a href="/appointments" className="text-blue-500">
                  Go to Appointments
                </a>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Manage your operations</CardDescription>
              </CardContent>
              <CardFooter>
                <a href="/operations" className="text-blue-500">
                  Go to Operations
                </a>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Manage your patients</CardDescription>
              </CardContent>
              <CardFooter>
                <a href="/patients" className="text-blue-500">
                  Go to Patients
                </a>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>View your Analytics</CardDescription>
              </CardContent>
              <CardFooter>
                <a href="/analytics" className="text-blue-500">
                  Go to Analytics
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
