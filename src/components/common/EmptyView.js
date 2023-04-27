import React from "react";
import Link from "next/link";

const EmptyView = (props) => {
  const { icon, msg, link, btnText } = props;

  return (
    <>
      <div className="empty_view_wrapper">
        <div className="empty_view_icon">{icon}</div>
        <h2>{msg}</h2>
        {link && (
          <Link href={link} className="btn">
            {btnText}
          </Link>
        )}
      </div>
    </>
  );
};

export default EmptyView;
