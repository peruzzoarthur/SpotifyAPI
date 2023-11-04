import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface ShowAllButtonProps {
  url: string;
}

export const ShowAllButton = ({ url }: ShowAllButtonProps) => {
  return (
    <Link to={url}>
      <Button className="mt-2 ml-2 text-white bg-white bg-opacity-50 hover:scale-125 hover:bg-opacity-30">
        Show all
      </Button>
    </Link>
  );
};
