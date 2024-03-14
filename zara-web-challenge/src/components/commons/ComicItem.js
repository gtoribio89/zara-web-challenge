import React from "react";

const componentName = "ComicItem-";

function ComicItem({ item, data, getYearFromDate }) {
  return (
    <div className={`${componentName}-container`}>
      <div className={`${componentName}-image-container`}>
        <img
          className={`${componentName}-character-image`}
          src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          alt={data.name}
        />
      </div>
      <div className={`${componentName}-info-container`}>
        <div className={`${componentName}-title-container`}>
          <p className={`${componentName}-title`}>{item.title}</p>
        </div>
        <div className={`${componentName}-year-container`}>
          <p className={`${componentName}-year`}>
            {getYearFromDate(item.dates[0].date)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComicItem;
