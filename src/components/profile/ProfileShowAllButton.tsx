import { Link } from "react-router-dom";

interface ProfileShowAllButtonProps {
  url: string;
}

function ProfileShowAllButton({ url }: ProfileShowAllButtonProps) {
  return (
    <div>
      <Link to={url}>
        <button className="text-white mt-10 mr-2 bg-slate-800 hover:bg-slate-600 h-8 w-20 text-sm rounded-full">
          Show all
        </button>
      </Link>
    </div>
  );
}

export default ProfileShowAllButton;
