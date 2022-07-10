import { BarChartIcon, ClockIcon, StarIcon, ThumbDownIcon } from "../icons";
import { Dropdown, MobileDropdownIcon, MobileDropdownMenu } from ".";
import { useState } from "react";

export default function SortComments({ params, setParams }) {
  const [active, setActive] = useState("Most Recent");

  function handleSort(category, index) {
    console.log(category, index);
    setActive(category);
    setParams({
      ...params,
      sort_by: index < 2 ? "created_at" : index < 4 ? "votes" : "comment_count",
      order: index % 2 === 0 ? "DESC" : "ASC",
      p: 1,
    });
  }

  return (
    <div className="sort-comments">
      <Dropdown
        icon={
          <MobileDropdownIcon
            active={active}
            icons={{
              most_recent: <StarIcon />,
              oldest: <ClockIcon />,
              most_votes: <BarChartIcon />,
              fewest_votes: <ThumbDownIcon />,
            }}
          />
        }
      >
        <MobileDropdownMenu
          active={active}
          categories={["Most Recent", "Oldest", "Most Votes", "Fewest Votes"]}
          icons={{
            most_recent: <StarIcon />,
            oldest: <ClockIcon />,
            most_votes: <BarChartIcon />,
            fewest_votes: <ThumbDownIcon />,
          }}
          fn={handleSort}
        />
      </Dropdown>
    </div>
  );
}
