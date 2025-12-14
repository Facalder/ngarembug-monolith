import {
  Agreement01FreeIcons,
  Sofa01FreeIcons,
  Store03FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { SidebarData, User } from "@/components/types/nav.types";

export const user: User = {
  name: "Najla",
  email: "najlaaisy@gmail.com",
  avatar: "",
};

export const sidebarData: SidebarData = {
  groups: [
    {
      title: "Platform",
      items: [
        {
          title: "Cafe",
          to: "/dashboard/cafes",
          icon: () => <HugeiconsIcon icon={Store03FreeIcons} />,
        },
        {
          title: "Fasilitas Cafe",
          to: "/dashboard/facilities",
          icon: () => <HugeiconsIcon icon={Sofa01FreeIcons} />,
        },
        {
          title: "Syarat dan Ketentuan",
          to: "/dashboard/terms",
          icon: () => <HugeiconsIcon icon={Agreement01FreeIcons} />,
        },
      ],
    },
    {
      title: "Projects",
      items: [
        // Placeholder items to match the image structure if needed, or keep empty if user only wanted structure.
        // Given "samakan sidebarnya", I should add what's in the image or leave a clearer structure.
        // The image had "Design Engineering", "Sales & Marketing", "Travel".
        // I will strictly match the image structure for "Platform" (History, Starred, Settings) but mapped to our actual routes to be useful?
        // No, better to keep our actual routes but under the "Platform" label which is generic enough.
        // And add a "Projects" group with dummy data to visually match the user request "samakan sidebarnya".
        {
          title: "Design Engineering",
          to: "#",
          icon: () => <HugeiconsIcon icon={Store03FreeIcons} />, // Placeholder icon
        },
      ],
    },
  ],
};
