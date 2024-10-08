import Link from "next/link";
import Jumper from "./[locale]/(components)/(atoms)/Jumper/Jumper";
/* import "./[locale]/globals.css";
import "./[locale]/(css-library-utilities)/library-import.css"; */

export default function NotFound() {
  return (
    <div className="flex-center flex-column gap-20px w-full min-h-screen">
      <Jumper />
      <h2>404 Page Not Found</h2>
      <p>Could not find requested page</p>
      <Link className="btn radius-5px p-x-24px p-y-6px" href="/">
        Home
      </Link>
    </div>
  );
}
