"use client";

import { Button } from "@/src/shared";
import { User } from "lucide-react";
import { useState } from "react";

export function Buttons() {
  const [isAuth, setAuth] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button>
        <User />
        Увійти
      </Button>

      <Button variant="ghost">Зареєструватись</Button>
    </div>
  );
}
