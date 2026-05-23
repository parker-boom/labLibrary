import Link from "next/link";
import { PixelIcon } from "@/components/PixelIcon";

export default function NotFound() {
  return (
    <section className="not-found">
      <PixelIcon size="xl" sprite="toolbox" />
      <p className="micro-label">Missing cartridge</p>
      <h1>That shelf is not in the cabinet.</h1>
      <Link className="button" href="/">
        Return to Library
      </Link>
    </section>
  );
}
