import { Button, ButtonGroup } from "@heroui/button";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

export default function Home() {
  return (
    <div className="grid space-y-2 place-items-center">
      <p>Hello~~</p>
      <Image alt="test" src="test.jpg" width={100} />
      <Button color="primary" variant="flat">Example button</Button>
      <Link href="/game">Game view</Link>
      <Link href="/deckeditor">Deck editor view</Link>
    </div>
  );
}
