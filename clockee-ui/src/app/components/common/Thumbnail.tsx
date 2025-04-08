import React, { ReactNode } from 'react';

type ThumbnailProps = {
  children: ReactNode
};

const Thumbnail = ({ children }: ThumbnailProps) => {
  return (
    <div className="avatar">
      <div className="mask mask-squircle h-12 w-12">
        {children}
      </div>
    </div>
  );
};

export default Thumbnail;
