import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default async function Layout({
  children,
}: {
    children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/welcome")
  }

  return(
    <>{children}</>
  )
}
