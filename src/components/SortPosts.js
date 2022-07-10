import { BarChartIcon, MessageIcon, StarIcon } from "../icons";
import { Dropdown, MobileDropdownIcon, MobileDropdownMenu } from ".";
import { useParams } from "../contexts";
import { useState } from "react";

export default function SortPosts() {
  const [active, setActive] = useState("New");
  const { params, setParams } = useParams();

  function handleSort(category, index) {
    setActive(category);
    setParams({
      ...params,
      sort_by:
        index === 0 ? "created_at" : index === 1 ? "votes" : "comment_count",
      p: 1,
    });
  }

  return (
    <div className="sort-posts">
      <Dropdown
        icon={
          <MobileDropdownIcon
            active={active}
            icons={{
              new: <StarIcon />,
              popular: <BarChartIcon />,
              most_comments: <MessageIcon />,
            }}
          />
        }
      >
        <MobileDropdownMenu
          active={active}
          categories={["New", "Popular", "Most Comments"]}
          icons={{
            new: <StarIcon />,
            popular: <BarChartIcon />,
            most_comments: <MessageIcon />,
          }}
          fn={handleSort}
        />
      </Dropdown>
    </div>
  );
}
